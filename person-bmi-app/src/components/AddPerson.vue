<template>
    <div>
      <h3>Add Person</h3>
      <form @submit.prevent="addPerson">
        <input v-model="person.name" placeholder="Fullname" required />
        <input v-model="person.yob" type="number" placeholder="Year Born" required />
        <input v-model="person.weight" type="number" placeholder="Weight (kg)" required />
        <input v-model="person.height" type="number" placeholder="Height (cm)" required />
        <input v-model="person.photoUrl" placeholder="Photo URL" />
        <button type="submit">Add Person</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        person: {
          name: '',
          yob: '',
          weight: '',
          height: '',
          photoUrl: ''
        }
      }
    },
    methods: {
      addPerson() {
        const age = new Date().getFullYear() - this.person.yob;
        const bmi = (this.person.weight / ((this.person.height / 100) ** 2)).toFixed(2);
        const newPerson = {
          ...this.person,
          age,
          bmi
        };
  
        fetch('http://localhost:3000/persons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPerson)
        }).then(() => {
          alert('Person added!');
          this.person = { name: '', yob: '', weight: '', height: '', photoUrl: '' };
        });
      }
    }
  }
  </script>