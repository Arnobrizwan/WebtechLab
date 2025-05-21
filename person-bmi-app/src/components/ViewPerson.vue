<template>
    <div>
      <h3>View One Person</h3>
      <input type="number" v-model="id" placeholder="Enter ID" />
      <button @click="fetchPerson">View</button>
      <div v-if="person" class="detail-box">
        <strong>{{ person.name }}</strong> (Age: {{ person.age }})<br>
        BMI: {{ person.bmi }}<br>
        <img v-if="person.photoUrl" :src="person.photoUrl" class="person-photo" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        id: '',
        person: null
      }
    },
    methods: {
      fetchPerson() {
        fetch(`http://localhost:3000/persons/${this.id}`)
          .then(res => res.json())
          .then(data => this.person = data)
          .catch(() => this.person = null);
      }
    }
  }
  </script>