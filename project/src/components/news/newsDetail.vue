
<template>
	<!--新闻详情页-->
	<div class="main">
		<!--新闻详情的标题-->
		<div class="title">
			<h3>{{newsDetail.title}}</h3>
			<p>{{newsDetail.add_time | dmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;&nbsp;{{newsDetail.click}}次浏览&nbsp;&nbsp;&nbsp; 分类:民生经济
			</p>
		</div>
		<!--新闻详情的内容-->
		<div class="content">
			<p v-html="newsDetail.content"></p>
		</div>
		<!--此条新闻的评论-->
		<subcomments :commentId="this.$route.params.newsId"></subcomments>
	</div>

</template>

<script>
// 引入共用的common js文件
import common from '../common/common.js';

// 导入子组件
import subcomments from '../subComponents/subComments.vue';

export default {
	data() {
		return {
			newsDetail: {}
		}
	},
	created() {
		this.getNewsDetail();
	},
	methods: {
		getNewsDetail() {
			const url = common.apihost + "api/getnew/" + this.$route.params.newsId;
			this.$http.get(url).then(response => {
				// console.log(response);
				this.newsDetail = response.body.message[0];
			}, error => {

			})
		}
	},
	// 注册子组件
	components: {
		subcomments
	}
}
</script>

<style scoped>
h3 {
	color: #0094ff;
	font-size: 16px;
}

.title {
	padding: 10px 3px;
	border-bottom: 1px solid rgba(92, 92, 92, 0.3);
	padding-bottom: 5px;
}

.content {
	padding: 10px;
}
</style>
