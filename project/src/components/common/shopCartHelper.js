/**
 * 这是一个工具类，暴露出一些方法，供我们组件调用
 * 在这个工具类中，主要是操作localStorage,来对我们的商品数据进行
 * 增删改查
 */

// 将商品数量和id添加到localStorage的方法
export function addGoods(goodsObj, key) {
	// 先从localstorage中取出原来的数据
	const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');

	// 将要添加的数据添加到数组中
	goodsArray.push(goodsObj);

	// 将新的数据存放到localstorage中
	localStorage.setItem(key, JSON.stringify(goodsArray));
};

// 从localstorage中获取所有商品总数量的方法
export function getAllGoodsCounts(key) {
	// 定义一个变量，接收结果
	var counts = 0;
	// 先从localstorage中取出所有的商品数量信息
	const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');
	// 遍历数组，将数量累加
	for (let i = goodsArray.length; i--;) {
		counts += goodsArray[i].goodsNum;
	};

	// 然后结果
	return counts;
};

// 从localstorage中的商品数组获取商品id的数组
export function getGoodsIdArray(key) {
	// 先定义一个空数组，用于结束结果
	const arr = [];

	// 获取并遍历localstorage中的商品数组
	const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');
	goodsArray.forEach(item => {
		if (arr.indexOf(item.goodsId) == -1) {
			arr.push(item.goodsId);
		}
	});

	// 返回结果
	return arr;
};

// 从localstorage中的商品数组获取商品id与数量的对象
export function getGoodsObject(key) {
	// 先定义一个空数组，用于结束结果
	const obj = {};

	// 获取并遍历localstorage中的商品数组
	const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');
	goodsArray.forEach(item => {
		obj[item.goodsId] = obj[item.goodsId] ? obj[item.goodsId] + item.goodsNum : item.goodsNum;
	});

	// 返回结果
	return obj;
};

// 从localstorage中删除指定id的商品
export function removeGoodsById(key, id) {
	// 获取并遍历localstorage中的商品数组
	const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');
	for (let i = goodsArray.length; i--;) {
		if (goodsArray[i].goodsId == id) {
			goodsArray.splice(i, 1);
		}
	};

	// 重新赋值localstorage
	localStorage.setItem('goodsList', JSON.stringify(goodsArray));
}