<template>
  <div>
    <h1>Employee Details</h1>
    <div v-if="employee">
      <p>Name: {{ employee.FirstName }} {{ employee.LastName }}</p>
      <p>Gender: {{ employee.Gender }}</p>
      <p>Occupation: {{ employee.Occupation }}</p>
      <p>Date of Birth: {{ employee.DateOfBirth }}</p>
      <p>Employment Date: <input type="date" v-model="employmentDate"></p>
      <p>Termination Date: <input type="date" v-model="terminationDate"></p>
      <p>{{ employmentDateMessage }}</p>
      <p>{{ terminationDateMessage }}</p>
      <!-- Add other details as needed -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      employee: null,
      employmentDate: '',
      terminationDate: ''
    };
  },
  mounted() {
    this.fetchEmployeeDetails();
  },
  methods: {
    async fetchEmployeeDetails() {
      try {
        const response = await fetch('/data/employees.json');
        const data = await response.json();
        this.employee = data.Employees.find(emp => emp.Id === this.id);
        this.employmentDate = this.employee.EmploymentDate || '';
        this.terminationDate = this.employee.TerminationDate || '';
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }
  },
  computed: {
    employmentDateMessage() {
      if (!this.employmentDate) return ''; // If employment date is not set, return empty string
      if (new Date(this.employmentDate) > new Date()) {
        return 'Employed soon';
      } else {
        return 'Currently employed';
      }
    },
    terminationDateMessage() {
      if (!this.terminationDate) return ''; // If termination date is not set, return empty string
      if (new Date(this.terminationDate) > new Date()) {
        return 'To be terminated';
      } else {
        return 'Terminated';
      }
    }
  }
};
</script>
