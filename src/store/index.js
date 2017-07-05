import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

//引入json数据
import ele from '../../data'
//console.log(ele)

//引入活动时的小图标
let decrease = require( '@/assets/images/decrease_3@2x.png' ),
	discount = require( '@/assets/images/discount_3@2x.png' ),
	special = require( '@/assets/images/special_3@2x.png' ),
	invoice = require( '@/assets/images/invoice_3@2x.png' ),
	guarantee = require( '@/assets/images/guarantee_3@2x.png' );

//封装函数
function searsh(state,foodObj){
	let len = state.cart_food.length,
		i;
	//遍历购物车中的食物列表数组
	for( i = 0; i < len; i++ ){
		//当购买的食物已经在列表中时
		if( state.cart_food[i].name == foodObj.name ){
			//结束循环，此时的i值即为重复食物对象在数组中的的索引值
			break;
		}
	}
	return i;
}



export default new Vuex.Store({
	state : {
		//店铺信息
		seller : ele.seller,
		
		//商品信息
		goods : ele.goods,
		
		//店家评价
		ratings : ele.ratings,
		//筛选评论的条件
		filterCondition : 'all',
		//对评论是否有内容进行筛选,默认为false表示没有要求内容，true表示必须有内容
		hasContent : false,
		
		//具体商品的评价
		//筛选具体商品的评论的条件
		detailFilterCondition : 'all',
		//对具体商品的评论是否有内容进行筛选,默认为false表示没有要求内容，true表示必须有内容
		detailHasContent : false,
		
		
		//头部弹出层显示控制
		popup_show : false,
		
		//商品详情页显示控制
		detail_show : false,
		//商品详情页显示的商品
		detail_food : {},
		
		//加入到购物车中的食物
		cart_food : [],
		
		//购物车列表显示控制
		list_show : false,
		
		//活动的小图标
		support_img : [decrease,discount,special,invoice,guarantee]
	},
	mutations : {
		//显示控制
		show_control(state,str){		//传递的showObj参数为字符串
			state[str] = !state[str];
		},
		
		//选中具体食物对象
		selectDetail(state,DetailObj){
			state.detail_food = DetailObj;
		},
		
		//对于店家的评论
		//设置筛选评论的要求
		selectFilter(state,str){
			state.filterCondition = str;
		},
		
		//设置是否筛选有内容的评价
		filterContent(state,hasRatingContent){
			state.hasContent = hasRatingContent;
		},
		
		//对于店家的评论
		//设置筛选评论的要求
		selectFilter_detail(state,str){
			state.detailFilterCondition = str;
		},
		
		//设置是否筛选有内容的评价
		filterContent_detail(state,hasRatingContent){
			state.detailHasContent = hasRatingContent;
		},
		
		
		//添加到购物车要买的食物中
		addToCart(state,foodObj){
			//调用封装函数，获取食物索引值，已经存在时，索引小于数组长度，否则索引等于长度
			let n = searsh(state,foodObj),
				len = state.cart_food.length;
			
			//判断，有则加数量，无则添加对象
			if( n < len ){
				state.cart_food[n].count++;
				
			}else if( n == len ){
				state.cart_food.push( {
					name  : foodObj.name,
					price : foodObj.price,
					count : 1
				} );
			}
		},
		
		//从食物列表中减少数量，当数量等于0时，将其从数组中删除
		reduceFromCart(state,foodObj){
			//调用封装函数，获取食物索引值，已经存在时，索引小于数组长度，否则索引等于长度
			let i = searsh(state,foodObj);
				
				
			if( state.cart_food[i].count > 0 ){  //当数量大于0时，减数量
				state.cart_food[i].count--;
			}
			if( state.cart_food[i].count <= 0 ){	//当数量等于0时，删除该数据
				state.cart_food.splice( i,1 );
			}
		},
		
		//清空商品列表
		clear(state){
			state.cart_food = [];
		}
	},
	
	getters : {
		//对购买的商品总数量进行计算
		totalCount(state){
			let countNum = 0;
			for( var i = 0; i < state.cart_food.length; i++ ){
				countNum += state.cart_food[i].count;
			}
			 return countNum;
		},
		
		//对购买的商品总价进行计算
		totalPrice(state){
			let totalMoney = 0;
			for( var i = 0; i < state.cart_food.length; i++ ){
				totalMoney += state.cart_food[i].count*state.cart_food[i].price;
			}
			 return totalMoney;
		},
		
		//过滤后的店家评论信息
		filterRatings(state){
			let filterComments = [];
			//判断筛选条件的要求，返回相应的评论数组
			switch (state.filterCondition){
				case 'all':
					filterComments = state.ratings;
					break;
				case 'good':   //rateType为0时，是好评
					filterComments = state.ratings.filter( rating => {
						return !rating.rateType;
					} );
					break;
				case 'bad':		//rateType为1时，是差评
					filterComments = state.ratings.filter( rating => {
						return rating.rateType;
					} );
					break;
				default:
					break;
			}
			
			//对筛选出的相应种类的评论的内容进行进一步筛选
			if( state.hasContent ){  //当要求只显示有内容的评价时,再次筛选
				filterComments = filterComments.filter( item => {
					return item.text;
				} );
			}
			
			return filterComments;
		},
		
		//过滤后的店家评论信息
		filterRatings_detail(state){
			let filterComments = [];
			//判断筛选条件的要求，返回相应的评论数组
			switch (state.detailFilterCondition){
				case 'all':
					filterComments = state.detail_food.ratings;
					break;
				case 'good':   //rateType为0时，是好评
					filterComments = state.detail_food.ratings.filter( rating => {
						return !rating.rateType;
					} );
					break;
				case 'bad':		//rateType为1时，是差评
					filterComments = state.detail_food.ratings.filter( rating => {
						return rating.rateType;
					} );
					break;
				default:
					break;
			}
			
			//对筛选出的相应种类的评论的内容进行进一步筛选
			if( state.detailHasContent ){  //当要求只显示有内容的评价时,再次筛选
				filterComments = filterComments.filter( item => {
					return item.text;
				} );
			}
			
			return filterComments;
		}
	
	}
});
