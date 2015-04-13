#### 一、安装 node 和 npm
到http://nodejs.org下载最新的安装文件（http://nodejs.org/dist/v0.10.29/x64/node-v0.10.29-x64.msi），会自动安装好 node 和 npm

#### 二、全局安装gulp
在dos下执行命令：

```bash
  npm install -g gulp
```


#### 三、克隆gitlab上的fashion-tool
比如：克隆到E盘（e:\gitlab\fashion-tool），进入到目录e:\gitlab\fashion-tool，执行如下命令：
```bash
git clone git@git.dev.sh.ctripcorp.com:xuweichen/fashion-tool.git
或
git clone http://git.dev.sh.ctripcorp.com/xuweichen/fashion-tool.git
```
也可以直接下载http://git.dev.sh.ctripcorp.com/xuweichen/fashion-tool/repository/archive.zip?ref=master

#### 四、安装gulp的依赖文件
进入目录e:\gitlab\fashion-tool\gulp，执行如下命令：
```bash
  npm install
```

#### 五、修改配置文件
打开e:\gitlab\fashion-tool\gulp\config.json
```javascript
{
    "root": "D:\\workspace\\hotel\\ResStatic",
    "branch": "\\Release\\156_0701",
    "site": "\\ResHotelIntlOnline",
    "path": "\\search"
}
```
也可在压缩时，通过命令传入以上参数

#### 六、压缩
执行命令
```bash
gulp
或
gulp --root D:\\workspace\\hotel\\ResStatic --branch \\Mainline\\code --site \\ResHotelIntlOnline --path \\search
或通过fullpath传入一个文件系统的绝对路径
gulp --fullpath D:\\workspace\\hotel\\ResStatic\\Mainline\\code\\ResHotelIntlOnline\\search
或通过tfspath传入一个TFS路径
gulp --tfspath $/ResStatic/Release/162_0812/ResHotelOnline/search
```
会自动先签出js.min目录下的文件，压缩完成后，会再次自动签入。
请先确保命令里有 tf 命令，若没有，请将“C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/” 加到你的windows环境变量里面。

#### 七、线上调试
目前海外酒店有两种方案切换到未压缩版的JS：
 * URL后面带参数：?jsdebug=T
 * 更改appsetting里面的开关JsRelativePath=search/js.min
