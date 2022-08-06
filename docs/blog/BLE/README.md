---
title: 如何解决安卓/IOS获取蓝牙ID不一致问题
date: 2020-04-20 23:09:22
tags: [BLE,蓝牙技术,小程序]
categories: 小程序
---

# 如何解决安卓/IOS获取蓝牙ID不一致问题

> 不知道大家对低能蓝牙的技术应用了解的怎么样，其实这是一个比较广的应用，比如可以应用于一些信标、家庭娱乐或者医疗方面都有应用。

![ ](../common/1.gif)


## 01 前言

因为小程序官方是支持接入低能蓝牙（BLE）的，所以在一个项目中也尝试使用如何接入蓝牙，我们从微信的官方网站就可以清楚知道如何使用，但是其中也是有很多坑的。本着学习的心态，自己也手把手带你摸坑，一起处理一些`平台兼容性的问题`以及一些`逻辑判断`问题。

## 02 问题抛出

因为蓝牙在IOS客户端`6.5.6`版本开始支持，安卓`6.5.7`开始支持，所以一开始我们就应该判断版本问题，以免后面的功能不能使用。

我们从文档上面看到这样一段话：

> 由于系统限制，Android 上获取到的 deviceId 为设备 MAC 地址，iOS 上则为设备 uuid。因此 deviceId 不能硬编码到代码中。

看到这里我就想着，完犊子了，因为我们的手机平台有安卓和苹果，唯一标识蓝牙的就是deviceId，但是苹果搜索出来就不是这个了，而是uuid的一串字符串。因为苹果官方认为透露deviceId（MAC地址）会有安全问题，索性直接屏蔽了。

## 03 使用方法

为了保证本文的完整性，我就大概介绍一下怎么使用在小程序接入低能蓝牙，大家也可以去官网看一下。

- 初始化蓝牙模块

```javascript
openBluetoothAdapter() {
    var that = this;
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter({
        success: function (res) {
          wx.showToast({
            title: "正在获取蓝牙列表",
            icon: "loading",
          });
          that.getBluetoothAdapterState();
        },
        fail: function (err) {
          wx.showModal({
            title: "提示",
            content: "请先打开蓝牙",
            showCancel: false,
          });
          that.stopBluetoothDevicesDiscovery();
        },
      });
    } else {
    }
  },
```

- 获取本机蓝牙适配器状态

```javascript
var that = this;
 wx.getBluetoothAdapterState({
   success: function (res) {
     that.startBluetoothDevicesDiscovery();
   },
   fail(err) {
     console.log(err);
   },
 });
```

- 开始搜寻附近的蓝牙外围设备

```javascript
startBluetoothDevicesDiscovery() {
    console.log("获取蓝牙设备列表");
    var that = this;
    that.data.devices = [];
    wx.startBluetoothDevicesDiscovery({
      success: function (res) {
        that.getBluetoothDevices();
      },
      fail(err) {
        console.log(err);
      },
    });
  },
```

- 获取在蓝牙模块生效期间所有已发现的蓝牙设备

```javascript
getBluetoothDevices() {
    var _this = this;
    wx.getBluetoothDevices({
      services: [],
      allowDuplicatesKey: false,
      interval: 0,
      success: function (res) {
        wx.hideToast();
        console.log(res);
      },
      fail(res) {
        console.log(res, "获取蓝牙设备列表失败=====");
      },
    });
  },

```

经过上面的一通操作之后我们就可以获取到蓝牙列表了，你可以查看你的低能蓝牙是否可以获取到。看到这里你就可以发现`安卓与苹果的搜索结果是不一样`的。


![苹果获取的蓝牙](https://imgkr.cn-bj.ufileos.com/fb4308d5-de80-48b7-ba7f-cd3399ff1953.png)


![安卓获取的蓝牙](https://imgkr.cn-bj.ufileos.com/01c1c9be-3a26-4bcd-8200-ac2423f9c575.png)


## 04 解决途径

**版本问题**

首先就是版本的问题，我们要判断写一个版本的判断函数用来判别用户的版本：

```javascript
function versionCompare(ver1, ver2) { 
    var version1pre = parseFloat(ver1)
    var version2pre = parseFloat(ver2)
    var version1next = parseInt(ver1.replace(version1pre + ".", ""))
    var version2next = parseInt(ver2.replace(version2pre + ".", ""))
    if (version1pre > version2pre)
        return true
    else if (version1pre < version2pre)
        return false
    else {
        if (version1next > version2next)
            return true
        else
            return false
    }
}
```
然后调用微信的官方接口来获取手机版本：

```javascript
wx.getSystemInfo({
      success(res) {
        let currVersion = res.system.split(' ')[1];
        if (res.platform == 'android' && util.versionCompare('6.5.7', currVersion)) {
          wx.showModal({
            title: '提示',
            content: '当前android版本过低，暂不支持',
            showCancel: false
          })
        } else if (res.platform == 'ios' && util.versionCompare('6.5.6', currVersion)) {
          wx.showModal({
            title: '提示',
            content: '当前ios版本过低，暂不支持',
            showCancel: false
          })
        }
      }
    })

```

**跨平台方案**

我们必须`保证设备的标识唯一`，两种平台获取的数据是一样的，那么我们既然不能联系苹果叫他开放，我们就采用一个`折中`的方法。

我一开始网上查找了很多资料，其中有说道蓝牙的`advertisData`当中是含有MAC地址的数据包，你只要解析一下就可以获取了，但是我按照他的方法操作一番发现安卓的deviceId和我获取的是不一样的值。所以就放弃这个方法了。

这时我就想着既然苹果可以通过这个字段获取到一个唯一值，那么安卓同样也可以呀。所以安卓端我也同样使用这个方法获取，不出所料果然可以。

我把这个方法称之为`适配器方法`，因为和设计模式的适配器模式思想一样：

```javascript
function getUniqueId(bf) {
    let buffer = bf.slice(4, 10);
    let mac = Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    return mac.toUpperCase()
}
```

简单介绍一下，这是一个处理buffer的函数，因为我们展开advertisData字段看到是buffer类型的，只要我们把它当作参数传进去就可以获取到16进制的值，我就把这个值当作蓝牙的唯一标识。例如`F3C85DF5EFFB`的这种标识。

## 05 小结

期间也用过尝试很多种的方式来解决这个顽固的问题，但是都没有成功。心里就只有一个想法就是如何把这两者通过中间方法获取都是一样的值。

这个项目我觉得最大的坑就是这个了，曾经研究了好多天的时间都不曾解决，一开始我也不知道有这个限制，我还问过淘宝的蓝牙生产商能不能在蓝牙上面多加一个广播字段与deviceId一样，加入可以的话就直接获取了，也没有这么多事情了。奈何不行。

所以希望大家做这一块的话可以留意一下这个问题，但是我还发现有一些蓝牙的广播字段没有这个advertisData这个字段，那么我的方法也就不管用了，我还在想着怎么解决这个问题，后面有进展再更新吧。


![ ](../common/2.gif)