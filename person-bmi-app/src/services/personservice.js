// API URL for the JSON Server
const API_URL = 'http://localhost:3000';

export default {
  // GET /persons - Get all persons
  async getAllPersons() {
    try {
      const response = await fetch(`${API_URL}/persons`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching persons:', error);
      throw error;
    }
  },

  // GET /persons/:id - Get a person by ID
  async getPersonById(id) {
    try {
      const response = await fetch(`${API_URL}/persons/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching person with id ${id}:`, error);
      throw error;
    }
  },

  // POST /persons - Add a new person
  async addPerson(person) {
    try {
      const response = await fetch(`${API_URL}/persons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding person:', error);
      throw error;
    }
  },

  // PUT /persons/:id - Update a person
  async updatePerson(id, person) {
    try {
      const response = await fetch(`${API_URL}/persons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating person with id ${id}:`, error);
      throw error;
    }
  },

  // DELETE /persons/:id - Delete a person
  async deletePerson(id) {
    try {
      const response = await fetch(`${API_URL}/persons/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting person with id ${id}:`, error);
      throw error;
    }
  }
};