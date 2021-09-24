<template lang="pug">
  div
    .access-denied.access-denied_h-100
      .access-denied-content
        .access-denied__error-num 401
        h3.access-denied__title Unauthorized access
        p.access-denied__subtitle The page you are looking for requires different authentication credentials
        button.btn.btn-dark.access-denied__btn(@click="$router.go(-1)")
          b-icon.mr-2(icon="chevron-left")
          | Go Back
</template>
