$(function() {
    // 新建layer对象
    var layer = layui.layer;
    // 调用getUserInfo()函数
    getUserInfo(layer);


    // 实现推出功能
    $("#tuichu").on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储的token
            localStorage.removeItem('token');
            // 2.跳转到登录页面
            location.href = 'login.html';
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 设置请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                console.log(res);
                return layer.msg('获取用户信息失败！')
            }
            // console.log(res);
            // 调用渲染用户头像的函数
            randerAvatar(res.data);
        },
        // 不论是否成功与失败都会调用 complete 回调函数
        // complete: function(res) {
        //     // 判断返回的参数
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.清空token
        //         localStorage.removeItem('token');
        //         // 2.跳转到login页面
        //         location.href = 'login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function randerAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $("#welcome").html(name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        var first = name[0].toUpperCase();
        $(".layui-nav-img").hide();
        $(".text-avatar").html(first).show();
    }

}