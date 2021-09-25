<template lang="pug">
  .container.pb-5
    .row
      .col-md-3.px-0.m-t-2
        .card#sidebarMenu_alt
          .card-title.p-x-20(style='border-bottom: 0px;')
            h3.title.mb-0 Filters
          .card-body
            h5.sub-title.d-flex.justify-content-between(role="button" v-b-toggle.collapse_pricing_type)
              | JOB TYPE
              ion-icon(name='chevron-down-outline')
            b-collapse#collapse_pricing_type(visible)
              b-form-checkbox(v-for="(option, i) in pricingTypeOptions" v-model="filter.pricing_type[i]" :key="'p'+i") {{option.label}}
            hr
            h5.sub-title.d-flex.justify-content-between(role="button" v-b-toggle.collapse_experience)
              | EXPERIENCE LEVEL
              ion-icon(name='chevron-down-outline')
            b-collapse#collapse_experience(visible)
              b-form-checkbox(v-for="(option, i) in experienceOptions" v-model="filter.experience[i]" :key="'e'+i") {{option.label}}
            hr
            //h5.d-flex.justify-content-between(@click="refetch" role="button" v-b-toggle.collapse_budget)
              | Budget
              ion-icon(name='chevron-down-outline')
            //b-collapse#collapse_budget(visible)
              b-form-checkbox(v-for="(option, i) in budgetOptions" v-model="filter.budget[i]") {{option.label}}
            //hr
            h5.sub-title.d-flex.justify-content-between(role="button" v-b-toggle.collapse_duration)
              | ESTIMATED DURATION
              ion-icon(name='chevron-down-outline')
            b-collapse#collapse_duration(visible)
              b-form-checkbox(v-for="(option, i) in durationOptions" v-model="filter.duration[i]" :key="'d'+i") {{option.label}}

      .col-md-9.m-t-2
        .card
          .card-title.p-x-20
            h3.mb-0 Browse Jobs
          .card-body
            .col-md-12
              .row.py-2
                .col-sm-10
                  b-form-group(label="Search" label-for="search-input")
                    b-form-input#search-input(v-model="filter.keyword" placeholder="Enter project type, keywords, etc.")
                .col-sm-2
                  b-form-group(label="Sort By" label-for="sort-input")
                    b-form-select#sort-input(v-model="filter.sort_by" :options="sortByOptions")
          .card-body.project-item(v-for="project in projects" :key="project.uid")
            .col-md-12
              h3.title.m-b-1
                a(@click="openDetails(project.id)") {{project.title}}
              h6.sub-title.pb-1.card-subtitle.text-muted.mb-2 {{project.subTitle}} | Start {{project.starts_on|asDate}}
              .badge.badge-default.m-r-1(v-for="skill in project.skills") {{ skill.name }}
              b-card-text.m-t-1.mb-0 {{project.description}}
              .d-flex.justify-content-between
                ProjectFigures(:project="project")
                div.view-details-btn.m-t-1
                  b-button(@click="openDetails(project.id)" variant="default") View Details
          .card-body.m-2.text-danger(v-if="!projects.length" title="No projects")

    b-sidebar#ProjectSidebar(@hidden="closeSidebar" v-model="isSidebarOpen" backdrop-variant='dark' backdrop right width="60%")
      .card
        .card-header.borderless
          .d-flex.justify-content-between
            b-button.mt-3.ml-2(variant="default" @click="isSidebarOpen = false")
              ion-icon.custom-icon(name='chevron-back-outline')
              span.font-weight-normal Close
          .d-flex.justify-content-between.m-t-1
            div
              router-link.btn.btn-dark(v-if="project" :to="applyUrl(project)") Apply
        ProjectDetails(v-if="project" :project="project")
</template>

<script>
import ProjectFigures from './ProjectFigures'
import ProjectDetails from './ProjectDetails'
import debounce from 'lodash.debounce'

const frontendUrl = '/specialist/job_board'
const endpointUrl = '/api/specialist/projects'

const capitalizeTheFirstLetterOfEachWord = (words) => {
   var separateWord = words.toLowerCase().split('_and_');
   for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
      separateWord[i].substring(1);
   }
   return separateWord.join(' + ');
}

const parse = p => ({
  ...p,
  uid: p.id + (p.starts_on ? '-p' : '-lp'),
  subTitle: [capitalizeTheFirstLetterOfEachWord('remote'), p.industries.map(({ name }) => name).join(', ')].join(' | ')
})

const PRICING_TYPE_OPTIONS = [{ label: 'Fixed Price', value: 'fixed' }, { label: 'Hourly', value: 'hourly' }]
const EXPERIENCE_OPTIONS = [{ label: 'Junior', value: [0, 0] },{ label: 'Intermediate', value: [1, 1] },{ label: 'Expert', value: [2, 2] }]
const BUDGET_OPTIONS = [{ label: 'Less than $100', value: [0, 100] },
                        { label: '$100 - $250', value: [100, 250] },
                        { label: '$250 - $500', value: [250, 500] },
                        { label: '$500 - $1000', value: [500, 1000] },
                        { label: '$1k - $5k', value: [1000, 5000] },
                        { label: '$5k+', value: [5000, 99999999] }]
