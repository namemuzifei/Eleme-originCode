<template>
	<section class="shop">
		<header>
			<section class="top">
				<section class="left">
					<h2>{{seller.name}}</h2>
					<section class="sales">
						<!-- 评价星级 -->
						<ele-star class="star_wrapper" :score="seller.score"></ele-star>
						
						<i>( {{seller.ratingCount}} )</i>
						<span>月售{{seller.sellCount}}单</span>
					</section>
				</section>
				<section class="right">
					<i class="iconfont icon-aixin" @click="collect($event)"></i>
					<p ref="collect_txt">点击收藏</p>
				</section>
			</section>
			
			<ul class="bottom">
				<li>
					<p>起送价</p>
					<span>{{seller.minPrice}}</span>元
				</li>
				<li>
					<p>商家配送</p>
					<span>{{seller.deliveryPrice}}</span>元
				</li>
				<li>
					<p>平均配送时间</p>
					<span>{{seller.deliveryTime}}</span>分钟
				</li>
			</ul>
		</header>
		
		<section class="introduce">
			<h2>公司与活动</h2>
			<p>{{seller.bulletin}}</p>
			<ul>
				<li v-for="support in seller.supports">
					<img :src="small_img(support.type)" alt="">
					<span>{{support.description}}</span>
				</li>
			</ul>
		</section>
		
		<section class="view">
			<h2>商家实景</h2>
			<section class="view_pics">
				<div :style="view_pics_width">
					<img v-for="pic in seller.pics" :src="pic" alt="">
				</div>
			</section>
		</section>
		
		<section class="info">
			<h2>商家信息</h2>
			<ul>
				<li v-for="info in seller.infos">{{info}}</li>
			</ul>
		</section>
	</section>
</template>

<script>
	import {mapState} from 'vuex';
	
	//引入第三方插件
	const IScroll = require('../../../static/js/iscroll-probe.js');
	
	//引入子组件
	import Start from '../Star/Star.vue'
	
	export default {
		//定义方法
		methods : {
			//选定相应的活动图标
			small_img( i ){
				return this.support_img[i];
			},
			
			//点击收藏时触发的事件处理函数
			collect(e){
				e.target.classList.toggle( 'on' );
//				console.log( e.target.classList.contains('on') );
				if( e.target.classList.contains('on') ){
					this.$refs.collect_txt.innerHTML = '已收藏';
				}else{
					this.$refs.collect_txt.innerHTML = '点击收藏';
				}
			}
		},
		
		//定义计算属性
		computed : {
			...mapState( [
				'seller',
				'support_img'
			] ),
			
			//实景图片的总宽度
			view_pics_width(){
				return {width : this.seller.pics.length*130 + 'px'};
			}
		},
		
		//注册子组件
		components : {
			'ele-star' : Start
		},
		
		//挂载到dom元素完成--获取初始环境下的滑动环境
		mounted(){
			new IScroll( '.view_pics',{
				scrollX : true,
				scrollY : false,
				click:true
			} );
			
		},
		//数据筛选时，变化滑动环境
		updated(){
			new IScroll( '.view_pics',{
				scrollX : true,
				scrollY : false,
				click:true
			} );
		}
	}
</script>

<style lang="less" scoped>
	/* 引入自定义字体 */
	@import '../../assets/css/font.css';
	
	.fff{background-color:#fff;}
	.border_tb{
		border-top:1px solid #e6e7e8;
		border-bottom:1px solid #e6e7e8;
	}
	
	.shop{
		background-color:#f3f5f7;
		font-size:12px;
		h2{
			margin:18px 0 12px;
			font-weight:bold;
			font-size:15px;
		}
		header{
			.fff;
			padding:0 18px;
			.top{
				display:flex;
				justify-content:space-between;
				.left{
					.sales{
						display:flex;
						/* 评价星级 */
						.star_wrapper{
							width:80px;
							height:15px;
						}
						i{margin:0 12px 0 8px;}
					}
				}
				.right{
					margin-top:18px;
					text-align:center;
					font-size:15px;
					i{
						font-size:20px;
						&.on{color:#f01414;}
					}
					p{
						margin-top:4px;
						width:60px;
					}
				}
			}
			ul.bottom{
				border-top:1px solid #edeeef;
				margin-top:18px;
				padding:18px 0;
				display:flex;
				text-align:center;
				li{
					&:not(:last-of-type){border-right:1px solid #dedfe0;}
					flex:auto;
					p{
						color:#959ba1;
						margin-bottom:5px;
					}
					span{font-size:25px;}
				}
			}
		}
		.introduce{
			.fff;
			.border_tb;
			padding:0 18px;
			margin:16px 0;
			p{
				padding:0 12px 16px;
				color:#f47171;
				line-height:24px;
			}
			ul{
				li{
					border-top:1px solid #edeeef;
					padding:16px 12px;
					display:flex;
					align-items:center;
					img{
						height:16px;
						margin-right:6px;
					}
				}
			}
		}
		.view{
			.fff;
			.border_tb;
			padding:0 0 18px 18px;
			margin-bottom:16px;
			.view_pics{
				overflow-x:hidden;
				width:100%;
				div{
					display:flex;
					img{
						width:120px;
						height:90px;
						&:not(:last-of-type){margin-right:10px;}
					}
				}
				
			}
			
		}
		.info{
			.fff;
			.border_tb;
			padding:0 18px;
			ul{
				li{
					border-top:1px solid #f4f4f5;
					font-size:13px;
					padding:16px 12px
				}
			}
		}
	}
</style>