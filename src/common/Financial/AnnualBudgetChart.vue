<template lang="pug">
  div.chart-wrapper
    apexchart(width="100%" height="250px" type="bar" :options="options" :series="series")
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
    props: {
      annualBudget: {
        type: Object,
        required: true
      }
    },
    components: {
      apexcharts: VueApexCharts,
    },
    data() {
      return {
        options: {
          chart: {
            id: 'vuechart-example',
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: [
              "Spent",
              "Annual Budget",
            ],
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'Public Sans, sans-serif',
                fontWeight: '600',
                colors: ['#A2A3A9', '#A2A3A9'],
                cssClass: 'apexcharts-xaxis-label',
              },
            }
          },
          yaxis: {
            labels: {
              formatter: function (number) {
                const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"]
                const tier = Math.log10(Math.abs(number)) / 3 | 0
                if(tier === 0) return number
                const suffix = SI_SYMBOL[tier]
                const scale = Math.pow(10, tier * 3)
                const scaled = number / scale
                return `${scaled.toFixed(1)}` + suffix
              },
              style: {
                fontSize: '12px',
                fontFamily: 'Public Sans, sans-serif',
                fontWeight: '600',
                colors: ['#A2A3A9'],
                cssClass: 'apexcharts-yaxis-label',
              },
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40px',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false,
          },
          colors: ['#1AB27F', '#1F7055'],
        },
        series: [{
          name: '',
          data: [this.annualBudget.current, this.annualBudget.goal]
        }],
      }
    },
    watch: {
      annualBudget: function(newVal, oldVal) {
        this.series = [{
          name: '',
          data: [newVal.current, newVal.goal]
        }]
      }
    }
  };
</script>

