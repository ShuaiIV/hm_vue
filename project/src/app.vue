// vue项目的入口文件

// html模板
<template>
	<div>
		<!--固定的顶部栏-->
		<mt-header fixed title="Vue项目"></mt-header>

		<!--中间的路由展示区域-->
		<router-view></router-view>

		<!--底部的tab-bar-->
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/message" class="mui-tab-item">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link to="/shopcart" class="mui-tab-item">
				<span class="mui-icon mui-icon-spinner"></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/settings" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
	</div>
</template>

// 样式部分
<style>

</style>
