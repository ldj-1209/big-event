$(function() {

    var form = layui.form;
    form.verify({
        username: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符!';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'!';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字!';
            }
        },

        psw: [/^[\S]{4,12}$/, '密码必须6到12位，且不能出现空格!'],

        same: function(value) {
            var oldPsw = $('#registered input[name=password]').val()

            if (oldPsw !== value) {
                return '两次输入的密码不一致!'
            }
        }
    })

    //  控制登录表单
    $('#loginForm').submit(function(e) {

            e.preventDefault();

            var formData = $(this).serialize();




            $.ajax({
                type: 'post',
                url: 'api/login',
                data: formData,
                success: function(res) {


                    if (res.status === 0) {

                        console.log(res.token);

                        localStorage.setItem('mytoken', res.token);


                        location.href = './index.html'
                    } else {
                        layer.msg(res.message + '账号或密码错误 !')
                    }
                }
            })
        })
        //  控制登录表单 end

    //  控制表单切换 star
    $('#registered .links').click(function() {

        $('#registered').hide()
        $('#loginForm').show()
    });
    $('#loginForm .links').click(function() {

            $('#loginForm').hide()
            $('#registered').show()
        })
        //  控制表单切换 end


    //  控制注册表单
    $('#registered').submit(function(e) {
        e.preventDefault()
        var formData = $(this).serialize()

        $.ajax({
            type: 'post',
            url: 'api/reguser',
            data: formData,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg('注册成功!')
                    $('#registered .links').click()
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })
})