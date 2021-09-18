<template lang="pug">
  .page.exam
    .page-header
      h2.page-header__title {{ pageTitle }}
      .page-header__actions
        ExamModalCreate(:exams-id="exams.id")
          button.btn.btn-dark New Exam
    .card-body.white-card-body.card-body_full-height.p-x-40
      ExamsTable(:exams="exams")
</template>

<script>
  import { mapActions, mapGetters } from "vuex"
  import ExamsTable from './components/ExamsTable'
  import ExamModalCreate from './modals/ExamModalCreate'
  export default {
    components: {
      ExamsTable,
      ExamModalCreate
    },
    data() {
      return {
        pageTitle: "Exam Management",
      };
    },
    methods: {
      ...mapActions({
        getExams: 'exams/getExams',
      }),
    },
    computed: {
      ...mapGetters({
        exams: 'exams/exams',
      }),
    },
    async mounted () {
      try {
        await this.getExams()
      } catch (error) {
        console.error(error)
        this.toast('Error', error.message, true)
      }
    },
  };
</script>

<style>
  @import "./styles.css";
</style>
