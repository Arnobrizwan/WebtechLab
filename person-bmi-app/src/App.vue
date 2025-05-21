<template>
  <div class="container">
    <h1>Person BMI Web App</h1>

    <nav class="main-nav">
      <router-link to="/">Add Person</router-link> |
      <router-link to="/view-all">View All</router-link> |
      <router-link to="/view-one">View One</router-link> |
      <router-link to="/edit">Edit</router-link> |
      <router-link to="/delete">Delete</router-link>
    </nav>

    <router-view :persons="persons" @add-person="addPerson" @edit-person="updatePerson" @delete-person="deletePerson"/>
    
    <!-- Statistics components -->
    <h3>Statistics / Analysis</h3>
    <bmi-text :persons="persons"></bmi-text>
    <bmi-stats :persons="persons"></bmi-stats>
  </div>
</template>

<script>
import PersonService from './services/personservice.js';
import BmiText from './components/BmiText.vue';
import BmiStats from './components/BmiStats.vue';

export default {
  name: 'App',
  components: {
    BmiText,
    BmiStats
  },
  data() {
    return {
      persons: []
    }
  },
  created() {
    this.loadPersons();
  },
  methods: {
    async loadPersons() {
      try {
        // Fetch all persons from the server
        this.persons = await PersonService.getAllPersons();
        
        // If no persons exist yet, initialize with default data
        if (this.persons.length === 0) {
          const defaultPersons = [
            {
              name: "Hassan",
              yob: 1995,
              age: new Date().getFullYear() - 1995,
              weight: 68,
              height: 175,
              bmi: (68 / ((175 / 100) ** 2)).toFixed(2),
              category: 'normal',
              photoUrl: "https://randomuser.me/api/portraits/men/44.jpg"
            },
            {
              name: "Siti",
              yob: 2000,
              age: new Date().getFullYear() - 2000,
              weight: 52,
              height: 160,
              bmi: (52 / ((160 / 100) ** 2)).toFixed(2),
              category: 'normal',
              photoUrl: "https://randomuser.me/api/portraits/women/3.jpg"
            },
            {
              name: "Diah",
              yob: 1988,
              age: new Date().getFullYear() - 1988,
              weight: 82,
              height: 180,
              bmi: (82 / ((180 / 100) ** 2)).toFixed(2),
              category: 'overweight',
              photoUrl: "https://randomuser.me/api/portraits/women/66.jpg"
            }
          ];
          
          // Add default persons to the server
          for (const person of defaultPersons) {
            await PersonService.addPerson(person);
          }
          
          // Reload persons after adding defaults
          this.persons = await PersonService.getAllPersons();
        }
      } catch (error) {
        console.error('Failed to load persons:', error);
        // Fallback to empty array if server not available
        this.persons = [];
      }
    },
    
    calculateBMI(weight, height) {
      return (weight / ((height / 100) ** 2)).toFixed(2);
    },
    
    determineBMICategory(bmi) {
      if (bmi < 18.5) return 'underweight';
      else if (bmi < 24.9) return 'normal';
      else if (bmi < 29.9) return 'overweight';
      else return 'obese';
    },
    
    async addPerson(person) {
      try {
        // Calculate BMI and category
        const weight = parseFloat(person.weight);
        const height = parseFloat(person.height);
        const bmi = this.calculateBMI(weight, height);
        const category = this.determineBMICategory(bmi);
        
        const newPerson = {
          ...person,
          age: new Date().getFullYear() - parseInt(person.yob),
          weight,
          height,
          bmi,
          category
        };
        
        // Add person to server using POST
        const addedPerson = await PersonService.addPerson(newPerson);
        
        // Update local array
        this.persons.push(addedPerson);
      } catch (error) {
        console.error('Failed to add person:', error);
        alert('Error adding person. Check if JSON Server is running.');
      }
    },
    
    async updatePerson(index, updatedPerson) {
      try {
        const personId = this.persons[index].id;
        
        // Calculate BMI and category
        const weight = parseFloat(updatedPerson.weight);
        const height = parseFloat(updatedPerson.height);
        const bmi = this.calculateBMI(weight, height);
        const category = this.determineBMICategory(bmi);
        
        // Keep original properties that aren't being updated
        const yob = this.persons[index].yob;
        const age = this.persons[index].age;
        
        const personToUpdate = {
          ...this.persons[index],
          ...updatedPerson,
          yob,
          age,
          bmi,
          category
        };
        
        // Update person on server using PUT
        const updated = await PersonService.updatePerson(personId, personToUpdate);
        
        // Update in local array
        this.persons[index] = updated;
      } catch (error) {
        console.error('Failed to update person:', error);
        alert('Error updating person. Check if JSON Server is running.');
      }
    },
    
    async deletePerson(index) {
      try {
        const personId = this.persons[index].id;
        
        // Delete person from server
        await PersonService.deletePerson(personId);
        
        // Remove from local array
        this.persons.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete person:', error);
        alert('Error deleting person. Check if JSON Server is running.');
      }
    }
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f7f9;
  padding: 20px;
}

.container {
  max-width: 700px;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

h2, h3 {
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

form {
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

ul {
  padding: 0;
  list-style: none;
}

li {
  background: #f0f9f5;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 5px solid #42b983;
  border-radius: 5px;
}

.bar-container {
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 4px 0 15px 0;
}

.bar {
  height: 20px;
  color: white;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
}

.bar.underweight {
  background-color: #2196f3;
}

.bar.normal {
  background-color: #4caf50;
}

.bar.overweight {
  background-color: #ff9800;
}

.bar.obese {
  background-color: #f44336;
}

.main-nav {
  margin-bottom: 20px;
  text-align: center;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 5px;
  transition: 0.3s;
}

nav a:hover, nav a.router-link-active {
  background-color: #42b983;
  color: white;
}

.person-card {
  display: flex;
  align-items: center;
  gap: 15px;
}

.person-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.detail-box {
  margin-top: 10px;
  padding: 15px;
  background: #f0f9f5;
  border-radius: 8px;
}

.edit-form-section {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.feedback {
  margin-top: 10px;
  color: #d32f2f;
  font-style: italic;
}

.chart-canvas {
  margin-top: 20px;
}
</style>