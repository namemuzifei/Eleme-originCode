import Vue from 'vue'
import Router from 'vue-router'
//引入子组件
import Goods from '@/components/Goods/Goods'
import Comments from '@/components/Comments/Comments'
import Shops from '@/components/Shops/Shops'
	
Vue.use(Router)

export default new Router({
  routes: [
  	//配置默认情况下路由链路
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    //配置路由链路
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops
    },
  ]
})
