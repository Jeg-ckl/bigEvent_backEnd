$(function() {
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须为1~6为字符！'
            }
        }
    })

    initUserInfo(layer);

    // 初始化用户的基本信息
    function initUserInfo(layer) {
        $.ajax({
            methos: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);

                // 调用layui 里面的内置方法 form.val() ,快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单的数据
    $("#btnReset").on('click', function(e) {
        // 阻止表单是默认重置行为
        e.preventDefault();
        // 重新调用获取用户信息的方法
        initUserInfo(layer);
    })

    // 监听表单的提交事件
    $(".layui-form").submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交用户信息失败！')
                }
                // console.log(res);
                layer.msg('提交用户信息成功！')

                // 调用父页面index.html 的js方法 getUserInfo() ,重新渲染欢迎区域
                window.parent.getUserInfo(layer);
            }
        })
    })
})