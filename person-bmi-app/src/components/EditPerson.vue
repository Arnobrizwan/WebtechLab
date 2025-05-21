<template>
    <div>
      <h3>Edit Person</h3>
      <input v-model="id" placeholder="Enter ID to edit" />
      <button @click="loadPerson">Load</button>
  
      <div v-if="person">
        <input v-model="person.name" placeholder="Name" />
        <input v-model="person.weight" type="number" placeholder="Weight" />
        <input v-model="person.height" type="number" placeholder="Height" />
        <input v-model="person.photoUrl" placeholder="Image URL" />
        <button @click="updatePerson">Update</button>
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
      loadPerson() {
        fetch(`http://localhost:3000/persons/${this.id}`)
          .then(res => res.json())
          .then(data => this.person = data);
      },
      updatePerson() {
        fetch(`http://localhost:3000/persons/${this.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.person)
        }).then(() => alert('Updated!'));
      }
    }
  }
  </script>