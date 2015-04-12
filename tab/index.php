<!DOCTYPE HTML>
<html>
<head>
<meta charset="gbk">
<title>mvc_tab</title>
<link rel="stylesheet" href="inc/reset.css" />
<link rel="stylesheet" href="tab.css" />
<script src="http://junyi.me/demo/tab/inc/json2.js"></script>
<script src="http://junyi.me/demo/tab/inc/jquery-1.6.4.js"></script>
<script src="http://junyi.me/demo/tab/inc/underscore-1.2.2.js"></script>
<script src="http://junyi.me/demo/tab/inc/backbone.js"></script>
</head>
<body>
<div id="content">
    <ul id="tab-nav">
        <li class="active"><a href="#tab/0">潮流服装</a></li>
        <li><a href="#tab/1">数码家电</a></li>
        <li><a href="#tab/2">名品鞋包</a></li>
        <li><a href="#tab/3">运动户外</a></li>
        <li><a href="#tab/4">母婴食品</a></li>
        <li><a href="#tab/5">彩妆珠宝</a></li>
    </ul>
    <div id="tab-con">
        <ul></ul>
    </div>
</div>
<script type="text/template" id="item-template">
    <li><a href="<% print(i.href) %>" target="_blank"><img width="200" height="80" src="<% print(i.img) %>" alt="<%  print(i.alt); %>" /></a></li>
</script>
<script src="http://junyi.me/demo/tab/tab.js"></script>
</body>
</html>
