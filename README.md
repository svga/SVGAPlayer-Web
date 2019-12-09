# 扩展【按需扩展】

[官方文档](README.official.md)

### 动态文本

你可以在指定元素上添加文本，询问你的动画设计师以获取 ImageKey。

* setText 操作必须在 startAnimation 之前执行。

```
player.setText('Hello, World!', 'ImageKey');
```
option:
* text
* size //默认 14px
* family  //默认 Helvetica,Sans-Serif
* color
* offset [object]
    * x
    * y
* align //默认 center； left|center|right
* font  //优先于 size 或者 family
* stroke [object] //描边
    * width
    * color
    * style //inside|out
* textShadow [object] //文字阴影
    * color //支持 #fffff ，linear-gradient
    * offsetX
    * offsetY
    * blur

```

player.setText({ 
    text: 'Hello, World!, 
    size: "24px", 
    color: "#ffe0a4",
    offset: {x: 0.0, y: 0.0}
}, 'ImageKey'); // 可自定义文本样式
```
可以通过 font字段根据canvas.font 的规则去添加配置，也可以单独通过size 或者 family 去配置字体样式
## Classes

#### Methods(个人需求添加)
* startAnimationWithRangeList(rangeList:[range:{location:number,length:number,reverse:boolean=false}]) -播放[location.location+length]指定区间帧动画，对区间动画进行拼接，全部执行完才调用 onfinish。


