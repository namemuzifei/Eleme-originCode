<template>
	<div class="comments">
		<header>
			<section class="left">
				<h2>{{seller.score}}</h2>
				<p>综合评分</p>
				<span>高于周边商家{{seller.rankRate}}%</span>
			</section>
			<section class="right">
				<section>
					服务态度
					<!-- 评价星级 -->
					<ele-star class="star_wrapper" :score="seller.serviceScore"></ele-star>
					
					<i>{{seller.serviceScore}}</i>
				</section>
				<section>
					食品评价
					<!-- 评价星级 -->
					<ele-star class="star_wrapper" :score="seller.foodScore"></ele-star>
					
					<i>{{seller.foodScore}}</i>
				</section>
				<section>
					送达时间
					<em>{{seller.deliveryTime}}分钟</em>
				</section>
			</section>
		</header>
		<main>
			<section>
				<section class="kinds">
					<section @touchstart="selectFilter('all',$event)" class="on">全部<i>{{ratings.length}}</i></section>
					<section @touchstart="selectFilter('good',$event)">满意<i>{{goodRating}}</i></section>
					<section @touchstart="selectFilter('bad',$event)">不满意<i>{{ratings.length-goodRating}}</i></section>
				</section>
				<section class="only_content">
					<input type="checkbox" @click="filterContent(!hasContent)" :checked="hasContent">
					只看有内容的评价
				</section>
				<ul class="list">
				<li v-for="rating in filterRatings">
					<img :src="rating.avatar" alt="">
					<section class="estimate">
						<h4>{{rating.username}}</h4>
						<div>
							<!-- 评价星级 -->
							<ele-star class="star_wrapper" :score="rating.score"></ele-star>
							
							<em v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</em>
						</div>
						<p>{{rating.text}}</p>
						<section class="recommend">
							<i class="iconfont" :class="{'icon-damuzhi':!rating.rateType,'icon-down':rating.rateType}"></i>
							<span v-for="item in rating.recommend" >{{item}}</span>
						</section>
					</section>
					<section class="time">
						{{new Date(rating.rateTime).toLocaleString()}}
					</section>
				</li>
			</ul>
			</section>
		</main>
	</div>
</template>

<script>
	//引入第三方插件
	const IScroll = require('../../../static/js/iscroll-probe.js');
	
	import {mapState,mapGetters} from 'vuex';
	
	//引入子组件
	import Start from '../Star/Star.vue'
	
	export default {
		
		//定义方法
		methods : {
			//选择筛选评论的要求
			selectFilter(str,e){
				this.$store.commit( 'selectFilter',str );
				
				//点谁为谁添加样式
				e.target.parentNode.querySelectorAll('section').forEach( item => {
					item.classList.remove( 'on' );
				} );
				e.target.classList.add( 'on' );
			},
			filterContent(hasRatingContent){		//用v-model时,输出的true或false总是会与显示的相反
//				console.log( hasRatingContent );
				this.$store.commit( 'filterContent',hasRatingContent );
			}
		},
		//定义计算属性
		computed : {
			...mapState( [
				'ratings',			//所有的店家评论
				'seller',			//店家信息
				'hasContent'
			] ),
			...mapGetters( [
				'filterRatings',	//被选中的店家评论
			] ),
			
			//获取好评数
			goodRating(){
				let goodCount = 0;
				this.ratings.forEach( item => {
//					console.log( item.rateType );
					if( !item.rateType ){
						goodCount++;
					}
				} );
				return goodCount;
			}
		},
		
		//注册子组件
		components : {
			'ele-star' : Start
		},
		
		//挂载到dom元素完成--获取初始环境下的滑动环境
		mounted(){
			new IScroll( 'main',{click:true} );
		},
		//数据筛选时，变化滑动环境
		updated(){
			new IScroll( 'main',{click:true} );
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
	.comments{
		background-color:#f3f5f7;
		header{
			.fff;
			.border_tb;
			color:rgb(7,17,27);
			font-size:14px;
			height:100px;
			margin:-1px 0 0;
			padding:0 24px;
			display:flex;
			align-items:center;
			.left{
				flex:275;
				text-align:center;
				border-right:1px solid #ebebec;
				padding-right:24px;
				margin-right:24px;
				h2{
					font-size:24px;
					color:#ff9900;
				}
				p{
					margin:6px 0 8px;
				}
				span{
					color:#93999f;
					font-size:12px;
					white-space:nowrap;
				}
			}
			.right{
				flex:474;
				section{
					display:flex;
					align-items:center;
					&:not(:last-of-type){
						margin-bottom:10px;
					}
					/* 评价星级 */
					.star_wrapper{
						width:60px;
						height:10px;
						transform:scale(1.2);
						margin:0 17px;
					}
					i{
						color:#ff9900;
					}
					em{
						color:#93999f;
						margin-left:12px;
					}
				}
			}
		}
		main{
			.fff;
			.border_tb;
			/* 设置窗口反弹滚动 */
			position:fixed;
			left:0;
			right:0;
			top:275px;
			bottom:0;
			overflow-y:hidden;
			
			.kinds{
				display:flex;
				border-bottom:1px solid #e6e7e8;
				padding:18px 0;
				margin:0 18px;
				section{
					height:40px;
					width:75px;
					line-height:40px;
					text-align:center;
					margin-right:10px;
					&:first-of-type{background-color:#00a0dc;}
					&:nth-of-type(2){background-color:#ccecf8;}
					&:last-of-type{background-color:#e9ebec;}
					i{
						font-size:14px;
						margin-left:3px;
					}
				}
				section.on{color:#fff;}
			}
			.only_content{
				color:#93999f;
				padding:18px 18px;
				border-bottom:2px solid #e6e7e8;
			}
			ul.list{
				padding:0 18px;
				li{
					padding:18px 0;
					border-bottom:1px solid #eeeff0;
					font-size:12px;
					color:#b8bcbf;
					display:flex;
					position:relative;
					img{
						width:28px;
						height:28px;
						border-radius:50%;
						margin-right:12px;
					}
					.estimate{
						h4{color:#2c3238;}
						div{
							display:flex;
							align-items:center;
							.star_wrapper{
								width:50px;
								height:10px;
								margin:4px 6px 6px 0;
							}
						}
						p{
							color:#2c3238;
							font-size:15px;
							line-height:20px;
							margin-bottom:8px;
						}
						.recommend{
							i{
								color:#00a0dc;
								font-size:12px;
								&.icon-down{color:#b7bbbf}
								margin-right:8px;
							}
							span{
								border:1px solid #f2f3f3;
								margin-right:8px;
								display:inline-block;
								vertical-align:middle;
								width:35px;
								padding:3px 3px;
								
								white-space:nowrap;
								overflow:hidden;
								text-overflow:ellipsis;
								text-align:center;
							}
						}
					}
					.time{
						position:absolute;
						top:18px;
						right:18px;
					}
				}
			}
		}
	}
</style>