<!--图片列表页-->
<template>
	<div class="main">
		<!--顶部的图片分类-->
		<div class="categoryStyle">
			<ul ref="categoryUl">
				<li @click="getPhotoList(0)">全 部</li>
				<li @click="getPhotoList(item.id)" v-for="item in photoCategoryList" :key="item.id">
					{{item.title}}
				</li>
			</ul>
		</div>
	
		<!--图片列表展示区域-->
		<div class="photoList">
			<ul>
				<li v-for="item in photoList" :key="item.id">
					<router-link :to="'/photo/photodetail/' + item.id">
						<img :src="item.img_url">
						<p class="title">
							<span>{{item.title}}</span>
							<br/> {{item.zhaiyao}}
						</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
// 引入共用的common js文件
import common from '../common/common.js';

export default {
	data() {
		return {
			photoCategoryList: [],
			photoList: []
		}
	},
	created() {
		this.getPhotoCategoryList();
	},
	methods: {
		// 获取图片分类列表
		getPhotoCategoryList() {
			const url = common.apihost + 'api/getimgcategory';

			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.photoCategoryList = response.body.message;
				// 根据返回的数组长度计算图片分类列表的样式宽度
				this.$refs.categoryUl.style.width = (response.body.message.length + 1) * 80 + 'px';
				// 默认加载全部的图片
				this.getPhotoList(0);
			}, error => { })
		},
		// 根据图片分类ID获取相应的图片列表
		getPhotoList(id) {
			// 拼接请求地址
			const url = common.apihost + 'api/getimages/' + id;
			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.photoList = response.body.message;
			}, error => { })
		}
	}
}
</script>

<style scoped>
/*顶部图片分类列表的样式*/

.categoryStyle {
	overflow-x: auto;
	margin-bottom: 10px;
}

.categoryStyle ul {
	padding-left: 0px;
	width: 1200px;
	margin: 3px;
	margin-bottom: 10px;
}

.categoryStyle li {
	list-style: none;
	display: inline;
	color: #0094ff;
	margin: 0px 5px;
}



/*图片列表的样式*/

.photoList ul {
	padding: 0px;
	margin: 0px;
}

.photoList li {
	list-style: none;
	padding: 3px;
	position: relative;
}

.photoList img {
	width: 100%;
	height: 400px;
}

.title {
	left: 5px;
	bottom: 0px;
	width: 98%;
	position: absolute;
	background-color: rgba(0, 0, 0, 0.4);
	color: white;
}

.title span {
	font-size: 16px;
	font-weight: bold;
}
</style>
