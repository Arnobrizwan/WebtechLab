<template>
  <div>
    <h3>Person List</h3>
    <ul>
      <li v-for="(person, index) in persons" :key="index">
        <div class="person-card">
          <img v-if="person.photoUrl" :src="person.photoUrl" alt="photo" class="person-photo">
          <div>
            <strong>[{{ index }}] {{ person.name }}</strong> (Age: {{ person.age }})<br>
            Weight: {{ person.weight }} kg, Height: {{ person.height }} cm<br>
            BMI: {{ person.bmi }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListPersons',
  props: {
    persons: {
      type: Array,
      required: true
    }
  }
}
</script>