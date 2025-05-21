import { createRouter, createWebHistory } from 'vue-router'
import AddPerson from '@/components/AddPerson.vue'
import ListPersons from '@/components/ListPersons.vue'
import ViewPerson from '@/components/ViewPerson.vue'
import EditPerson from '@/components/EditPerson.vue'
import DeletePerson from '@/components/DeletePerson.vue'

const routes = [
  {
    path: '/',
    name: 'AddPerson',
    component: AddPerson
  },
  {
    path: '/view-all',
    name: 'ViewAll',
    component: ListPersons
  },
  {
    path: '/view-one',
    name: 'ViewOne',
    component: ViewPerson
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditPerson
  },
  {
    path: '/delete',
    name: 'Delete',
    component: DeletePerson
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router