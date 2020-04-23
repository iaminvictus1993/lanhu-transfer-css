// 下划线转驼峰, react内联style,
function toReactCamel(str) {
  // 属性转驼峰
  var camelCss = str.replace(/([^-])(?:-+([^-]))([^-]*:)/g, function(
    $0,
    $1,
    $2,
    $3
  ) {
    return $1 + $2.toUpperCase() + $3;
  });
  // 属性值，加引号，数字不加引号,分号改逗号
  return camelCss.replace(/:(.*);/g, function($0, $1) {
    return isNaN(Number($1)) ? `:"${$1}",` : `:${$1},`;
  });
}

// reactNative 驼峰转换
function toRNCamel(str) {
  var specialCss = toReactCamel(str);

  // 数字像素,px转为*unitWidth(个人特殊需求)
  return specialCss.replace(/:"(\d+)(px)",/g, function($0, $1, $2) {
    return `:${$1}*unitWidth,`;
  });
}

function appendCssToDom(codestr, toCamelFn, title) {
  var reactStyleDom = document.createElement("div");
  reactStyleDom.className = "customDom";
  reactStyleDom.style.marginTop = "10px";
  var reactStyleDomTitle = document.createElement("div");
  reactStyleDomTitle.className = "subtitle";
  reactStyleDomTitle.innerText = title;
  var pre = document.createElement("pre");
  pre.className = "language-css";
  var c = document.createElement("code");
  c.innerText = toCamelFn(codestr);
  c.className = "language-css";
  pre.appendChild(c);
  reactStyleDom.appendChild(reactStyleDomTitle);
  reactStyleDom.appendChild(pre);
  document
    .getElementsByTagName("code")[0]
    .parentElement.parentElement.appendChild(reactStyleDom);
}

function isExistCode() {
  return (
    document.getElementsByTagName("code") &&
    document.getElementsByTagName("code")[0] &&
    document.getElementsByTagName("code")[0].innerText
  );
}
function isExistCustomDom() {
  return (
    document.getElementsByClassName("customDom") &&
    document.getElementsByClassName("customDom")[0]
  );
}

function transferCss() {
  if (isExistCode() && !isExistCustomDom()) {
    var codestr = document.getElementsByTagName("code")[0].innerText;
    appendCssToDom(codestr, toReactCamel, "react内联style对象");
    appendCssToDom(codestr, toRNCamel, "react-native内联style对象");
  }
}

document.onkeydown = function(ev) {
  var ev = ev || window.event;
  if (ev.keyCode == 70 && !ev.ctrlKey) {
    transferCss();
  }
};
