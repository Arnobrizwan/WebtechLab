<template>
    <div>
      <h3>Person List</h3>
      <ul>
        <li v-for="(p, i) in persons" :key="p.id">
          <div class="person-card">
            <img v-if="p.photoUrl" :src="p.photoUrl" class="person-photo" />
            <div>
              <strong>[{{ i }}] {{ p.name }}</strong> (Age: {{ p.age }})<br>
              Weight: {{ p.weight }}kg, Height: {{ p.height }}cm<br>
              BMI: {{ p.bmi }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        persons: []
      }
    },
    mounted() {
      fetch('http://localhost:3000/persons')
        .then(res => res.json())
        .then(data => this.persons = data);
    }
  }
  </script>