---
title: 如何上传Excel表导入数据库和导出Excel
date: 2020-04-02 23:08:00
tags: [Node,Excel导入,Excel导出]
categories: Node
---

# 如何上传Excel表导入数据库和导出Excel

> 开始接触的时候觉得这是一件比较难的事情，但是通过两个插件你就可以轻松实现以上的功能

![](../common/1.gif)



## 01 前言



最近在做毕业设计的时候遇到的两个问题，特此记录一下自己的实现过程。因为我们知道很多数据都是直接以表格的形式存储的，假如可以使用表格转化成json数据让前端直接操作那岂不是美滋滋。所以想着自己无论如何也要实现以下这个功能。

一开始可能想着直接在小程序弄一下，发现小程序不支持这个功能，所以就简单使用脚手架搭建了一个系统，经过谷歌之后发现需要使用npm 包安装两个插件，相信大家看完之后自己也可以实现成功。废话少说，开搞！

![](./img/2.png)

## 02 数据导入



##### 准备

我们先准备一下安装两个npm 插件：

-  npm install xlsx
- npm install file-saver

这两个插件其实就是解析excel文件并返回数据和识别数据并以excel的格式导出到本地。首先我们在vue项目component中新建一个vue组件，用于放到页面中检测excel表和解析excel表。index.vue组件代码如下

```html
<div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      拖拽文件到这里或者点击上传
      <el-button
        :loading="loading"
        style="margin-left:16px;"
        size="mini"
        type="primary"
        @click="handleUpload"
      >Browse</el-button>
    </div>
  </div>
```

我们把这个组件引入到import.vue的页面当中，配上element-ui的表格，用于渲染导入之后的数据

```vue
<upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
<el-button type="primary" round @click="importDataInfo">
   一键导入数据库
	<i class="el-icon-upload el-icon--right"></i>
</el-button>
<el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
   <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
</el-table>
```

![](./img/1.png)



##### 函数介绍

接下来我们先介绍一下组件是怎么识别excel文件的，我们看到上面有handleDragover的函数，我们先来看一下该函数，主要是组织默认事件和冒泡，因为只有这样，接下来你松开鼠标的时候ondrop事件才会执行。

- handleDragover

```javascript
handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
},
```

- handleDrop：主要是判断用户是否长传一个文件，或者文件的格式是否正确。判断无误之后就开始执行上传的步骤。

```javascript
handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("一次只可以上传一个文件!");
        return;
      }
      const rawFile = files[0]; // 只能这样写，因为files是一个数组，取第一个文件

      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "仅支持.xlsx, .xls, .csv文件"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
```

- upload：文件上传之后会触发beforeUpload函数，beforeUpload函数在import.vue的父组件中，通过父子传值的方式来判断文件大小。当判断通过之后就正式调用readerData开始获取数据了。

```javascript
	upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; 

      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
```

- beforeUpload

```javascript
	beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Excel文件上传不能大于1MB",
        type: "warning"
      });
      return false;
    },
```

- readerData：主要是对excel表格数据的一些处理，最后通过子组件向父组件传值的方式，传递数据给父组件渲染表格。这里有一些概念需要了解一下

> - workbook 对象，指的是整份 Excel 文档。我们在使用xlsx 读取 Excel 文档之后就会获得 workbook 对象。
> - worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
> - cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。

```json
// workbook
{
    SheetNames: ['sheet1', 'sheet2'],
    Sheets: {
        // worksheet
        'sheet1': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        },
        // worksheet
        'sheet2': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        }
    }
}
```



```javascript
	readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();//获取render对象
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });//这是获取整张表格
          const firstSheetName = workbook.SheetNames[0];//表格有很多表，这里我们获取第一张表
          const worksheet = workbook.Sheets[firstSheetName];//根据表明获取对应表
          const header = this.getHeaderRow(worksheet);//获取表头
          const results = XLSX.utils.sheet_to_json(worksheet);//转成json数据
          this.generateData({ header, results });//返回数据
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
```

- generateData：获取上面处理过后的结果以及表格头，用于渲染表格。这里的onSuccess就是回调函数，父组件就可以获取数据了。

```javascript
generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
```

到此我们已经可以获取excel的表格数据了，以上只是主要的代码，具体代码我已提交到[github仓库](https://github.com/wqs2019/importExcelData)。这里由于隐私原因我就截取一部分的信息。通过控制台打印出来我们可以看到是一个数组，每一项都是json数据，格式很友好。

![](./img/3.gif)



然后接下来我们就可以使用这些数据进行数据库导入了，代码部分可以到[github仓库](https://github.com/wqs2019/importExcelData)看一下，这里就不贴了，就是一个循环插入的过程，没什么技术含量。



## 03 数据导出



数据导出的部分其实也是很简单的，就一个函数就可以。我们首先是与表格关联，不然找不到表格就下载和导出不了。具体代码已上传到[github仓库](https://github.com/wqs2019/importExcelData)

##### 核心函数

```javascript
handleDownload() {
      this.downloadLoading = true;
      var wb = XLSX.utils.table_to_book(document.querySelector("#table-data"));//关联表格，表格id为table-data
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        console.log(this.filename);
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          this.filename + ".xlsx" || "excel"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      this.downloadLoading = false;
      console.log("导出完成");
      return wbout;
    },
```



## 04 小结



通过各方捣鼓之后功能已经正常。不得不说使用这种方式的数据处理方式实在是很方便，我们可以通过数据导入的方式避免了直接操作数据库进行导入，而是通过一个中间的管理平台，确保数据的安全性，只有管理员权限才可以进行数据导入。

大家也可以自己尝试一下如何进行数据的导入与导出，实践才是检验真理的唯一标准，需要自己认真动手操作一下才知道流程是怎么样的，才真正学到东西。



![](../common/2.gif)