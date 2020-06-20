$(function() {

    function getData() {
        $.ajax({

            type: 'get',
            url: 'my/userinfo',
            success: function(res) {

                if (res.status === 0) {
                    $('input[name=username]').val(res.data.username)
                    $('input[name=nickname]').val(res.data.nickname)
                    $('input[name=email]').val(res.data.email)
                    $('input[name=id]').val(res.data.id)

                }
            }
        })
    };
    getData()

    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (!(/^[\S]{1,8}$/.test(value))) {
                return '用户名不能超过字符';
            }
        },
        email: [
            /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '请输入正确的email地址'
        ]


    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()

        var fd = $(this).serialize()

        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: fd,
            success: function(res) {
                if (res.status === 0) {

                    layer.msg('更改成功!')
                    getData()

                    window.parent.transCation();



                }
            }
        })


    })




})