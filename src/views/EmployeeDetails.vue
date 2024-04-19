<template>
  <div class="employee-details">
    <div class="card">
      <div v-if="employee">
        <p><strong>Name:</strong> {{ employee.FirstName }} {{ employee.LastName }}</p>
        <p><strong>Gender:</strong> {{ employee.Gender }}</p>
        <p><strong>Occupation:</strong> {{ employee.Occupation }}</p>
        <p><strong>Date of Birth:</strong> {{ employee.DateOfBirth }}</p>
        <p><strong>Employment Date:</strong> <input type="date" v-model="employmentDate" class="input-field"></p>
        <p><strong>Termination Date:</strong> <input type="date" v-model="terminationDate" class="input-field"></p>
        <div class="message-box">
          <p class="message">{{ employmentDateMessage }}</p>
          <p class="message">{{ terminationDateMessage }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
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

<style scoped>

.employee-details {
  display: flex;
  float: left;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center
}

.card {
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  background-color: #f9f9f9;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box
}

.message-box {
  margin-top: 10px;
}

.message {
  color: #333;
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 5px;
}
</style>
