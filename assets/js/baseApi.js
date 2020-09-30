$(function() {
    // 编写此脚本的目的是，为了优化每次请求时都会拼接根路径的繁琐
    // 在发起ajax请求之前，ajax会自动调用这个函数，
    // options 是我们调用ajax时的配置对象
    // 利用 options.url 可以获取到请求地址
    // 在此步骤可以修改url地址
    $.ajaxPrefilter(function(options) {
        // 在发起真正的请求之前，统一拼接根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url

        // 统一为有权限的接口，设置请求头 headers属性
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // 全局统一挂载 complete 属性
        options.complete = function(res) {
            // 判断返回的参数
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.清空token
                localStorage.removeItem('token');
                // 2.跳转到login页面
                location.href = 'login.html'
            }
        }
    })
})