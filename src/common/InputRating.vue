<template lang="pug">
  .stars-rating
    .stars-rating_filled-line(:style="filledLineStyles")
    .stars-rating_item(v-for="i in [1, 2, 3, 4, 5]" :key="i" @click="clicked(i)")
</template>


<script>
export default {
  data() {
    return {
      value: 0,
      widthOfFilledLine: 0
    }
  },
  computed: {
    filledLineStyles () {
      return {
        width: (this.value * 20).toFixed(2) + '%'
      }
    }
  },
  methods: {
    clicked(i) {
      if(this.value == 1 && i == 1) this.value = 0 // reset rating on second click
      else {
        this.value = i
        this.$emit('input', this.value)
      }
    }
  }
}
</script>

<style scoped>
.stars-rating {
  display: flex;
  position: relative;
  background-color: #F3F6F9;
  width: 125px;
}
.stars-rating_filled-line {
  width: 0;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #FFC900;
  transition: width .3s ease-out;
}
.stars-rating_item {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  z-index: 2;
  background-image: url(../assets/star.svg); /* probably, the best way is to use "<svg use=''>". May be I remake it later */
  background-size: 105%;
  cursor: pointer;
}

.stars-rating_item::after {
  content: '';
  display: block;
  position: absolute;
  width: 5px;
  height: 100%;
  right: -5px;
  top: 0;
  background-color: #fff;
}
.stars-rating_item:last-child {
  margin-right: 0;
}
.stars-rating_item >>> svg {
  fill: #fff;
}
</style>
