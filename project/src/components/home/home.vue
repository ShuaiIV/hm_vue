<template>
	<div class="main">
		<!--首页轮播图-->
		<mt-swipe class="swipeBox" :auto='2000'>
			<!--2s自动切换-->
			<!--使用v-for循环生成图片列表-->
			<mt-swipe-item v-for='item in imgList' :key='item.url'>
				<a :src='item.url'>
					<img :src='item.img'>
				</a>
			</mt-swipe-item>
		</mt-swipe>
	
		<!--首页九宫格-->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/news/newslist">
					<span class="mui-icon mui-icon-home"></span>
					<div class="mui-media-body">新闻咨询</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/photo/photolist" >
					<span class="mui-icon mui-icon-email">
						<span class="mui-badge">5</span>
					</span>
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<span class="mui-icon mui-icon-chatbubble"></span>
					<div class="mui-media-body">商品购买</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<span class="mui-icon mui-icon-location"></span>
					<div class="mui-media-body">留言反馈</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<span class="mui-icon mui-icon-search"></span>
					<div class="mui-media-body">视频专区</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<span class="mui-icon mui-icon-phone"></span>
					<div class="mui-media-body">联系我们</div>
				</a>
			</li>
		</ul>
	</div>
</template>

// js脚本
<script>
// 导入公共的js文件
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
			const url = common.apihost + "api/getlunbo";
			// 使用vue-resource发送请求
			this.$http.get(url).then(function (response) {
				// 将获取到数据传递到I'mList中
				this.imgList = response.body.message;
			}, function (error) {

			})
		}
	}
}
</script>

// css样式
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


/*九宫格的样式*/

.mui-grid-view.mui-grid-9 {
	background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border-right: 0px;
	border-bottom: none;
}

.mui-icon {
	width: 50px;
	height: 50px;
}

.mui-icon.mui-icon-home {
	background-image: url('../../../public/images/menu3.png');
	background-repeat: round;
}

.mui-icon.mui-icon-email {
	background-image: url('../../../public/images/menu4.png');
	background-repeat: round;
}

.mui-icon.mui-icon-chatbubble {
	background-image: url('../../../public/images/menu5.png');
	background-repeat: round;
}

.mui-icon.mui-icon-location {
	background-image: url('../../../public/images/menu6.png');
	background-repeat: round;
}

.mui-icon.mui-icon-search {
	background-image: url('../../../public/images/menu9.png');
	background-repeat: round;
}

.mui-icon.mui-icon-phone {
	background-image: url('../../../public/images/menu10.png');
	background-repeat: round;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
	content: '';
}
</style>
