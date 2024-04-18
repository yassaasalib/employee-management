import { createRouter, createWebHashHistory } from 'vue-router';
import EmployeeList from '../views/EmployeeList.vue';
// import EmployeeDetails from '../views/EmployeeDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Employee List',
    component: EmployeeList
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
