// vue项目的入口文件

// html模板
<template>
	<div>
		<!--固定的顶部栏-->
		<mt-header fixed title="Vue项目"></mt-header>
	
		<!--中间的路由展示区域-->
		<router-view></router-view>
	
		<!--底部的tab-bar-->
		<div></div>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/message" class="mui-tab-item">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link to="/shopcart" class="mui-tab-item">
				<span class="mui-icon mui-icon-spinner">
					<span id="shopcart-badge" ref="abc" class="mui-badge">{{count}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<!--<div ref="haha"></div>-->
			<router-link to="/settings" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
	</div>
</template>

// js脚本部分
<script>
// 导入公共的Vue对象，用于组件中通信
import bus from './components/common/commonVue.js';

// 导入jQuery组件
import $ from 'jquery';

// 导入需要的工具函数
import { getAllGoodsCounts } from './components/common/shopCartHelper.js';

// 监听updateShopCartBadge事件
bus.$on('updateShopCartBadge', (count) => {
	// 使用jQuery组件更改购物车微标的值
	$("#shopcart-badge").text(getAllGoodsCounts('goodsList'));
})

export default {
	data() {
		return {
			count: 0
		}
	},
	created() {
		// this.updateShopCartBadge();

		// 使用jQuery组件更改购物车微标的值
		this.count = getAllGoodsCounts('goodsList');
	},
	methods: {
		// 更新购物车微标(refs有bug！！！！)
		// updateShopCartBadge() {
		// 获取微标
		// const badge = this.$refs.shopCartBadge;
		// console.log(this.$refs, this.$refs.haha);
		// 处理购物车微标更新
		// 从localstorage中获取所以商品总数量
		// badge.innerText = getAllGoodsCounts('goodsList');

		// }
	}
}
</script>

// 样式部分
<style>

</style>
