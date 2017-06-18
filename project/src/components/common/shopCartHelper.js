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
}