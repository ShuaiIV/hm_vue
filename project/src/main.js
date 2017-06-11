// webpack打包的入口文件

// 导入vue
import Vue from 'vue';

// 导入vue项目的入口文件
import App from './app.vue';

// 创建vue实例
new Vue({
	el: '#app',
	render: createElement => {
		//这里的写法有很多，如果是直接导入单文件组件，可以像下面这样写
		return createElement(App);
	}
})