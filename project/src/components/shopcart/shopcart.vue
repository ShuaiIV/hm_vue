<template>
	<div class="main">
		<!--这是购物车页面-->
		<!--购物车列表部分-->
		<div class="goodsListDiv">
			<div v-for="(item, index) in goodsDetailArr" :key="item.id" class="everyGoodsItemStyle">
				<!--开关--> <!--值改变后，重新计算一次总价和总数量-->
				<mt-switch @change="getGoodsCountsAndAmount()" v-model="goodsAvailableArr[index]" ></mt-switch>
				<!--图像-->
				<img :src="item.thumb_path" />
				<!--价格信息-->
				<div class="priceAndNumberInfo">
					<h5>{{item.title}}</h5>
					<p>
						<span>￥ {{item.sell_price}}</span>&nbsp;&nbsp; 商品数量:{{goodsObj[goodsDetailArr[index].id]}}
					</p>
				</div>
				<!--删除按钮-->
				<mt-button @click="removeGoods(index)" type="danger" size="small">删除</mt-button>
			</div>
		</div>
	
		<!--总计、结算部分-->
		<div class="totalStyle">
			<h6>总计(不含运费)</h6>
			<p>已经勾选商品&nbsp;
				<span>{{goodsCounts.num}}</span>&nbsp;件 ,总价&nbsp;
				<span>{{goodsCounts.amount}}</span>&nbsp;元</p>
			<mt-button class="jiesuanStyle" size="small" type="danger">去结算</mt-button>
		</div>
	</div>
</template>

<script>
	// 导入共用的common.js文件
	import common from '../common/common.js';

	// 导入购物车工具函数
	import {getGoodsObject, getGoodsIdArray, removeGoodsById} from '../common/shopCartHelper.js';

	// 导入mint-ui的message-box组件
	import {MessageBox} from 'mint-ui';

	// 导入公共的Vue对象，用于组件间的通信
	import bus from '../common/commonVue.js';

	export default {
		data() {
			return {
				goodsDetailArr: [],
				goodsObj: {},
				goodsAvailableArr: [],
				goodsCounts: {
					num: 0,
					amount: 0
				}
			}
		},
		created() {
			this.getShopCartDetail();
		},
		methods: {
			// 获取购物车商品列表信息的方法
			getShopCartDetail() {
				// 从localstorage中获取购物车商品id的数组
				const goodsIdArr = getGoodsIdArray('goodsList');
				// console.log(goodsIdArr);

				// 想服务器发起Ajax请求，获得商品信息
				// 拼接请求地址URL
				const url = common.apihost + 'api/goods/getshopcarlist/' + goodsIdArr.join(',');
				// console.log(url);

				// 发起Ajax请求
				this.$http.get(url).then(response => {
					// console.log(response);
					this.goodsDetailArr = response.body.message;

					// 根据商品列表生成相应的各个商品的开关数组
					goodsIdArr.forEach((itme, key) => this.goodsAvailableArr[key] = true)

					// 计算商品数量和总金额
					this.getGoodsCountsAndAmount();
				}, error => {})
			},
			// 计算购物车商品总数量和总金额的方法
			getGoodsCountsAndAmount() {
				// 每次计算前，先清空一次原来的数据
				this.goodsCounts.num = 0;
				this.goodsCounts.amount = 0;

				// 先从localstorage中获取商品的id和数量信息
				this.goodsObj = getGoodsObject('goodsList');

				// 遍历商品开关数组，开关值为FALSE的不计算总量和总金额
				this.goodsAvailableArr.forEach((item, index) => {
					if (item) {
						// 计算总数量
						this.goodsCounts.num += this.goodsObj[this.goodsDetailArr[index].id];
						// 计算总金额
						this.goodsCounts.amount += this.goodsDetailArr[index].sell_price * this.goodsObj[this.goodsDetailArr[index].id];
					}
				})
			},
			// 删除购物车商品的方法
			removeGoods(index) {
				// 提示用户，是否确认删除
				MessageBox.confirm('确认删除该商品吗？').then(action => {
					// 获取该商品的id
					const id = this.goodsDetailArr[index].id;

					// 从localstorage中删除该ID对应的商品
					removeGoodsById('goodsList', id);

					// 重新渲染购物车微标
					bus.$emit('updateShopCartBadge');

					// 在购物车商品列表和开关列表中删除该商品
					this.goodsDetailArr.splice(index, 1);
					this.goodsAvailableArr.splice(index, 1);

					// 重新计算总价格和总数量
					this.getGoodsCountsAndAmount();
				})
			}
		}
	}
</script>

<style scoped>
/**
 * 购物车商品列表部分样式
 */

.goodsListDiv {
	padding: 5px;
}

.everyGoodsItemStyle {
	display: flex;
	height: 100px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.3);
	align-items: center;
}

.everyGoodsItemStyle img {
	height: 75px;
	width: 75px;
	padding: 5px;
	border: 1px solid rgba(92, 92, 92, 0.3);
	border-radius: 5px;
	margin-left: 8px;
}

.priceAndNumberInfo {
	margin-left: 8px;
	flex: 1;
}

h5 {
	color: #0094ff;
}

.priceAndNumberInfo p {
	margin-top: 10px;
}

.priceAndNumberInfo span {
	color: red;
	font-size: 14px;
}


/**
 * 合计、结算部分样式
 */

.totalStyle {
	position: relative;
	margin-top: 10px;
	height: 100px;
	padding-top: 20px;
	padding-left: 15px;
	background-color: rgba(92, 92, 92, 0.3)
}

h6 {
	color: black;
	font-weight: bold;
	font-size: 16px;
}

.totalStyle p {
	margin-top: 10px;
}

.totalStyle span {
	font-size: 16px;
	color: red;
}

.jiesuanStyle {
	position: absolute;
	top: 35px;
	right: 15px;
}
</style>
