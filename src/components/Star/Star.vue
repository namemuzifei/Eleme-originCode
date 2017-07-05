<template>
	<section class="star_wrapper" ref="star_wrapper">
		<!-- 评价星级 -->
		<div class="star" v-for="item in 5">
			<div></div>
		</div>
	</section>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		//接收父组件传递的数据
		props : {
			score : {
				type : Number,
				required : true
			}
		},
		
		
		//挂载dom元素完毕后
		mounted(){
			//获取所有的单个的星星盒子
			let stars = Array.from( this.$refs.star_wrapper.querySelectorAll('.star') ),
//			console.log( stars );
			
			//将分数与数组的索引值相匹配
				score = this.score - 1;
			
			//获取分数整数部分右侧所有的星星盒子数组，遍历并将其下的子代金星宽度全部变为0
			stars.slice( Math.floor(score+1) ).forEach( star => {
				star.querySelector( 'div' ).style.width = 0;
			} );
			
			//对最后一颗金星进行操作---经测试可知只需要分数为小数的星星进行操作
			//获取分数所在的星星，即最后一个星星内的金星在其父类星星中所占的宽度比例
			let star_gold_last_widthRatio = this.score % Math.floor(this.score);
				
			//最后一个星星内的金星根据分数的小数部分变成部分的金星
//			console.log(stars.splice( Math.floor(score)+1,1 )[0])
			if( star_gold_last_widthRatio ){		//当分数带小数时
				//数组的splice方法会删除原数组中的指定元素，因此需要将指定元素存储起来
				let star_gold_last = stars.splice( Math.floor(score)+1,1 )[0].querySelector( 'div' );
				
				star_gold_last.style.width = star_gold_last_widthRatio *100 + '%';
				star_gold_last.style.backgroundSize = 'auto 100%';
			}
		}
	}
</script>

<style lang="less" scoped>
	/* 评价星级 */
	.star_wrapper{
		display:flex;
		.star{
			width:20%;
			height:100%;
			margin-right:5%;
			
			background:url('./images/star24_off@2x.png') no-repeat left center;
			background-size:100% 100%;
			div{
				height:100%;
				background:url('./images/star24_on@2x.png') no-repeat left center;
				background-size:100% 100%;
			}
		}
	}
</style>