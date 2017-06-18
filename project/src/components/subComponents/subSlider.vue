<template>
	<!--轮播图子组件-->
	<div>
		<mt-swipe class="swipeBox" :auto='2000'>
			<!--2s自动切换-->
			<!--使用v-for循环生成图片列表-->
			<mt-swipe-item v-for='item in imgList' :key='item.url'>
				<a :src='item.url'>
					<img :src='item.img'>
				</a>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js';

export default {
	data: () => {
		return {
			imgList: []
		}
	},
	//created是我们home.vue这个组件的生命周期函数之一
	//他在我们home组件创建出来之后，还没有显示在页面之前就会被自动调用
	created() {
		this.getImgUrl()
	},
	methods: {
		getImgUrl() {
			const url = common.apihost + this.imgUrl;
			// 使用vue-resource发送请求
			this.$http.get(url).then(function (response) {
				// 将获取到数据传递到I'mList中
				this.imgList = response.body.message;
			}, function (error) {

			})
		}
	},
	// 接受父组件传递来参数
	props: ['imgUrl']
}
</script>

<style scoped>
/*轮播图的样式*/

.swipeBox {
	height: 250px;
	width: 100%;
}

img {
	height: 250px;
	width: 100%;
}
</style>
