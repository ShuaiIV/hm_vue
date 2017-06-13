<template>
	<div class="main">
		这是新闻列表页
	</div>
</template>

<script>
	// 引入共用js文件
	import common from '../common/common.js';

export default {
	created() {
		this.getNewsList();
	},
	methods: {
		getNewsList() {
			const url = common.apihost + 'api/getnewslist';
			this.$http.get(url).then(function (response) {
				console.log(response);
			}, function (error) {

			})
		}
	}
}
</script>

<style>

</style>
