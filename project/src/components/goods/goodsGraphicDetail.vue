<template>
	<!--这是商品图文详情页-->
	<div class="main">
		<!--标题-->
		<div class="title">
			<h4>{{goodsGraphicDetail.title}}</h4>
		</div>
		<!--内容-->
		<div class="content">
			<span v-html="goodsGraphicDetail.content" ></span>
		</div>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js'

export default {
	data() {
		return {
			goodsGraphicDetail: {}
		}
	},
	created() {
		this.getGoodsGraphicDetail();
	},
	methods: {
		// 获取商品图文详情的方法
		getGoodsGraphicDetail() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/goods/getdesc/' + this.$route.params.goodsId;

			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.goodsGraphicDetail = response.body.message[0];
			}, error => {})
		}
	}
}
</script>

<style scoped>
    .title h4{
        color:#0094ff;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .title,.content{
        padding: 10px;
    }
</style>
