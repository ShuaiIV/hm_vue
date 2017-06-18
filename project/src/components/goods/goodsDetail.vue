<template>
	<!--这是商品详情页-->
	<div class="main">
		<!--轮播图部分-->
		<div class="sliderStyle">
			<subslider :imgUrl="'api/getthumimages/' + this.$route.params.goodsId"></subslider>
		</div>
	
		<!--价格信息-->
		<div class="priceStyle">
			<h4>{{goodsDetail.title}}</h4>
			<p class="price">市场价:￥
				<del>{{goodsDetail.market_price}}</del>&nbsp;&nbsp; 销售价:￥
				<span>{{goodsDetail.sell_price}}</span>
			</p>
			<subnumber @numberChange="receiveGoodsNum"></subnumber>
			<mt-button type="primary" size="small">立即购买</mt-button>
			<mt-button @click="addToShopCart()" type="danger" size="small">加入购物车</mt-button>
		</div>
	
		<!--商品信息-->
		<div class="paramsStyle">
			<h5>商品参数</h5>
			<ul>
				<li>商品货号:{{goodsDetail.goods_no}}</li>
				<li>库存情况:剩余{{goodsDetail.stock_quantity}}件</li>
				<li>上架时间:{{goodsDetail.add_time | dmtDate}}</li>
			</ul>
		</div>
	
		<!--图文介绍和商品评论-->
		<div class="pictureInfoAndCommentStyle">
			<mt-button @click="goGoodsGraphicDetail" type="primary" plain size="large">图文介绍</mt-button>
			<mt-button @click="goGoodsComments" class="commentStyle" type="danger" plain size="large">商品评论</mt-button>
		</div>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js';
// 导入需要的工具方法
import {addGoods} from '../common/shopCartHelper.js';

// 导入公共的Vue对象，用于组件间的通信
import bus from '../common/commonVue.js';

// 导入轮播图子组件
import subslider from '../subComponents/subSlider.vue';

// 导入商品数量改变子组件
import subnumber from '../subComponents/subNumber.vue';

export default {
	data() {
		return {
			goodsDetail: {},
			goodsNum: 1
		}
	},
	created() {
		this.getGoodsDetail();
	},
	methods: {
		// 获取商品信息
		getGoodsDetail() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/goods/getinfo/' + this.$route.params.goodsId;

			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.goodsDetail = response.body.message[0];
			}, error => { })
		},
		// 跳转到商品图文详情页
		goGoodsGraphicDetail() {
			this.$router.push({name: 'goodsGraphicDetail', params: {goodsId: this.$route.params.goodsId}});
		},
		// 跳转到商品评论页面
		goGoodsComments() {
			this.$router.push({path: '/goods/goodscomments', query: {goodsId: this.$route.params.goodsId}})
		},
		// 接受商品数量
		receiveGoodsNum(count) {
			this.goodsNum = count;
		},
		// 将商品添加到购物车
		addToShopCart() {
			// 获取商品的数量和id
			const goodsNum = this.goodsNum;
			const goodsId = this.$route.params.goodsId;

			// 将上面的信息封装成对象
			const goodsObj = {
				"goodsNum": goodsNum,
				"goodsId": goodsId
			};

			// 使用导入的工具方法添加商品信息到localstorage中
			addGoods(goodsObj, 'goodsList');

			// 传值给App.vue，让它去更新徽标值
			bus.$emit('updateShopCartBadge', this.goodsNum);	

		}
	},
	components: {
		subslider,
		subnumber
	}
}
</script>

<style scoped>
.sliderStyle,
.priceStyle,
.paramsStyle,
.pictureInfoAndCommentStyle {
	margin: 10px;
	padding: 10px;
	border: 1px solid rgba(92, 92, 92, 0.3);
	border-radius: 5px;
}

.priceStyle h4 {
	font-size: 16px;
	color: #0094ff;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.price span {
	color: red;
	font-size: 16px;
}

.paramsStyle h5 {
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.3);
}

.paramsStyle ul {
	padding: 0
}

.paramsStyle li {
	list-style: none;
}

.commentStyle {
	margin-top: 20px;
}
</style>
