$(function() {
    // 编写此脚本的目的是，为了优化每次请求时都会拼接根路径的繁琐
    // 在发起ajax请求之前，ajax会自动调用这个函数，
    // options 是我们调用ajax时的配置对象
    // 利用 options.url 可以获取到请求地址
    // 在此步骤可以修改url地址
    $.ajaxPrefilter(function(options) {
        // 在发起真正的请求之前，统一拼接根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})