// webpack打包的入口文件

// 导入vue
import Vue from 'vue';

// 导入vue项目的入口文件
import App from './app.vue';

// 导入vue-resource
import VueResource from 'vue-resource';

// 使用vue-resource
Vue.use(VueResource);

// 导入路由
import VueRouter from 'vue-router';

// 使用vue-router路由
Vue.use(VueRouter);

// 导入mint-ui并使用
import MintUI from 'mint-ui';
Vue.use(MintUI)

// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';

// 导入mui
import '../public/mui/css/mui.min.css'
import '../public/mui/css/icons-extra.css'

// 导入自己的css
import '../public/css/site.css'

// 导入moment，格式化日期时间
import moment from 'moment'

// 设置全局过滤器
Vue.filter('dmtDate', (input, formString) => {
	// 设置默认日期时间格式
	const lastFormString = formString || "YYYY-MM-DD HH:mm:ss";
	// 返回处理后的日期时间
	return moment(input).format(lastFormString);
})

// 设置路由
// 先导入组件
import home from './components/home/home.vue';
import message from './components/message/message.vue';
import settings from './components/settings/settiongs.vue';
import shopcart from './components/shopcart/shopcart.vue';
import newsList from './components/news/newsList.vue';
import newsDetail from './components/news/newsDetail.vue';

// 创建并设置路由
const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: home },
		{ path: '/message', component: message },
		{ path: '/settings', component: settings },
		{ path: '/shopcart', component: shopcart },
		{ path: '/news/newslist', component: newsList },
		{ path: '/news/newsdetail/:newsId', component: newsDetail }
	],
	linkActiveClass: 'mui-active'
});

// 创建vue实例
new Vue({
	el: '#app',
	router,
	render: createElement => {
		//这里的写法有很多，如果是直接导入单文件组件，可以像下面这样写
		return createElement(App);
	}
})