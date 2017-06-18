<template>
	<!--商品加减数量的子组件-->
	<div>
		<div class="subnumberStyle">
			<div @click="substrict" class="left">-</div>
			<div class="center">{{count}}</div>
			<div @click="add" class="right">+</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 默认商品数量为1
			count: 1
		}
	},
	methods: {
		// 商品数量加1的方法
		add() {
			// 判断数量是否超过库存

			// 商品数量加1
			this.count += 1;

			// 发送消息
			this.notify();
		},
		// 商品数量减1的方法
		substrict() {
			// 判断商品数量是否为1
			if (this.count <= 1) {
				return false;
			} 

			// 商品数量减1
			this.count -= 1;

			// 发送消息
			this.notify();
		},
		// 向接受方发送消息
		notify() {
			//发送发，如果发送方是子组件，可以使用this调用
			//参数1：事件名称，但是不要和系统的事件冲突，比如不要使用click
			//参数2：要传递的具体值
			this.$emit('numberChange', this.count)
		}
	}
}
</script>

<style scoped>
.subnumberStyle {
	margin-bottom: 5px;
}

.left,
.center,
.right {
	display: inline-block;
	border: 1px solid rgba(92, 92, 92, 0.3);
	line-height: 25px;
	text-align: center;
}

.left,
.right {
	width: 30px;
}

.center {
	width: 40px;
}
</style>
