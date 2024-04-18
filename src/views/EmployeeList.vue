<template>
  <div id="header__spacer"></div>
  <div id="header">
    <div id="header__input">
      <input type="text" v-model="occupationFilter" placeholder="Filter by occupation...">
    </div>
  </div>
  <div class="employee-list-holder">
    <div class="employee-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.Id" @click="navigateToDetails(employee.Id)">
            <td>{{ employee.FirstName }} {{ employee.LastName }}</td>
            <td>{{ employee.Occupation }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="!filteredEmployees.length">No employees found.</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        employees: [],
        occupationFilter: ''
      };
    },
    mounted() {
      this.fetchEmployees();
    },
    methods: {
      async fetchEmployees() {
        try {
          const response = await fetch('/data/employees.json');
          const data = await response.json();
          this.employees = data.Employees;
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      },
      navigateToDetails(id) {
        this.$router.push({ name: 'employee-details', params: { id } });
      }
    },
    computed: {
      filteredEmployees() {
        if (!this.occupationFilter.trim()) {
          return this.employees;
        } else {
          const filter = this.occupationFilter.trim().toLowerCase();
          return this.employees.filter(employee =>
            employee.Occupation.toLowerCase().includes(filter)
          );
        }
      }
    }
  };
</script>