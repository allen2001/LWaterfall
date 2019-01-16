# LWaterfall
简单的原生js瀑布流插件

### 使用方式

HTML和CSS代码如下:
```html
<style type="text/css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 1000px;
  margin: 30px auto 50px;
}
.item {
  width: 200px;
  padding: 5px;
}
.item img {
  display: block;
  border: none;
  width: 100%;
}
</style>
<div class="container">
  <div class="item"><img src="img/1.jpg" alt=""></div>
  <div class="item"><img src="img/2.jpg" alt=""></div>
  <div class="item"><img src="img/3.jpg" alt=""></div>
  <div class="item"><img src="img/4.jpg" alt=""></div>
  <div class="item"><img src="img/5.jpg" alt=""></div>
  <div class="item"><img src="img/6.jpg" alt=""></div>
  ......
</div>
```

js代码如下:
```js
<script type="text/javascript" src="js/LWaterfall.js"></script>
<script type="text/javascript">
  var waterfall = new LWaterfall(document.querySelector('.container'));
</script>
```
