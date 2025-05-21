<template>
  <div>
    <h3>Add Person</h3>
    <form @submit.prevent="addPerson">
      Fullname : <input type="text" v-model="form.name" placeholder="Name" required />
      Year Born : <input type="text" v-model="form.yob" placeholder="yyyy" required />
      Weight : <input type="number" v-model="form.weight" placeholder="Weight (kg)" required />
      Height : <input type="number" v-model="form.height" placeholder="Height (cm)" required />
      Photo URL : <input type="text" v-model="form.photoUrl" placeholder="Image URL" />
      <button type="submit">Add Person</button>
    </form>
    
    <ListPersons :persons="persons" />
  </div>
</template>

<script>
import ListPersons from './ListPersons.vue';

export default {
  name: 'AddPerson',
  components: {
    ListPersons
  },
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      form: {
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
      // Emit the form data to parent component
      this.$emit('add-person', { ...this.form });
      
      // Reset form
      this.form = {
        name: '',
        yob: '',
        weight: '',
        height: '',
        photoUrl: ''
      };
    }
  }
}
</script>