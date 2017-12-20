import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import predict from '@/views/predict'
import predict_info from '@/views/predict_info'
import rec from '@/views/rec'
import rec_info from '@/views/rec_info'
import test from '@/views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },

    {
      path: '/predict',
      name: 'predict',
      component: predict
    },
    {
      path: '/predict/:org/:page',
      name: 'predict',
      component: predict
    },

    {
      path: '/predict_info/:org/:number/:from_page',
      name: 'predict_info',
      component: predict_info,

    },

    {
      path: '/rec',
      name: 'rec',
      component: rec
    },
    {
      path: '/rec/:org/:page',
      name: 'rec',
      component: rec
    },
    {
      path: '/rec_info/:org/:number/:from_page',
      name: 'rec_info',
      component: rec_info
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})
