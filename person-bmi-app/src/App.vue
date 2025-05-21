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
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      persons: [
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
      ]
    }
  },
  methods: {
    addPerson(person) {
      // Calculate BMI and category
      const weight = parseFloat(person.weight);
      const height = parseFloat(person.height);
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      
      let category = '';
      if (bmi < 18.5) category = 'underweight';
      else if (bmi < 24.9) category = 'normal';
      else if (bmi < 29.9) category = 'overweight';
      else category = 'obese';
      
      const newPerson = {
        ...person,
        age: new Date().getFullYear() - parseInt(person.yob),
        bmi,
        category
      };
      
      this.persons.push(newPerson);
    },
    updatePerson(index, updatedPerson) {
      // Calculate BMI and category
      const weight = parseFloat(updatedPerson.weight);
      const height = parseFloat(updatedPerson.height);
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      
      let category = '';
      if (bmi < 18.5) category = 'underweight';
      else if (bmi < 24.9) category = 'normal';
      else if (bmi < 29.9) category = 'overweight';
      else category = 'obese';
      
      // Keep the original yob and age
      const yob = this.persons[index].yob;
      const age = this.persons[index].age;
      
      this.persons[index] = {
        ...updatedPerson,
        yob,
        age,
        bmi,
        category
      };
    },
    deletePerson(index) {
      this.persons.splice(index, 1);
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