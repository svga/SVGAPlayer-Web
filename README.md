# SVGA-Web-Canvas

## 说明

[SVGA](http://code.yy.com/ued/SVGA-Format) 格式 Web Canvas 实现方式

## 实现

* 轻量化，重构依赖模块，不足 100K
* 性能优化，运算开销较大的 SVGA 源文件下载转码过程 迁移到 web worker，尽量避免影响主线程，造成页面卡顿
* UMD 规范，全局引用，或使用模块加载

## DEMO

[前往测试地址](http://uedfe.yypm.com/assets/lab/lijialiang/svga/)

## 使用

* 下载 dist/svga.min.js & dist/svga-worker.min.js
* HTML 直接外链使用 或 JS 模块 require 使用

```js
let svga = new Svga({
	worker   : `${ window.location.origin }/assets/svga-worker.min.js`,
	canvas   : '#canvas',
	assets   : `${ window.location.origin }/assets/rose.svga`,
	playCount: 2,
	autoPlay : false,
	loop     : true,
}, (event) => {
	console.log('svga is ready');
	svga.play();
})

svga.complete(() => {
	console.log('svga complete');
})

svga.play();

svga.pause();

svga.stop();

```

## 参数

| 名称 | 类型 | 说明 |
|-----|------|-----|
| worker | String | 同域 worker 文件地址 |
| canvas | String | 选择器字符串 |
| assets | String | 同域 SVGA源文件地址 |
| playCount | Number | 动画播放次数 |
| autoPlay | Boolean | 加载完成后是否自动播放 |
| loop | Boolean | 是否循环播放 |

## 方法

```js
new Svga(...) ➜ 构造方法，返回实例对象

Svga.complete(() => { }) ➜ 动画完成后回调

Svga.play() ➜ 播放动画

Svga.pause() ➜ 暂停动画

Svga.stop() ➜ 停止动画

```

## 调试构建工具

使用 [LegoFlow](http://uedfe.yypm.com/md/book/LegoFlow/) 进行调试、构建
