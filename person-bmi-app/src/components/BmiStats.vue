<template>
    <canvas ref="bmiChart" width="400" height="300"></canvas>
  </template>
  
  <script>
  import Chart from 'chart.js/auto'
  
  export default {
    mounted() {
      fetch('http://localhost:3000/persons')
        .then(res => res.json())
        .then(data => {
          const categories = { Underweight: 0, Normal: 0, Overweight: 0, Obese: 0 };
          data.forEach(p => {
            const bmi = parseFloat(p.bmi);
            if (bmi < 18.5) categories.Underweight++;
            else if (bmi < 24.9) categories.Normal++;
            else if (bmi < 29.9) categories.Overweight++;
            else categories.Obese++;
          });
  
          new Chart(this.$refs.bmiChart.getContext('2d'), {
            type: 'pie',
            data: {
              labels: Object.keys(categories),
              datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336']
              }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
          });
        });
    }
  }
  </script>