<template>
    <div>
      <div v-for="(count, category) in bmiStats" :key="category">
        <div><strong>{{ capitalize(category) }}</strong>: {{ count }} ({{ calculatePercent(count) }}%)</div>
        <div class="bar-container">
          <div :class="['bar', category]" :style="{ width: calculatePercent(count) + '%' }">
            {{ calculatePercent(count) }}%
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BmiText',
    props: {
      persons: {
        type: Array,
        required: true
      }
    },
    computed: {
      bmiStats() {
        const categories = { underweight: 0, normal: 0, overweight: 0, obese: 0 };
        
        this.persons.forEach(p => {
          const bmi = parseFloat(p.bmi);
          if (bmi < 18.5) categories.underweight++;
          else if (bmi < 24.9) categories.normal++;
          else if (bmi < 29.9) categories.overweight++;
          else categories.obese++;
        });
        
        return categories;
      }
    },
    methods: {
      calculatePercent(count) {
        const total = this.persons.length;
        if (total === 0) return 0;
        return ((count / total) * 100).toFixed(1);
      },
      
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  }
  </script>