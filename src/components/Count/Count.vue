<template>
	<section class="count_wrapper">
		<section class="count">
			<!-- 减按钮 -->
			<transition name="roll">
				<i class="iconfont icon-jian reduce" v-show="single_count" @click.stop="reduceFromCart(food)"></i>
			</transition>
			
			<!-- 商品数量 -->
			<transition name="fade">
				<span v-show="single_count">{{single_count}}</span>
			</transition>
			
			<!-- 加按钮 -->
			<em class="iconfont icon-jia add" @click.stop="addToCart(food)"></em>
		</section>
	</section>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	
	export default {
		//接收父组件传递的数据
		props : {
			food : {
				type : Object,
				required : true
			}
		},
		
		//定义方法
		methods : {
			
			...mapMutations( [
				
				'reduceFromCart',
			] ),
			addToCart( food ){
				this.$store.commit( 'addToCart',food );
			}
			
		},
		
		//定义计算属性
		computed : {
			...mapState( ['cart_food'] ),
			
			//获取某个食物对象的数量
			single_count(){
				for( let i = 0; i < this.cart_food.length; i++ ){
					if( this.food.name == this.cart_food[i].name ){
						return this.cart_food[i].count;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	/*设置过渡效果*/ 
	.roll-enter-active,.roll-leave-active,.fade-enter-active,.fade-leave-active{transition:all 0.5s linear;}
	
	/* 设置减按钮的过渡效果 */
	.roll-enter,.roll-leave-active{
		opacity:0;
		transform:translateX(40px) rotateZ(-180deg);
	}
	
	/* 设置商品数量过渡效果 */
	.fade-enter,.fade-leave-active{
		opacity:0;
	}
	
	.count_wrapper{
		color:rgb(0,160,220);
		font-size:24px;
		align-self:flex-end;
		margin-left:auto;
		position:relative;
		.count{
			width:56px;
			display:flex;
			justify-content:flex-end;
			position:absolute;
			top:0;
			transform:translateY(-50%);
			right:0;
			/* 数量 */
			span{
				width:24px;
				font-size:16px;
				color:rgb(147,153,159);
				text-align:center;
			}
			/* 加减按钮 */
			.reduce{
				position:absolute;
				top:-1px;
				left:0;
			}
		}
	}
</style>