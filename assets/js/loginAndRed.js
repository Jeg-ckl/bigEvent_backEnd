$(function() {
    $("#link-reg").on('click', function() {
        $(".login-box").hide()
        $(".registed-box").show()
    })

    $("#link-login").on('click', function() {
        $(".login-box").show()
        $(".registed-box").hide()
    })

    // 表单验证
    var form = layui.form;
    // 弹出层对象
    var layer = layui.layer;
    form.verify({
        // 自定义了一个密码校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //定义一个确认密码的校验规则
        repwd: function(value) {
            // value 是确认密码框的内容
            // 需要获取密码框的内容
            var pwd = $(".registed-box [name=password]").val();
            if (value != pwd) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form-reg").on('submit', function(e) {
        // 阻止默认的请求
        e.preventDefault();
        var datas = {
            username: $("#form-reg [name=username]").val(),
            password: $("#form-reg [name=password]").val()
        };
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: datas,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功！', { icon: 6 });
            }
        })
    });

    // 监听登录表单的提交事件
    $("#form-login").submit(function(e) {
        // 阻止默认的请求
        e.preventDefault();
        console.log($(this).serialize());

        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(), // 快速获取表单数据的方法 serialize()
            success: function(res) {
                if (res.status != 0) {
                    // return console.log(res);
                    return layer.msg(res.message + '，用户名或密码错误', { icon: 5 });
                }
                layer.msg('登录成功！', { icon: 6 });
                // console.log(res);
                // 把后台返回的token存到本地存储 localStorage
                localStorage.setItem('token', res.token)
                    // 跳转到主页 
                location.href = './index.html'
            }
        })
    })
})