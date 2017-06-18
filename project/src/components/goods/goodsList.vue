<template>
	<div class='main'>
		<!--这是商品列表页-->
		<div class="mui-content" style="background-color:#fff">
			<ul class="mui-table-view mui-grid-view">
				<li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
					<router-link :to="'/goods/goodsdetail/' + item.id">
						<div class="goodsContent">
							<img class="mui-media-object" :src='item.img_url'>
							<div class="mui-media-body">
								<!-- 标题 -->
								<p>{{item.title}}</p>
								<!-- 价格 -->
								<div class="price">
									<span>{{item.sell_price}}</span>
									<s>{{item.market_price}}</s>
								</div>
								<!-- 提示信息 -->
								<div class="tips">
									<p>热卖中</p>
									<span>剩余{{item.stock_quantity}}件</span>
								</div>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js'

export default {
	data() {
		return {
			goodsList: []
		}
	},
	created() {
		this.getGoodsList();
	},
	methods: {
		// 获取商品列表数据的方法
		getGoodsList() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/getgoods';

			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.goodsList = response.body.message;
			}, error => { })
		}
	}
}
</script>

<style scoped>
.goodsContent {
	padding: 10px;
	border: 1px solid rgba(92, 92, 92, 0.2);
	border-radius: 5px;
	box-shadow: 0px 0px 5px #666;
}

ul {
	padding-right: 0px;
}

.mui-table-view-cell>a:not(.mui-btn) {
	white-space: inherit;
}


.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
	height: 100px;
}

.mui-media-body p {
	color: #000;
	text-align: left;
	font-size: 12px;
	/*以下4句是实现文字显示两行，超出的在第二行用...替代关键代码*/
	/* http://www.css88.com/webkit/-webkit-line-clamp/ */
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.price {
	padding: 10px 0 10px 0px;
	text-align: left;
	margin-top: 5px;
	background: #f0f0f0;
}

.price span {
	font-size: 16px;
	color: red;
}

.price s {
	font-size: 12px;
	color: #5c5c5c;
	margin-left: 10px;
}

.tips {
	background: #f0f0f0;
	font-size: 12px;
	height: 50px;
	display: flex;
}

.tips p {
	flex: 0 0 45px;
	text-align: left
}

.tips span {
	flex: 1;
	text-align: right;
}
</style>
