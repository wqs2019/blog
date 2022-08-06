---
title: 你还在使用原生开发小程序吗
date: 2020-04-18 21:51:22
tags: [小程序,mpvue]
categories: 小程序
---

# 你还在使用原生开发小程序吗

> 最近帮别人在做一个小程序,因为官方的支持不够好,组件库也不够多,所以就没有使用官方的操作。网上查找了一番，觉得mpvue还不错（之前也没玩过），索性拿来用吧！

![ ](../common/1.gif)


## 01 前言
小程序的做法也是比较简单的，假如你是老手的话基本上开箱即用，但是奈何自己技术不够，那就手把手教你踩坑吧。

之前也做过几个小程序，我用过`官方的`、`uni-app`开发，效果还行。然后现在是想尝试一下`mpvue`，生态还可以，组件库也多。拿到设计图的时候觉得还可以，但是一看好像还是有点东西的。

## 02 自定义tabbar

我看到了页面是有一个自定义tabbar的，自己之前没有做做过这种，都是直接在app.json文件里面配置的，简单高效不带坑。虽然说官方支持`自定义tabbar`的功能，但是我和官方的意思就不是同一个频道的。这是我拿到的`原型图`：


![原型图](https://imgkr.cn-bj.ufileos.com/04476daa-209b-4a1c-a21b-686ad3a103fe.png)

一开始好像是有点蒙，但是谷歌了一下其实还有救。思想就是把原生的tabbar隐藏，然后把你自定义的tabbar放上去即可。

- 在app.json配置tabbar，因为后面要跳转（不配置报错）
- 新建一个mytabbar.vue文件，写自己的tabbar
- 在app.vue的onShow的时候隐藏原生的tabbar,`wx.hideTabBar();`

这样其实就好了，但是需要tabbar的页面都要引入自己的组件，talk is cheap，接下来就开始实现自己的组件吧。

### 自定义组件

**模板部分**

```html
<template>
  <section class="tabBar-wrap">
    <article class="tabBar-box">
      <ul class="tabBar-nav" v-if="navList.length > 0">
        <li
          class="item"
          v-for="(item, index) in navList"
          @click="selectNavItem(index,item.pagePath)"
          :key="index"
        >
          <p class="item-images">
            <img
              :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath"
              alt="iconPath"
            />
          </p>
          <p
            :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' "
          >{{item.text}}</p>
        </li>
        <li v-if="needButton" style="flex: 2">
          <div class="submit-box">
            <button
              v-if="btnText==='抽大礼'"
              :disabled="!handButton"
              @click="bindNavigateTo('../game/main')"
              :class="handButton ? 'submit-box-btn submit-box-btn-active' : 'submit-box-btn' "
            >{{ btnText }}</button>
          </div>
        </li>
      </ul>
    </article>
  </section>
</template>
```

**逻辑部分**

```javascript
<script>
export default {
  props: ["selectNavIndex", "needButton", "handButton", "btnText"],
  data() {
    return {
      navList: [
        {
          pagePath: "../index/main",
          iconPath: "../../static/tabs/home.png",
          selectedIconPath: "../../static/tabs/home-active.png",
          text: "首页"
        },
        {
          pagePath: "../share/main",
          iconPath: "../../static/tabs/home.png",
          selectedIconPath: "../../static/tabs/home-active.png",
          text: "分享"
        },
        {
          pagePath: "../center/main",
          iconPath: "../../static/tabs/home.png",
          selectedIconPath: "../../static/tabs/home-active.png",
          text: "我的"
        }
      ]
    };
  },
  methods: {
    selectNavItem(index, pagePath) {
      if (index === this.selectNavIndex) {
        return false;
      }
      this.bindViewTap(pagePath);
    },
    bindNavigateTo(url) {//不是tabbar的页面跳转方式
      wx.navigateTo({
        url
      });
    },
    bindViewTap(url) {//tabbar页面的跳转方式
      wx.switchTab({
        url
      });
    }
  }
};
</script>
```

**样式部分**
```css
.tabBar-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 10rpx 0;
  border-top: 1px solid #eee;
  background-color: #eb8c2b;
}
.tabBar-nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.item {
  flex: 1;
  text-align: center;
}
.item-text {
  color: #666;
  font-size: 14px;
  font-weight: bold;
  transition: 0.24s linear;
}
.item-text-active {
  color: #fec754;
}
.item-images {
  margin: 0 auto;
  text-align: center;
  transition: 0.24s linear;
}
img {
  width: 60rpx;
  height: 60rpx;
}
.submit-box-btn {
  position: relative;
  z-index: 999;
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 50rpx;
  color: #404040;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #eee;
  text-align: center;
  border: 1px solid #eee;
}
.submit-box-btn-active {
  color: #fff;
  border: none;
  border: 1px solid #fca542;
  background-color: #fca542;
}
button {
  border: none;
  outline: none;
}
```

### 使用方式

使用方式也很简单，直接把它引入进来，然后注册一下就可以了。

```javascript
import mytabbar from "@/components/mytabbar";

components: {
    mytabbar
  },
```
在你的页面里面放上组件：

```html
<mytabbar
      :needButton="needButton" 
      :btnText="btnText"
      :handButton="handButton"
      :selectNavIndex="selectNavIndex"
></mytabbar>
```

- needButton:是否需要一个button，就像我这里就需要了
- btnText：button里面的文字显示，因为可能另一个页面显示不一样
- handButton：点击button的逻辑
- selectNavIndex：需要高亮的下标，每个页面的高亮不一样


![最后实现](https://imgkr.cn-bj.ufileos.com/66f1a5dc-90e1-4aa9-bfd2-f6b7215b3056.png)


## 03 组合使用Vant

自己造轮子很麻烦，就用别人的组件库好了。看了一下Vant还不错，而且别人也尝试过使用vant+mpvue的开发模式，坑还是自己踩一边的好。

首先我遇到的第一个问题就是如何引入组件库，虽然官方的做法是直接安装，但是我安装之后发现老是找不到路径，没办法只好放弃。我现在采用的是`直接引入本地的`方式进行，虽然每一次编译都要一点时间，但是还好。以后上线的时候把没用的组件删除就好，保留你需要使用的组件（按需引入）

下载整个仓库之后把里面的`dist文件夹`下面的所有文件复制到你的项目，`static/vant`当中，以后使用就从这里引入好了，使用的时候还是在app.json里面配置(`与pages同级`)：

```json
"usingComponents": {
    "van-button": "/static/vant/button/index",
    "van-tab": "/static/vant/tab/index",
    "van-tabs": "/static/vant/tabs/index",
    "van-nav-bar": "/static/vant/nav-bar/index",
    "van-icon": "/static/vant/icon/index",
    "van-row": "/static/vant/row/index",
    "van-col": "/static/vant/col/index",
    "van-dialog": "/static/vant/dialog/index",
    "van-field": "/static/vant/field/index",
    "van-area": "/static/vant/area/index",
    "van-popup": "/static/vant/popup/index",
    "van-picker": "/static/vant/picker/index"
  },
```
这样其实就可以了，写页面的时候直接按照它的文档写就好了。

## 04 遇到的小坑

**自定义NavBar**

因为UI图上面的导航有自定义的样式，没办法只好使用vant的`van-nav-bar`，但是我使用slot的时候发现左边的图标点击不了。

文档上面是使用`bind:click-left`的方式，但是没用，其实正确的写法应该是：

```html
<van-nav-bar title="我的">
   <van-icon name="wap-home" slot="left" @click="toHome"/>
</van-nav-bar>
```

**图片背景**

使用图片背景的时候，发现报错说不可以引用本地的图片，使用base64或者网络图片。但是我使用网络图片发现报了403错误，没有权限。索性就使用了base64的方式。虽然不太接受这种方式，因为转出来的字符串很长。

**获取定位**

首页需要有一个获取定位的功能。但是看了一下小程序的官方文档只能获取到经纬度。这里我就使用了第三方的接口，去腾讯位置服务平台注册一下，可以使用经纬度逆向解析地址的功能。


![](https://imgkr.cn-bj.ufileos.com/6be46cf5-4cdf-47a7-a575-34bcb446ba25.png)

然后里面有一个逆地址解析的功能，使用经纬度作为参数就可以获取了。但是开始你要去app.json配置：

```javascript
//在app.json中配置权限
"permission": {
    "scope.userLocation": {
      "desc": "您的位置信息将用于搜索银行信息,以帮助您填写正确的支行信息"
    }
  },
```

![](https://imgkr.cn-bj.ufileos.com/0c65e9b8-5cde-43ca-8694-8559c40174c8.png)

实例代码：

```javascript
wx.getLocation({
      type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        
        console.log("定位成功",res);
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: "http://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1",
          data: {
            key: "xxxxx-xxxxx-xxxxx-xxxx-xxxxx-xxxxx",//你自己的key,页面上有
            location: locationString
          },
          method: "GET",
          success: function(res) {
            console.log("请求成功",res);//这里就可以获取你的地址了
          },
          fail: function() {
            console.log("请求失败");
          },
          complete: function() {
            console.log("请求完成");
          }
        });
      },
      fail: function() {
        console.log("定位失败");
      },
      complete: function() {
        console.log("定位完成");
      }
    });
```

但是你会发现也有一些小问题，比如一开始说你的合法域名问题。


![](https://imgkr.cn-bj.ufileos.com/a19b7e1e-b053-45b1-8c96-517408a792e1.png)
然后你就可以去你的项目配置那里勾上`不检验合法域名`。


![](https://imgkr.cn-bj.ufileos.com/7a16cb6b-b678-495f-a625-e5ef1b58d1c3.png)
然后重新试一下，发现还是不行。


![请求源未授权](https://imgkr.cn-bj.ufileos.com/a07d938c-c7d8-4201-82b8-f9d5247a1091.png)

这里其实就要你去微信小程序的后台加入请求源了，因为我现在是测试号没有后台弄不了。注意的是：

- 微信小程序使用的时候，WebServiceAPI 域名白名单`不能配置`，否则会报错
- request合法域名`要配置`

## 05 小结

一顿操作下来发现自己还是可以接受，但是应该说还有很多坑没有亲自踩，都是在前人的路上走，谷歌一搜mpvue的，为什么一堆都是踩坑记录？？？

其实还好，mpvue对vue的语法支持还不错，因为现在自己对vue的语法比较熟悉，写起来是没有毛病的，但是主要是一些细节上可能会难以把控。

特此记录一下，也是对自己的记录。发现其实学会了vue真的是很好，不仅可以开发web界面还可以把小程序也一起搞了。

参考文章：

- [mpvue 小程序如何自定义tabBar，不使用navigateTo跳转，模拟redirectTo跳转](https://segmentfault.com/a/1190000015027980)

![ ](../common/2.gif)