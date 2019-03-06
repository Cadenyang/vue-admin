import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    name: 'Assets',
    alwaysShow: true,
    meta: { title: 'Assets', icon: 'assets' },
    children: [
      {
        path: '/transactions',
        component: () => import('@/views/assets/index'),
        name: 'Transactions',
        meta: { title: 'Transactions', icon: 'transactions' }
      }
    ]
  },

  {
    path: '/orders',
    component: Layout,
    name: 'Orders',
    meta: { title: 'Orders', icon: 'order', affix: true },
    children: [
      // {
      //   path: '/sell',
      //   component: () => import('@/views/order/index'),
      //   name: 'Sell',
      //   meta: { title: 'Sell', icon: 'sell' }
      // },
      // {
      //   path: '/buy',
      //   component: () => import('@/views/order/buy'),
      //   name: 'Buy',
      //   meta: { title: 'Buy', icon: 'buy' }
      // },
      {
        path: '/commodity_sale',
        component: () => import('@/views/order/commodity_sale'),
        name: 'Commodity_Sale',
        meta: { title: 'Commodity_Sale', icon: 'sale' }
      },
      {
        path: '/rewards',
        component: () => import('@/views/order/rewards'),
        name: 'Rewards',
        meta: { title: 'Rewards', icon: 'rewards' }
      }
      // {
      //   path: '/recharge',
      //   component: () => import('@/views/order/recharge'),
      //   name: 'Recharge  ',
      //   meta: { title: 'Recharge', icon: 'order' }
      // }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'setting',
        component: () => import('@/views/setting/index'),
        name: 'setting',
        meta: { title: 'Settings', icon: 'setting' }
      }
    ]
  }
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: { title: 'Nested', icon: 'nested' },
  //   children: [
  //     {
  //       path: 'menu1-1',
  //       component: () => import('@/views/nested/menu1/menu1-1'),
  //       name: 'Menu1-1',
  //       meta: { title: 'Menu1-1' }
  //     },
  //     {
  //       path: 'menu1-2',
  //       component: () => import('@/views/nested/menu1/menu1-2'),
  //       name: 'Menu1-2',
  //       meta: { title: 'Menu1-2' }
  //     },
  //     {
  //       path: 'menu1-3',
  //       component: () => import('@/views/nested/menu1/menu1-3'),
  //       name: 'Menu1-3',
  //       meta: { title: 'Menu1-3' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // }

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
