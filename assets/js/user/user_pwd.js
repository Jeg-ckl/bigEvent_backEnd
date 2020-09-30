$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $("[name=oldPwd]").val()) {
                return '新密码不能和原密码相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $("[name=newPwd]").val()) {
                return '两次输入的密码不一致！'
            }
        }
    })

    // 修改密码的功能
    $(".layui-form").submit(function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // console.log(res);
                    return layer.msg('修改密码失败！')
                }
                // console.log(res);
                layer.msg('修改密码成功！');
                $(".layui-form")[0].reset();
            }
        })
    })
})