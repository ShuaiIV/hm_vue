// 图片详情页
<template>
	<div class="main">
		<!--图片标题部分-->
		<div class="title">
			<h3>{{photoDetail.title}}</h3>
			<p>
				{{photoDetail.add_time | dmtDate("YYYY-MM-DD")}}&nbsp;&nbsp;&nbsp; {{photoDetail.click}}次浏览
			</p>
		</div>
	
		<!--缩略图部分-->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li v-for="(item, index) in thumbPhoto" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<img @click="$preview.open(index, thumbPhoto)" class="preview-img" height="100" width="100" :src="item.src">
			</li>
		</ul>
	
		<!--内容部分-->
		<div class="content">
			<div v-html="photoDetail.content"></div>
		</div>

		<!--评论子组件-->
		<subcomments :commentId="this.$route.params.photoId"></subcomments>
	</div>
</template>

<script>
// 导入共用的common.js文件
import common from '../common/common.js';

// 导入评论功能子组件
import subcomments from '../subComponents/subComments.vue';

export default {
	data() {
		return {
			photoDetail: {},
			thumbPhoto: []
		}
	},
	created() {
		this.getPhotoDetail();
		this.getThumbPhoto();
	},
	methods: {
		// 获取图片详情的方法
		getPhotoDetail() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/getimageInfo/' + this.$route.params.photoId;
			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				this.photoDetail = response.body.message[0];
			}, error => { })
		},

		// 获取图片缩略图的方法
		getThumbPhoto() {
			// 拼接请求地址URL
			const url = common.apihost + 'api/getthumimages/' + this.$route.params.photoId;

			// 发送Ajax请求
			this.$http.get(url).then(response => {
				// console.log(response);
				// 设置图片的宽高
				response.body.message.forEach(item => {
					item.w = 600;
					item.h = 400;
				})
				this.thumbPhoto = response.body.message;
			}, error => {})
		}
	},
	// 注册子组件
	components: {
		subcomments
	}
}
</script>

<style scoped>
.title {
	padding: 5px;
}

h3 {
	font-size: 18px;
	color: #0094ff;
}

.title p {
	font-size: 12px;
	color: gray;
}

.content {
	padding: 5px;
	color: gray;
	font-size: 14px;
}
</style>
