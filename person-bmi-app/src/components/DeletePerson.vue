<template>
    <div>
      <h3>Delete Person</h3>
      <input type="number" v-model="id" placeholder="Enter ID to delete" />
      <button @click="deletePerson">Delete</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { id: '' }
    },
    methods: {
      deletePerson() {
        fetch(`http://localhost:3000/persons/${this.id}`, {
          method: 'DELETE'
        }).then(() => alert('Person deleted!'));
      }
    }
  }
  </script>