<template>
  <div>
    <h3>Edit Person</h3>
    <input type="number" v-model.number="index" placeholder="Enter index to edit" />
    <div v-if="selectedPerson" class="feedback">
      Editing: {{ selectedPerson.name }} (Index {{ index }})
    </div>
    <div v-else class="feedback">
      <em>Enter an index to load person data</em>
    </div>
    <div v-if="selectedPerson" class="edit-form-section">
      <input type="text" v-model="form.name" placeholder="Name" />
      <input type="number" v-model="form.weight" placeholder="Weight (kg)" />
      <input type="number" v-model="form.height" placeholder="Height (cm)" />
      <input type="text" v-model="form.photoUrl" placeholder="Image URL" />
      <button @click="updatePerson">Update</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPerson',
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: null,
      form: {
        name: '',
        weight: '',
        height: '',
        photoUrl: ''
      }
    }
  },
  computed: {
    selectedPerson() {
      if (this.index !== null && this.index >= 0 && this.index < this.persons.length) {
        return this.persons[this.index];
      }
      return null;
    }
  },
  watch: {
    selectedPerson(newValue) {
      if (newValue) {
        this.form = {
          name: newValue.name,
          weight: newValue.weight,
          height: newValue.height,
          photoUrl: newValue.photoUrl
        };
      } else {
        this.form = {
          name: '',
          weight: '',
          height: '',
          photoUrl: ''
        };
      }
    }
  },
  methods: {
    updatePerson() {
      if (this.selectedPerson) {
        this.$emit('edit-person', this.index, { ...this.form });
      }
    }
  }
}
</script>