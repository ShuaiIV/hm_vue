<template>
	<!--商品评论页面-->
	<div class="main">
		<subcomments :commentId="this.$route.query.goodsId"></subcomments>
	</div>
</template>

<script>
// 导入评论子组件
import subcomments from '../subComponents/subComments.vue';
export default {
	// 注册子组件
	components: {
		subcomments
	}
}
</script>

<style>

</style>
