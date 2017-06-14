<template>
	<div class="main">
		<!--这是新闻列表页-->
		<!--使用mui的图文列表渲染新闻列表-->
		<ul class="mui-table-view">
			<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
				<router-link :to="'/news/newsdetail/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<p class="newsTitle">
							{{item.title}}
						</p>
	
						<p class="mui-ellipsis">
							<span class="left">
								{{item.add_time  | dmtDate('YYYY-MM-DD')}}
							</span>
	
							<span class="right">
								点击数:{{item.click}}次
							</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
	</div>
</template>

<script>
// 引入共用js文件
import common from '../common/common.js';

export default {
	data() {
		return {
			newsList: []
		}
	},
	created() {
		this.getNewsList();
	},
	methods: {
		getNewsList() {
			const url = common.apihost + 'api/getnewslist';
			this.$http.get(url).then(response => {
				console.log(response);
				this.newsList = response.body.message;
			}, function (error) {

			})
		}
	}
}
</script>

<style scoped>
.mui-table-view-cell {
	min-height: 80px;
}

.mui-pull-left {
	min-width: 64px;
	height: 64px;
}

.newsTitle {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.mui-ellipsis {
	margin-top: 20px;
	color: #0094ff;
	font-size: 12px;
}

.right {
	float: right;
}
</style>
