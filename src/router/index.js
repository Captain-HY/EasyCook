import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [{
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
        path: 'home',
        name: 'Home',
        alias: '',
        component: () => import('../views/Home.vue'),
        children: [{
          alias: '',
          path: 'find',
          name: 'find',
          component: () => import('../views/Find.vue'),
          meta: {
            keepAlive: true,
            deepth: 1
          }
        }, {
          path: 'focus',
          name: 'focus',
          component: () => import('../views/Focus.vue'),
          meta: {
            keepAlive: true,
            deepth: 1
          }

        }, {
          path: 'event',
          name: 'event',
          component: () => import('../views/Event.vue'),
          meta: {
            keepAlive: true,
            deepth: 1
          }
        }, ],
        redirect: 'find'
      },
      {
        path: 'cate',
        name: 'Cate',
        component: () => import('../views/Cate.vue'),
        meta: {
          keepAlive: true,
          deepth: 2
        }

      },

      {
        path: 'note',
        name: 'Note',
        component: () => import('../views/Note.vue')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
        meta: {
          keepAlive: true,
          deepth: 1
        }
      },
    ]
  },
  {
    path: '/detail/',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      keepAlive: true,
      deepth: 3
    }

  },
  {
    path: '/item/:id',
    name: 'Item',
    component: () => import('../views/Item.vue'),
    meta: {
      keepAlive: false,
      deepth: 4
    }

  },
  {
    path: '/notedetail/:id',
    name: 'NoteDetail',
    component: () => import('../views/NoteDetail.vue'),
    meta: {
      keepAlive: false,
      deepth: 4
    }

  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      keepAlive: false,
      deepth: 4
    }

  }, {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue'),


  }, 
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router