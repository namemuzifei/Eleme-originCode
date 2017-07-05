<template>
	<section>
		<!-- 商品组件主体 -->
		<section class="goods">
			<!-- 左侧分类 -->
			<section class="kinds_wrapper">		<!-- 配合滚动插件 -->
				<ul class="kinds" ref="kinds">
					<li v-for="(good,index) in goods" :class="{current:currentIndex===index}" @click="selectkind(index)"><div>{{good.name}}</div></li>
				</ul>
			</section>
			<!-- 右侧商品列表 -->
			<section class="list" ref="list">	<!-- 配合滚动插件 -->
				<section>
					<dl v-for="good in goods">
						<dt>{{good.name}}</dt>
						<dd v-for="food in good.foods" @click="selectDetail(food)">
							<section class="food">
								<img :src="food.icon" alt="">
								<section class="content">
									<h3>{{food.name}}</h3>
									<p>{{food.description}}</p>
									<p>月售{{food.sellCount}}份&nbsp;&nbsp;&nbsp;好评率{{food.rating}}%</p>
									<span>￥<em>{{food.price}}</em></span>
									<del v-if="food.oldPrice">￥{{food.oldPrice}}</del>
								</section>
								<ele-count :food="food"></ele-count>
							</section>
						</dd>
					</dl>
				</section>
			</section>
		</section>
		<!-- 商品详情 -->
		<transition name="silder">
			<ele-detail v-show="detail_show" class="detail"></ele-detail>
		</transition>
		<!-- 商品组件购物车组件 -->
		<ele-cart></ele-cart>
	</section>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	//引入第三方插件
	const IScroll = require('../../../static/js/iscroll-probe.js');
	
	//引入子组件
	import Detail from '../Detail/Detail.vue'
	import Cart from '../Cart/Cart.vue'
	import Count from '../Count/Count.vue'
	
	export default {
		//定义私有数据
		data(){
			return {
				//关联当前索引值
				currentIndex : 0,
				//获取右侧商品列表的所有dl的距离文档顶部的距离
				listTop : []
			};
		},
		
		//挂载完成时
		mounted(){
			//实例化左侧分类
			this.kindsScroll = new IScroll( '.kinds_wrapper',{click:true} );
			
			//实例化右侧商品列表
			this.listScroll = new IScroll('.list',{probeType:2,click:true});
			
			//获取左侧分类区域各dom元素
			this.lis = Array.from( this.$refs.kinds.querySelectorAll('li') );
			//获取右侧商品列表区域各dom元素
			this.dls = Array.from( this.$refs.list.querySelectorAll('dl') );

			//获取右侧商品列表各dl距离文档顶部的距离
			this.dls.forEach( (item) => {
				//console.log(item);
				this.listTop.push( item.offsetTop );
			} );
			//console.log(this.listTop);
			
			let _this = this;
			//为右侧商品列表注册自定义scroll事件
			this.listScroll.on( 'scroll', function(){
				//console.log( Math.abs(this.y) );
				//获取当前滚动距离
				let dis = Math.abs(this.y);
				
				//遍历各dl距离文档顶部的距离，并与滚动距离比较，输出当前滚动距离所匹配的top区间的dl的索引值
				for( let i = 0; i < _this.listTop.length; i++ ){
					let start = _this.listTop[i];;
					let end = _this.listTop[i+1];

					//当滚动距离大于等于某个dl的top值，且小于下一个dl的top值时，输出该dl的索引值；或者，当到达最后一个时，end为undefinedl
					if( ( start <= dis && dis < end ) || !end ){
						_this.currentIndex = i;
						break;
					}
				}
				//console.log( _this.currentIndex );
				//根据滚动时获取到的索引值，确定左侧分类区域，然后跳转
				_this.kindsScroll.scrollToElement( _this.lis[_this.currentIndex] );
			} );
		},
		
		//定义方法
		methods : {
			//点击左侧分类，跳转右侧区域
			selectkind(index){
				//根据左侧点击的分类处确定对应的索引值
				this.currentIndex = index;
				
				//根据确定的索引值，确定右侧相应的商品区域，然后跳转
				this.listScroll.scrollToElement( this.dls[index] );
			},
			
			//映射store中的mutations方法
			...mapMutations( [
				'show_control',
				'selectDetail'
			] ),
			
			//点击商品时触发的事件处理函数
			selectDetail(food){
				this.$store.commit( 'show_control', 'detail_show' );
				this.$store.commit( 'selectDetail', food );
			}
		},
		
		//定义计算属性
		computed : {
			//映射store中的状态
			...mapState( [
				'goods',
				'detail_show'
			] )
		},
		
		//注册子组件
		components : {
			'ele-detail' : Detail,
			'ele-cart' : Cart,
			'ele-count' : Count
		}
	}
</script>

<style lang="less" scoped>
	/* 设置滑动的过渡效果 */
	.silder-enter,.silder-leave-active{
		transform:translateX(100%);
		opacity:0;
	}
	.silder-enter-active,.silder-leave-active{
		transition:all 0.5s;
	}
	/* 商品组件主体 */
	.goods{
		background-color:#f3f5f7;
		display:flex;
		font-size:12px;
		color:#07111b;
		position:fixed;
		left:0;
		right:0;
		top:175px;
		bottom:50px;
		overflow-y:hidden;
		/* 左侧分类 */
		ul.kinds{
			min-width:80px;
			li{
				height:54px;
				padding:0 12px;
				&.current{
					background-color:#fff;
					div{border:none;}
				}
				div{
					height:100%;
					border-bottom:1px solid rgba(7,17,27,0.1);
					line-height:15px;
					display:flex;
					align-items:center;
				}
			}
		}
		/* 右侧商品列表 */
		section.list{
			color:rgb(147,153,159);
			width:100%;
			dl{
				dt{
					height:26px;
					line-height:26px;
					border-left:2px solid #d9dde1;
					padding-left:14px;
				}
				dd{
					background-color:#fff;
					&:not(:last-of-type) .food{
						border-bottom:1px solid #eaecef;
					}
					.food{
						margin:0 18px;
						padding:18px 0;
						display:flex;
						img{
							width:64px;
							height:64px;
							margin-right:10px;
						}
						.content{
							h3{
								font-size:14px;
								line-height:14px;
								color:rgb(7,17,27);
								font-weight:bold;
							}
							p{
								margin:8px 0;
							}
							span{
								color:#f01414;
								line-height:20px;
								margin-right:8px;
								em{
									font-size:16px;
									font-weight:bold;
								}
							}
							del{
								line-height:20px;
								font-weight:bold;
								font-size:12px;
							}
						}
					}
				}
			}
		}
	}
</style>