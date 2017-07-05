<template>
	<section class="popup">
		<h2>{{seller.name}}</h2>
		<!-- 评价星级 -->
		<ele-star class="star_wrapper" :score="seller.score"></ele-star>
		
		<h3><span>优惠信息</span></h3>
		<ul>
			<li v-for="support in seller.supports">
				<img :src="small_img(support.type)" alt="">
				{{support.description}}
			</li>
		</ul>
		<h3><span>商家公告</span></h3>
		<p>{{seller.bulletin}}</p>
		<div class="close" @click="show_control('popup_show')">X</div>
	</section>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	
	//引入子组件
	import Start from '../Star/Star.vue'
	
	export default {
		//注册子组件
		components : {
			'ele-star' : Start
		},
		
		//定义方法
		methods : {
			...mapMutations( ['show_control'] ),
			
			//选定相应的活动图标
			small_img( i ){
				return this.support_img[i];
			}
			
		},
		//计算属性
		computed : {
			//映射store中的状态
			...mapState( [
				'seller',
				'support_img'
			] )
		}
	}
</script>

<style lang="less" scoped>
	.popup{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background:rgba(7,17,27,0.9);
		padding:64px 36px 0;
		font-size:12px;
		z-index:10;
		/* 商店名 */
		h2{
			font-size:16px;
			font-weight:bold;
			line-height:16px;
			text-align:center;
			margin-bottom:16px;
		}
		/* 评价星级 */
		.star_wrapper{
			width:200px;
			height:30px;
			margin:0 auto;
		}
		/* 主体 */
		h3{
			font-size:14px;
			font-weight:bold;
			line-height:14px;
			margin:28px 0 24px;
			&:before,&:after{
				content:'';
				display:inline-block;
				background:rgba(255,255,255,0.2);
				vertical-align:middle;
				width:112px;
				height:3px;
			}
			span{margin:0 10px;}
		}
		/* 优惠信息 */
		ul{
			padding:0 12px;
			li{
				line-height:16px;
				margin:0 0 12px 6px;
				display:flex;
				align-items:center;
				img{
					height:20px;
					margin-right:6px;
				}
			}
		}
		/* 商家公告 */
		p{
			padding:0 12px;
			line-height:24px;
		}
		/* 关闭按钮 */
		.close{
			font-size:32px;
			color:rgba(255,255,255,0.5);
			position:absolute;
			bottom:32px;
			left:50%;
			transform:translateX(-50%);
		}
	}
</style>