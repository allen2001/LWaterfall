/* 瀑布流插件 */
;(function(undefined) {
	"use strict";
	var _global;

	/* 插件代码 */
	// 构造函数
	function LWaterfall(elem) {
		this.dom = elem;
		this.itemList = elem.children;
		this.itemWidth = this.itemList[0].offsetWidth;	// 单个元素的宽度
		this.columnNums = Math.floor(elem.offsetWidth / this.itemWidth);	// 图片展示的列数
		this.columnHeights = [];	// 记录容器每一列的高度
		this.minIndex = 0;	// 当前高度最小列的序号
		this.minColumnHeight = 0;	// 当前高度最小列的高度
		this.hasLoadedIndex = 0;	// 已加载的图片数

		// 初始化
		this._init();
	}
	// 初始化
	LWaterfall.prototype._init = function() {
		var _this = this;
		this.dom.style.position = 'relative';

		// 给每一张图片设置位置
		var oImg = '';
		for (var i = 0; i < this.itemList.length; i++) {
			this.itemList[i].style.position = 'absolute';
			oImg = this.itemList[i].getElementsByTagName('img')[0];
			// 判断图片是否加载完成
			if (!oImg.complete) {
				oImg.curIndex = i;
				// 处理未加载完成的图片
				oImg.onload = function() {
					_this._setPos(this.curIndex);
					// 所有图片加载完成后给父容器设置高度
					if (_this.hasLoadedIndex == _this.itemList.length) {
						_this.dom.style.height = calcContainerHeight(_this.columnHeights) + 'px';
					}
				}
				continue;
			}

			this._setPos(i);
		}

		// 给父容器设置高度
		this.dom.style.height = calcContainerHeight(this.columnHeights) + 'px';
	}
	// 设置图片位置
	LWaterfall.prototype._setPos = function(index) {
		// 给第一行图片设置位置
		if (this.hasLoadedIndex < this.columnNums) {
			this.itemList[index].style.top = 0;
			this.itemList[index].style.left = (this.itemWidth * this.hasLoadedIndex) + 'px';
			this.columnHeights[this.hasLoadedIndex] = this.itemList[index].offsetHeight;
			this.hasLoadedIndex++;
			return;
		}
		// 找出高度最小的那一列
		this.minIndex = calcColumnMinHeight(this.columnHeights);
		this.minColumnHeight = this.columnHeights[this.minIndex];
		this.itemList[index].style.top = this.minColumnHeight + 'px';
		this.itemList[index].style.left = (this.itemWidth * this.minIndex) + 'px';
		this.columnHeights[this.minIndex] += this.itemList[index].offsetHeight;	// 累加列的高度
		this.hasLoadedIndex++;
	}

	/* 工具函数 */
	// 找出当前高度最小的那一列的序号
	function calcColumnMinHeight(arr) {
		var index = 0;
		var minVal = arr[0];
		for (var i = 1; i < arr.length; i++) {
			if (arr[i] < minVal) {
				minVal = arr[i];
				index = i;
			}
		}
		return index;
	}
	// 找出当前高度最大的那一列
	function calcContainerHeight(arr) {
		var height = +arr[0];
		for (var i = 1; i < arr.length; i++) {
			if (+arr[i] > height) {
				height = +arr[i];
			}
		}
		return height;
	}

	// 获取全局对象
	_global = (function() { return this || (0, eval)('this'); })();
	// 将插件对象暴露给全局对象
	if (typeof module !== "undefined" && module.exports) {
		module.exports = LWaterfall;
	} else if (typeof define === "function" && define.amd) {
		define(function() { return LWaterfall; });
	} else {
		!('LWaterfall' in _global) && (_global.LWaterfall = LWaterfall);
	}

})();