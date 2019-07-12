# 监听页面时刷新还是离开

##

```js
window.onload = function() {
  if (!window.sessionStorage["tempFlag"]) {
    // 关闭页面
    resetRouter(); //清除路由
    Cookies.remove("token"); //清除Cookies
    console.log("14451251251", 14451251251);
    location.reload(); //不能省，刷新页面
  } else {
    // 刷新页面
    window.sessionStorage.removeItem("tempFlag");
  }
};
window.onunload = function() {
  window.sessionStorage["tempFlag"] = true;
};
window.onbeforeunload = function() {
  window.sessionStorage["tempFlag"] = true;
};
```
