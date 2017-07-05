<template>
  <div id="app">
  	<!-- 头部组件 -->
    <ele-header></ele-header>
    <!-- 主体区域 -->
    <!-- 路由链路请求 -->
    <ul class="nav">
    	<li><router-link to="/">商品</router-link></li>
    	<li><router-link to="comments">评论</router-link></li>
    	<li><router-link to="shops">商家</router-link></li>
    </ul>
    
    <!--路由显示区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
	//引入重置样式的css文件
	import './assets/css/reset.css'
	//引入子组件
	import Header from './components/Header/Header'
	
	export default {
	  name: 'app',
	  
	  //注册子组件
	  components : {
	  	'ele-header' : Header
	  }
	}
</script>

<style lang="less" scoped>
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  /*text-align: center;*/
	  color: #2c3e50;
	  /*margin-top: 60px;*/
	}
	.nav{
		height:40px;
		display:flex;
		justify-content:space-around;
		align-items:center;
		font-size:14px;
		border-bottom:1px solid rgba(7,17,27,0.1);
		a{
			text-decoration:none;
			color:rgb(77,85,93);
			&.router-link-exact-active{
				color:rgb(240,20,20);
			}
		}
	}
</style>
