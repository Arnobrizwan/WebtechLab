import { createRouter, createWebHistory } from "vue-router";

import AddPerson from "../components/AddPerson.vue";
import ListPersons from "../components/ListPersons.vue";
import ViewPerson from "../components/ViewPerson.vue";
import EditPerson from "../components/EditPerson.vue";
import DeletePerson from "../components/DeletePerson.vue";
import BmiStats from "../components/BmiStats.vue";

const routes = [
  { path: "/", redirect: "/add" },
  { path: "/add", name: "AddPerson", component: AddPerson },
  { path: "/list", name: "ListPersons", component: ListPersons },
  { path: "/view", name: "ViewPerson", component: ViewPerson },
  { path: "/edit", name: "EditPerson", component: EditPerson },
  { path: "/delete", name: "DeletePerson", component: DeletePerson },
  { path: "/stats", name: "BmiStats", component: BmiStats },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;