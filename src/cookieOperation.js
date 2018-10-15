// 设置 cookie
function setCookie (name, value, minutes) {
  // 获取当前时间
  let d = new Date()
  // 设置时间为当前时间延后 days天
  d.setTime(d.getTime() + 60 * 1000 * minutes)
  // 新的cookie设置为  名字=值加上;path=/;expires=有效时间
  let newCookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  // window.document.cookie = newCookie 并不会覆盖所有的其他cookie 因为同一个域内的cookie不同名就不会出现覆盖
  window.document.cookie = newCookie
  console.log('setCookie', name, newCookie)
}
// 获取 cookie
function getCookie (name) {
  let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)') // 匹配有这个名字的cookie同时要获取其值
  return v ? v[2] : null
}
// 删除cookie  设置时间失效
function deleteCookie (name) {
  setCookie(name, '', -1)
}

export {setCookie, getCookie, deleteCookie}
