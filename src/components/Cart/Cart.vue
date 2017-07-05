<template>
	<section>
		<section class="cart-wrapper" @click.stop="show_control('list_show')">
			<section class="left">
				<div class="cart_outer" >
					<div class="cart_inner">
						<i class="iconfont icon-gouwuche"></i>
					</div>
					<span v-show="totalCount">{{totalCount}}</span>
				</div>
			</section>
			<!-- 商品列表内有商品时，显示 -->
			<section class="middle" v-show="totalCount">
				<em class="on">￥{{totalPrice}}</em>
				<strong v-show="totalPrice<=seller.deliveryPrice">另需配送费￥{{seller.deliveryPrice}}</strong>
			</section>
			<!-- 商品列表内没有商品时，显示 -->
			<section class="middle" v-show="!totalCount">
				<p>未选购商品</p>
			</section>
			
			<section class="right">
				<p v-show="!totalPrice">￥{{seller.minPrice}}起送</p>
				<p v-show="seller.minPrice-totalPrice>0">还差{{seller.minPrice-totalPrice}}元起送</p>
				<div v-show="totalPrice>=seller.minPrice" class="on">结算</div>
			</section>
		</section>
		<!-- 购物车商品列表 -->
		<transition name="vary">
			<section class="list_wrapper" v-show="list_show">
				<section class="list_inner">
					<transition-group tag="ul" name="slider" class="list">
						<li :key="1" class="header">
							<h3>购物车</h3>
							<span @click.stop="clear">清空</span>
						</li>
						<li v-for="item in cart_food" :key="item.name">
							<strong>{{item.name}}</strong>
							<em>￥<i>{{item.price*item.count}}</i></em>
							<ele-count class="count" :food="item"></ele-count>
						</li>
					</transition-group>
				</section>
				<section class="list_bg" @click.stop="show_control('list_show')"></section>
			</section>
		</transition>
	</section>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex';
	
	//引入子组件
	import Count from '../Count/Count.vue'
	
	export default {
		
		//定义方法
		methods : {
			//控制购物车列表的显示
			show_control(){
				//当购物车内有商品时，点击时可以显示，否则不显示
				if( this.totalCount ){
					this.$store.commit( 'show_control','list_show' );
				}
			},
			
			//映射store中的mutations方法
			...mapMutations( ['clear'] )
			
		},
		
		//定义计算属性
		computed : {
			//映射store中的状态
			...mapState( [
				'seller',
				'list_show',
				'cart_food'
			] ),

			...mapGetters( [
				'totalCount',
				'totalPrice'
			] ),
		},
		
		//定义监听
		watch : {
			cart_food : function(){
				//根据购物车中是否有商品控制商品列表显示与隐藏
				if( this.cart_food.length == 0 && this.list_show ){
					this.$store.commit( 'show_control','list_show' );
				}
			}
		},
		
		//注册组件
		components : {
			'ele-count' : Count
		}
	}
</script>

<style lang="less" scoped>
	/* 引入自定义字体 */
	@import '../../assets/css/font.css';
	/* 定义商品列表整体的淡入淡出动画 */
	.vary-enter,.vary-leave-active{
		opacity:0;
	}
	.vary-enter-active,.vary-leave-active{
		transition:all 0.5s;
	}

	/* 定义商品列表中单个商品订单的滑动动画 */
	.list>li{
		transition:all 0.5s;
	}
	
	.slider-enter,.slider-leave-active{
		transform:translateY(30px);
		opacity:0;
	}
	
	.slider-leave-active{
		position:absolute;
	}
	
	/* 购物车默认显示 */
	.cart-wrapper{
		position:fixed;
		z-index:3;
		bottom:0;
		width:100%;
		height:50px;
		background-color:#141d27;
		color:#8f9194;
		display:flex;
		align-items:center;
		.left{
			margin:0 12px 10px;
			.cart_outer{
				position:relative;
				width:56px;
				height:56px;
				border-radius:50%;
				background-color:#141d27;
				display:flex;
				.cart_inner{
					width:44px;
					height:44px;
					background-color:rgba(255,255,255,0.2);
					border-radius:50%;
					margin:auto;
					text-align:center;
					line-height:44px;
					i{
						font-size:24px;
					}
				}
				span{
					position:absolute;
					top:0;
					right:0;
					transform:translateX(25%);
					width:20px;
					height:20px;
					line-height:20px;
					border-radius:50%;
					background-color:#f00;
					color:#fff;
					text-align:center;
				}
			}
		}
		.middle{
			flex:auto;
			margin-right:12px;
			em{
				flex:auto;
				font-size:20px;
				font-weight:bold;
				border-right:1px solid #2c343d;
				padding-right:10px;
				margin-right:10px;
			}
			em.on{color:#fff;}
			strong{
				font-size:15px;
			}
		}
		.right{
			margin-left:auto;
			width:105px;
			height:100%;
			line-height:50px;
			text-align:center;
			flex-shrink:0;
			background-color:#2b333b;
			font-weight:bold;
			div{
				font-size:20px;
				background-color:green;
			}
			div.on{color:#fff;}
		}
	}
	/* 购物车商品列表 */
	.list_wrapper{
			position:fixed;
			top:0;
			bottom:50px;
			left:0;
			right:0;
			.list_inner{
				position:absolute;
				bottom:0;
				left:0;
				right:0;
				background-color:#fff;
				color:rgb(7,17,27);
				font-size:16px;
				header{
					
				}
				.list{
					li:first-of-type{
						height:49px;
						display:flex;
						align-items:center;
						justify-content:space-between;
						background-color:#f3f5f7;
						border-bottom:1px solid rgba(7,17,27,0.1);
						span{
							color:rgb(0,160,220);
							font-size:14px;
						}
					}
					li{
						padding:0 18px;
						height:48px;
						border-bottom:1px solid rgba(7,17,27,0.1);
						display:flex;
						align-items:center;
						overflow:hidden;
						em{
							flex:auto;
							text-align:right;
							color:rgb(240,20,20);
							font-size:14px;
							vertical-align:-3px;
							i{
								font-weight:bold;
								font-size:20px;
							}
						}
						.count{
							align-self:center;
							width:56px;
							margin-left:12px;
							margin-top:1px;
						}
					}
				}
			}
			/* 遮罩层 */
			.list_bg{
				width:100%;
				height:100%;
				background-color:rgba(7,17,27,0.6);
			}
		}
</style>