<template>
	<header>
		<!-- 商家基本信息 -->
		<section class="seller">
			<img :src="seller.avatar" alt="">
			<section class="seller-wrapper">
				<h2><i></i>{{seller.name}}</h2>
				<p>{{seller.description}} / {{seller.deliveryTime}}分钟到达</p>
				<div><em></em>{{seller.supports[0].description}}</div>
			</section>
			<section class="activities"  @click="show_control('popup_show')">
				<span>{{seller.supports.length}}个</span> >
			</section>
		</section>
		<!-- 公告信息 -->
		<section class="bulletin" @click="show_control('popup_show')">
			<em></em>
			<span>{{seller.bulletin}}</span>
			<i>></i>
		</section>
		<!-- 背景层 -->
		<section class="bg">
			<img :src="seller.avatar" alt="">
		</section>
		<!-- 弹出层组件 -->
		<transition name="bounce">
			<ele-popup v-show="popup_show"></ele-popup>
		</transition>
	</header>
</template>

<script>
	//引入vuex的方法
	import {mapState,mapMutations} from 'vuex';
	
	//引入子组件
	import Popup from '../Popup/Popup.vue'
	
	export default {
		//定义方法
		methods : {
			...mapMutations( ['show_control'] )
		},
		//计算属性
		computed : {
			...mapState( [
				'seller',
				'popup_show'
			] )
		},
		//注册子组件
		components : {
			'ele-popup' : Popup
		},
	}
</script>

<style lang="less" scoped>
	/* 设置弹出层的弹入弹出动画效果 */
	@keyframes bounce-in{
		from{transform:scale(0)}
		50%{transform:scale(1.5)}
		to{transform:scale(1)}
	}
	@keyframes bounce-out{
		from{transform:scale(1)}
		50%{transform:scale(1.5)}
		to{transform:scale(0)}
	}
	.bounce-enter-active{animation:bounce-in 0.5s;}
	.bounce-leave-active{animation:bounce-out 0.5s;}
	
	header{
		width:100%;
		height:134px;
		position:relative;
		color:#fff;
		font-size:10px;
		/* 商家基本信息 */
		.seller{
			background:rgba(7,17,27,0.5);
			padding:24px 12px 18px 24px;
			height:64px;
			display:flex;
			img{
				width:64px;
				height:64px;
				border-radius:4px;
				margin-right:16px;
			}
			.seller-wrapper{
				display:flex;
				flex-direction:column;
				justify-content:space-between;
				h2{
					font-size:16px;
					font-weight:bold;
					line-height:18px;
					i{
						display:inline-block;
						width:30px;
						height:18px;
						background:url('./images/brand@2x.png');
						background-size:contain;
						vertical-align:-3px;
						margin-right:6px;
					}
				}
				p{
					font-size:12px;
					line-height:12px;
				}
				em{
					display:inline-block;
					width:12px;
					height:12px;
					background:url('./images/decrease_1@2x.png');
					background-size:contain;
					vertical-align:-2px;;
					margin-right:4px;
				}
			}
			.activities{
				margin-left:auto;
				align-self:flex-end;
				background-color:rgba(0,0,0,0.2);
				width:50px;
				height:30px;
				line-height:30px;
				text-align:center;
				border-radius:20px;
				span{margin-right:2px;}
			}
		}
		/* 公告信息 */
		.bulletin{
			position:relative;
			background-color:rgba(0,0,0,0.6);
			padding:0 12px;
			height:28px;
			display:flex;
			align-items:center;
			em{
				min-width:22px;
				height:12px;
				background:url('./images/bulletin@2x.png');
				background-size: contain;
			}
			span{
				margin:0 4px;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
		}
		/* 背景层 */
		.bg{
			position:absolute;
			width:100%;
			height:100%;
			top:0;
			left:0;
			z-index:-1;
			filter:blur(5px);
			img{
				width:100%;
				height:100%;
			}
		}
	}
</style>