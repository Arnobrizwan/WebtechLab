<template>
  <div>
    <h3>Delete Person by Index</h3>
    <input type="number" v-model.number="index" placeholder="Enter index to delete" />
    <button v-if="index !== null && index >= 0 && index < persons.length" 
            @click="deletePerson" 
            style="margin-top: 10px;">
      Delete
    </button>
    <div class="feedback">
      <em v-if="index === null || index < 0 || index >= persons.length">
        Enter index to delete
      </em>
      <span v-else>
        Will delete: {{ persons[index].name }}
      </span>
    </div>
    
    <h3>Statistics / Analysis</h3>
    <BmiText :persons="persons" />
    <BmiStats :persons="persons" />
  </div>
</template>

<script>
import BmiText from './BmiText.vue';
import BmiStats from './BmiStats.vue';

export default {
  name: 'DeletePerson',
  components: {
    BmiText,
    BmiStats
  },
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
  methods: {
    deletePerson() {
      if (this.index !== null && this.index >= 0 && this.index < this.persons.length) {
        this.$emit('delete-person', this.index);
        this.index = null;
      }
    }
  }
}
</script>