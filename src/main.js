import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import router from '@/router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import DatePicker from '@/common/DatePicker'
import Breadcrumbs from '@/common/Breadcrumbs'
import ComboBox from '@/common/ComboBox'
import Dropdown from '@/common/Dropdown'
import Errors from '@/common/Errors'
import InputDate from '@/common/InputDate'
import InputText from '@/common/InputText'
import InputTextarea from '@/common/InputTextarea'
import InputNumber from '@/common/InputNumber'
import InputSelect from '@/common/InputSelect'
import InputRating from '@/common/InputRating'
import StarRating from '@/common/StarRating'
import UserAvatar from '@/common/UserAvatar'
import PropertiesTable from '@/common/PropertiesTable'
import CommonHeader from '@/common/CommonHeader'
import Get from '@/common/rest/Get'
import Post from '@/common/rest/Post'
import PostMultipart from '@/common/rest/PostMultipart'
import Put from '@/common/rest/Put'
import Delete from '@/common/rest/Delete'
import ModelLoader from '@/common/rest/ModelLoader'
import filters from '@/filters'
import { extractToastMessage } from '@/common/Toast'
import ToasterMixin from '@/mixins/ToasterMixin'
import RedirectMixin from '@/mixins/RedirectMixin'
import HistoryMixin from '@/mixins/HistoryMixin'
import vueDebounce from 'vue-debounce'
import VueApexCharts from 'vue-apexcharts'
import Loading from '@/common/Loading/Loading'
import EmptyState from '@/common/EmptyState'

// import store from '@/store/business'
// import MainLayoyt from '@/layouts/Main'
import store from '@/store/common'
import AuthLayout from '@/layouts/Auth'

const data = () => ({
  isProfileMenuOpen: false
})

Vue.config.productionTip = false
Vue.config.ignoredElements = ['ion-icon']


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueDebounce)
Vue.use(VueApexCharts)
Vue.use(VueRouter)

Vue.mixin(ToasterMixin)
Vue.mixin(RedirectMixin)
Vue.mixin(HistoryMixin)

Vue.component('Treeselect', Treeselect)
Vue.component('DatePicker', DatePicker)
Vue.component('Breadcrumbs', Breadcrumbs)
Vue.component('ComboBox', ComboBox)
Vue.component('Dropdown', Dropdown)
Vue.component('Errors', Errors)
Vue.component('InputDate', InputDate)
Vue.component('InputText', InputText)
Vue.component('InputTextarea', InputTextarea)
Vue.component('InputNumber', InputNumber)
Vue.component('InputSelect', InputSelect)
Vue.component('InputRating', InputRating)
Vue.component('StarRating', StarRating)
Vue.component('UserAvatar', UserAvatar)
Vue.component('PropertiesTable', PropertiesTable)
Vue.component('CommonHeader', CommonHeader)
Vue.component('Get', Get)
Vue.component('Post', Post)
Vue.component('PostMultipart', PostMultipart)
Vue.component('Put', Put)
Vue.component('Delete', Delete)
Vue.component('ModelLoader', ModelLoader)
Vue.component('apexchart', VueApexCharts)
Vue.component('EmptyState', EmptyState)
Vue.component('Loading', Loading)

Vue.directive('google-maps-autocomplete', {
  inserted(el) {
    new google.maps.places.Autocomplete(el)
  }
})

Object.keys(filters).map(filter => Vue.filter(filter, filters[filter]))

new Vue({
  mixins: [ToasterMixin, RedirectMixin, HistoryMixin],
  router,
  store,
  data,
  components: {
    AuthLayout,
  },
  render: h => h(App),
}).$mount('#app')
