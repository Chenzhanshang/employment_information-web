import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import userMessage from '../components/userMessage.vue'
import updateMessage from '../components/updateMessage.vue'
import announcement from '../components/announcement.vue'
import chair from '../components/chair.vue'
import job from '../components/job.vue'
import file from '../components/file.vue'

import adminHome from '../admin/home.vue'
import feedback from '../admin/feedback.vue'
import adminAnnouncement from '../admin/announcement.vue'
import adminChair from '../admin/chair.vue'
import adminJob from '../admin/job.vue'
import userManage from '../admin/userManage.vue'
import adminFile from '../admin/file.vue'

Vue.use(VueRouter)

const routes = [
  {
    name:'/',
    path:'/',
    redirect:'/login'
  },
  {
    name:'/login',
    path:'/login',
    component:login
  },
  {
    name:'/home',
    path:'/home',
    component:home,
    children:[
      {
        path:'userMessage',
        component:userMessage
      },
      {
        path:'updateMessage',
        component:updateMessage
      },
      {
        path:'announcement',
        component:announcement
      },
      {
        path:'chair',
        component:chair
      },
      {
        path:'job',
        component:job
      },
      {
        path:'file',
        component:file
      }
    ]
  },
  {
    name:'/adminHome',
    path:'/adminHome',
    component:adminHome,
    children:[
      {
        path:'feedback',
        component:feedback
      },
      {
        path:'adminAnnouncement',
        component:adminAnnouncement
      },
      {
        path:'adminChair',
        component:adminChair
      },
      {
        path:'adminJob',
        component:adminJob
      },
      {
        path:'userManage',
        component:userManage
      },
      {
        path:'adminFile',
        component:adminFile
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
