# 基于 Vue 页面导出 PDF 与 html2canvas 跨域问题

## 首先引入两个模块

```sh
//将页面html转换成图片
yarn add html2canvas -s
//将图片生成pdf
yarn add jspdf -s
```

## template 代码

```html
<div id="pdf">
  内容
  <img :src="imgUrl" alt="" />
</div>
<el-button
  type="primary"
  icon="el-icon-download"
  @click="ExportPdf"
  :loading="ExportPdfloading"
  >导出PDF</el-button
>
```

## 原理

::: tip 原理

1. 通过 html2Canvas 将 html 中指定区域转化为 canvas <br>
2. 使用 canvas.toDataURL("image/jpeg", 1.0);将 canvas 转为 base64 <br>
3. 再通过 jspdf 导出 pdf

:::

## js 代码

```js
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  name: "pdf",
  data() {
    return {
      ExportPdfloading: false,
      imgUrl: ""
    };
  },
  methods: {
    ExportPdf() {
      html2Canvas(document.querySelector("#pdf"), {
        allowTaint: true,
        dpi: 400 //据说是清晰度，改了也看不出啥变化
      }).then(function(canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        // A4纸宽度 592.28
        let pageHeight = (contentWidth / 592.28) * 841.89;
        let leftHeight = contentHeight;
        let position = 30;
        let imgWidth = 592.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0); //最后将canvas转换成base64  1.0是转换成base64的清晰度
        let PDF = new JsPDF("", "pt", "a4");
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            if (leftHeight > 0) {
              PDF.addPage();
            }
          }
        }
        // 浏览器自动下载pdf文件
        PDF.save("pdf.pdf");
      });
    }
  }
};
```

## 使用 html2canvas 无法渲染网络图片

::: danger 注意

1. 服务器的图片，必须是已经设置了允许跨域的
2. 如果服务器端的图片不允许跨域访问，使用一下方法也无法解决

:::

## 解决思路

::: tip

1.  将网络图片转为 base64，在页面中使用 base64 渲染
2.  通过 html2Canvas 将 html 中指定区域转化为 canvas
3.  使用 canvas.toDataURL("image/jpeg", 1.0);将 canvas 转为 base64
4.  再通过 jspdf 导出 pdf

:::

## js 代码

首先定义一个方法

```js
getBase64(url, ext, callback) {
    var canvas = document.createElement("canvas"); //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "Anonymous";//说是可以跨域，但还是要看服务端是否允许跨域
    img.src = url;
    img.onload = function() {
    canvas.width = img.width; //指定画板的宽度，自定义
    canvas.height = img.height; //指定画板的高度,自定义
    ctx.drawImage(img, 0, 0, img.width, img.height); //参数可自定义
    var dataURL = canvas.toDataURL("image/" + ext);
    callback.call(this, dataURL); //回掉函数获取Base64编码
    canvas = null;
    };
}
```

使用方法

```js
let temp =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
this.getBase64(imgUrl, "png", function(base64) {
  // 给原生img对象的src属性赋值
  this.imgUrl = base64;
});
```

### 在通过上面`ExportPdf()`方法导出 PDF
