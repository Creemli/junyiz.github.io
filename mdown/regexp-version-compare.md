# ��������ʽ���а汾�űȽ�

˼·����������ʽ�Ѱ汾��ת����6λ����Ȼ���ٽ��бȽ�

Javascriptʵ������

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

ʹ��ʾ����
```javascript
compare('5.10', '5.9')    //true
compare('6.1', '5.10.1')  //true
```

