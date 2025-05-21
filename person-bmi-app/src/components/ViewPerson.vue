<template>
  <div>
    <h3>View One Person</h3>
    <input type="number" v-model.number="index" placeholder="Enter index" />
    <div v-if="selectedPerson" class="detail-box">
      <div class="person-card">
        <img v-if="selectedPerson.photoUrl" :src="selectedPerson.photoUrl" alt="photo" class="person-photo">
        <div>
          <p><strong>Name:</strong> {{ selectedPerson.name }}</p>
          <p><strong>Weight:</strong> {{ selectedPerson.weight }} kg</p>
          <p><strong>Height:</strong> {{ selectedPerson.height }} cm</p>
          <p><strong>BMI:</strong> {{ selectedPerson.bmi }}</p>
        </div>
      </div>
    </div>
    <div v-else class="detail-box">
      <em>No person at that index</em>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewPerson',
  props: {
    persons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    selectedPerson() {
      if (this.index !== null && this.index >= 0 && this.index < this.persons.length) {
        return this.persons[this.index];
      }
      return null;
    }
  }
}
</script>