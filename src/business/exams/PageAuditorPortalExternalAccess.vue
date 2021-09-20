<template lang="pug">
  .container-fluid
    .row
      .col.text-center.px-0.position-relative
        .p-y-1
        .bg-black
    .row.bg-grey
      .col
        .container.portal
          .row
            .col.m-b-2
              .card-body.white-card-body.reviews__card
                .greeting
                  ion-icon.greeting__icon(name="search-outline")
                  .greeting-text
                    h1.greeting-text__title Welcome
                    p.greeting-text__subtitle Please confirm your email address to get started
          .row
            .col
              ExamReqeustsAuditorPortalExternal(:examUuid="examUuid")
</template>

<script>
  import ExamReqeustsAuditorPortalExternal from "./components/ExamReqeustsAuditorPortalExternal";
  export default {
    props: {
      examUuid: {
        type: String,
        required: true
      }
    },
    components: {ExamReqeustsAuditorPortalExternal},
  }
</script>

<style scoped>
  @import "./styles.css";
  @import "../../auth/styles.css";
  .header-top {
    position: relative;
    z-index: 2;
    margin-bottom: 5rem;
    background-color: #ecf4ff;
  }
  .bg-black {
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 180px;
    background: linear-gradient(155deg, #1b1c29 50%, #1b1c29 55%, #2d304f 60%);
  }

  .greeting {
    display: flex;
    padding: 1rem;
  }
  .greeting-text {
    display: flex;
    flex-direction: column;
  }
  ion-icon {
    font-size: 50px;
    color: #565759;
    --ionicon-stroke-width: 64px;
  }
  .greeting__icon {
    margin-right: 2rem;
  }
  .greeting-text__title {
    font-size: 2rem;
    font-weight: bold;
  }
  .greeting-text__subtitle {
    font-size: 1rem;
  }

  .bg-grey {
    background: #F6F6F8;
  }
</style>
