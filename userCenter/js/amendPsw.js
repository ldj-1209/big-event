$(function() {

    var form = layui.form

    form.verify({
        pws: [
            /^[\S]{6,12}$/,
            '密码必须是在6-12个字符之间'
        ],
        different: function(value) {
            if (value === $('input[name=oldPwd]').val()) {
                return '新密码不能与原始密码相同!'
            }
        },
        same: function(value) {
            if (value !== $('input[name=newPwd]').val()) {
                return '确认密码和新密码不同!'
            }
        }
    });

    $('.layui-form').submit(function(e) {
        e.preventDefault()

        var fd = $(this).serialize();
        console.log(fd);
        $.ajax({
            type: 'post',
            url: 'my/updatepwd',
            data: fd,
            success: function(res) {
                console.log(res);

                if (res.status === 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                }
            }
        })

    })





})