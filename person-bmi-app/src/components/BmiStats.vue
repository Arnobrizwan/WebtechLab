<template>
  <div>
    <canvas ref="bmiChart" width="400" height="300" class="chart-canvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'BmiStats',
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartInstance: null
    }
  },
  watch: {
    persons: {
      handler() {
        this.$nextTick(() => {
          this.createChart();
        });
      },
      deep: true
    }
  },
  methods: {
    getBmiStats() {
      const categories = { Underweight: 0, Normal: 0, Overweight: 0, Obese: 0 };
      
      this.persons.forEach(p => {
        const bmi = parseFloat(p.bmi);
        if (bmi < 18.5) categories.Underweight++;
        else if (bmi < 24.9) categories.Normal++;
        else if (bmi < 29.9) categories.Overweight++;
        else categories.Obese++;
      });
      
      return categories;
    },
    
    createChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      const categories = this.getBmiStats();
      const ctx = this.$refs.bmiChart.getContext('2d');
      
      this.chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(categories),
          datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  },
  mounted() {
    this.createChart();
  }
}
</script>