<template>
	<section class="detail">
		<div>
			<section class="close" @click="show_control('detail_show')"> < </section>
			<img :src="detail_food.image" alt="">
			<section class="info">
				<h2>{{detail_food.name}}</h2>
				<p>{{detail_food.description}}</p>
				<p>月售{{detail_food.sellCount}}&nbsp;&nbsp;好评率{{detail_food.rating}}</p>
				<section class="cart_wrapper">
					<div class="price">
						<span>￥<i>{{detail_food.price}}</i></span>
						<del v-if="detail_food.oldPrice">￥{{detail_food.oldPrice}}</del>
					</div>
					<strong @touchstart.stop="addToCart(detail_food)">加入购物车</strong>
				</section>
			</section>
			<section class="introduce">
				<h2>商品介绍</h2>
				<p>{{detail_food.info}}</p>
			</section>
			<section class="comment">
				<h2>商品评价</h2>
				<main>
					<section class="kinds">
						<section @click="selectFilter_detail('all',$event)">全部<i>{{ratings.length}}</i></section>
						<section @click="selectFilter_detail('good',$event)">推荐<i>{{goodRating}}</i></section>
						<section @click="selectFilter_detail('bad',$event)">吐槽<i>{{ratings.length-goodRating}}</i></section>
					</section>
					<section class="only_content">
						<input type="checkbox" @click="filterContent_detail(!detailHasContent)" :checked="detailHasContent">
						只看有内容的评价
					</section>
					<ul class="list">
						<li v-for="rating in filterRatings_detail">
							<section class="estimate">
								{{new Date(rating.rateTime).toLocaleString()}}
								<p>
									<i class="iconfont" :class="{'icon-damuzhi':!rating.rateType,'icon-down':rating.rateType}"></i>
									<span>{{rating.text}}</span>
								</p>
							</section>
							<section class="user">
								<h4>{{rating.username}}</h4>
								<img :src="rating.avatar" alt="">
							</section>
						</li>
					</ul>
				</main>
			</section>
		</div>
	</section>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex';
	
	//引入第三方插件
	const IScroll = require('../../../static/js/iscroll-probe.js');
	
	export default {
		data(){
			return {
				ratings : []
			};
		},
		//定义方法
		methods : {
			...mapMutations( [
				'show_control',
				'addToCart'
			] ),
			
			//选择筛选评论的要求
			selectFilter_detail(str,e){
				this.$store.commit( 'selectFilter_detail',str );
				
				//点谁为谁添加样式
				e.target.parentNode.querySelectorAll('section').forEach( item => {
					item.classList.remove( 'on' );
				} );
				e.target.classList.add( 'on' );
			},
			filterContent_detail(hasRatingContent){		//用v-model时,输出的true或false总是会与显示的相反
				this.$store.commit( 'filterContent_detail',hasRatingContent );
			}
			
		},
		//定义计算属性
		computed : {
			
			//映射store中点击时提交的商品的状态
			...mapState( [
				'detail_food',
				'detailHasContent'
			] ),
			
			...mapGetters( [
				'filterRatings_detail',	//被选中的店家评论
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
			},
		},
		
		//挂载到dom元素完成--获取初始环境下的滑动环境
		mounted(){
			new IScroll( '.detail',{click:true} );
			
		},
		//数据筛选时，变化滑动环境
		updated(){
			new IScroll( '.detail',{click:true} );

			//获取具体食物的评论
			this.ratings =  this.detail_food.ratings;
		}
	}
</script>

<style lang="less" scoped>
	.fff{background-color:#fff;}
	.p18{padding:18px;}
	.border-tb{
		border-top:1px solid rgba(7,17,27,0.1);
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	/* 商品详情 */
	.detail{
		/* 配合反弹滑动 */
		position:fixed;
		top:0;
		bottom:50px;
		left:0;
		right:0;
		overflow-y:hidden;
		
		background-color:#f3f5f7;
		font-size:12px;
		color:#9ca2a7;
		.close{
			position:absolute;
			top:10px;
			left:10px;
			color:#fff;
			font-size:40px;
		}
		img{
			width:100%;
			height:375px;
			vertical-align:top;
		}
		h2{
			font-size:14px;
			color:rgb(7,17,27);
			font-weight:bold;
			margin-bottom:8px;
		}
		.info{
			.fff;
			.p18;
			.border-tb;
			p{
				margin:8px 0;
				line-height:14px;
			}
			.cart_wrapper{
				margin-top:18px;
				display:flex;
				justify-content:space-between;
				align-items:center;
				.price{
					font-weight:bold;
					display:flex;
					span{
						line-height:24px;
						color:rgb(240,20,20);
						margin-right:10px;
						i{font-size:18px;}
					}
					del{
						line-height:24px;
					}
				}
				strong{
					background-color:rgb(0,160,220);
					color:#fff;
					width:80px;
					height:25px;
					line-height:25px;
					text-align:center;
					border-radius:12px;
				}
			}
		}
		.introduce{
			.fff;
			.p18;
			.border-tb;
			margin:16px 0;
			p{
				font-size:14px;
				line-height:24px;
				color:#676e74;
			}
		}
		.comment{
			.fff;
			.border-tb;
			h2{
				.p18;
			}
			main{
				font-size:16px;
				
				.kinds{
					display:flex;
					border-bottom:1px solid #e6e7e8;
					padding:0 0 18px;
					margin:0 18px;
					section{
						height:40px;
						width:75px;
						line-height:40px;
						text-align:center;
						color:#4f5860;
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
						padding:16px 0;
						border-bottom:1px solid #eeeff0;
						color:#b8bcbf;
						display:flex;
						justify-content:space-between;
						position:relative;
						.estimate{
							p{
								font-size:18px;
								margin-top:15px;
								i{
									color:#00a0dc;
									&.icon-down{color:#b7bbbf}
									margin-right:4px;
								}
								span{color:#2c3238;}
							}
						}
						.user{
							display:flex;
							
							img{
								width:18px;
								height:18px;
								border-radius:50%;
								margin-left:6px;
							}
						}
					}
				}
			
			}
			
		}
		
	}
</style>