const DURATION_OPTIONS = [{ label: 'Less than 1 month', value: [0, 31] },
                          { label: '1 to 3 months', value: [28, 93] },
                          { label: '3 to 6 months', value: [84, 186] },
                          { label: 'More than 6 months', value: [168, 99999999] }]
const SORT_BY_OPTIONS = [{ text: 'Newest', value: '' },
                         { text: 'Price', value: 'budget' },
                         { text: 'Duration', value: 'duration' }]

const initialFilter = () => ({
  keyword: '',
  pricing_type: PRICING_TYPE_OPTIONS.map(() => false),
  experience: EXPERIENCE_OPTIONS.map(() => false),
  budget: BUDGET_OPTIONS.map(() => false),
  duration: DURATION_OPTIONS.map(() => false),
  sort_by: SORT_BY_OPTIONS[0].value
})

export default {
  props: {
    initialOpenId: {
      type: Number
    }
  },
  data() {
    return {
      projects: [],
      project: null,
      filter: initialFilter(),
      openId: null,
      isSidebarOpen: false,
    }
  },
  created() {
    this.refetch()
    if (this.initialOpenId) {
      this.openDetails(this.initialOpenId)
    }
  },
  methods: {
    refetch() {
      fetch(this.$store.getters.backendUrl+endpointUrl + this.filterQuery, { headers: {'Accept': 'application/json', 'Authorization': JSON.parse(localStorage.getItem('app.currentUser.token'))}})
        .then(response => response.json())
        .then(result => this.projects = result.map(parse))
    },
    openDetails(id) {
      this.openId = id
      history.pushState({}, '', `${frontendUrl}/${id}`)
      fetch(this.$store.getters.backendUrl+endpointUrl + '/' + this.openId, { headers: {'Accept': 'application/json', 'Authorization': JSON.parse(localStorage.getItem('app.currentUser.token'))}})
        .then(response => response.json())
        .then(result => {
          this.project = result
          this.isSidebarOpen = true
        })
    },
    closeSidebar() {
      this.openId = null
      this.project = null
      history.pushState({}, '', frontendUrl)
      this.isSidebarOpen = false
    },
    applyUrl(project) {
      return `/specialist/job_board/${project.id}/applications/new`
    }
  },
  computed: {
    pricingTypeOptions: () => PRICING_TYPE_OPTIONS,
    experienceOptions: () => EXPERIENCE_OPTIONS,
    budgetOptions: () => BUDGET_OPTIONS,
    durationOptions: () => DURATION_OPTIONS,
    sortByOptions: () => SORT_BY_OPTIONS,
    filterQuery() {
      let query = []

      const getCheckedItems = (options, property) => options.reduce((result, option, i) => this.filter[property][i] ? [...result, option] : result, [])
      const buildParam = param => ({ value }) => `${param}[]=${value[0]},${value[1]}`

      const pricingTypes = getCheckedItems(this.pricingTypeOptions, 'pricing_type')
      query.push(pricingTypes.length === 1 ? `pricing_type=${pricingTypes[0].value}` : '')

      getCheckedItems(this.experienceOptions, 'experience').map(buildParam('experience')).map(arg => query.push(arg))
      getCheckedItems(this.budgetOptions, 'budget').map(buildParam('budget')).map(arg => query.push(arg))
      getCheckedItems(this.durationOptions, 'duration').map(buildParam('duration')).map(arg => query.push(arg))
      this.filter.keyword.length && query.push(`keyword=${encodeURIComponent(this.filter.keyword)}`)
      this.filter.sort_by.length && query.push(`sort_by=${this.filter.sort_by}`)

      return query.length ? ('?' + query.join('&')) : ''
    }
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-y-hidden')
  },
  watch: {
    'filter': {
      deep: true,
      handler: debounce(function() {
        this.refetch()
      }, 500)
    },
    'isSidebarOpen': {
      immediate: true,
      handler(val, oldVal) {
        document.body.classList[val ? 'add' : 'remove']('overflow-y-hidden')
      }
    }
  },
  components: {
    ProjectFigures,
    ProjectDetails
  }
}
</script>

<style>
.overflow-y-hidden {
  overflow-y: hidden !important;
}

.custom-icon {
  margin-right: 5px;

  position: relative;
  top: 2px;
  font-size: 16px;
}

#ProjectSidebar {
  padding-top: 78px;
}

.project-item {
  border-bottom: 1px solid #DCDEE4;
}

@media screen and (max-width: 800px) {
  #ProjectSidebar {
    width: 100% !important;
  }
}

/deep/ .container .bg-dark {
  background: none !important;
}

.view-details-btn {
  width: 130px;
}
</style>
