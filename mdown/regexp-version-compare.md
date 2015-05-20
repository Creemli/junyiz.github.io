# 用正则表达式进行版本号比较

思路：用正则表达式把版本号转化成6位数，然后再进行比较

Javascript实现如下

```javascript
var r = /(\d+)\.(\d+)(\.)?(\d+)?/;
function c(ver) {
  return ver.replace(r, function() {
    var args = arguments;
    return args[1] * 10000 + args[2] * 100 + +(args[4] || 0);
  });
}
function compare (ver1, ver2) {
  return c(ver1) > c(ver2);
}
```

使用示例：
```javascript
compare('5.10', '5.9')    //true
compare('6.1', '5.10.1')  //true
```

