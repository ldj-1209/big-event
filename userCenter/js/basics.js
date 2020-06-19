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


    $('.layui-form').submit(function(e) {
        e.preventDefault()

        var fd = $(this).serialize()

        console.log(fd);

        $.ajax({
            type: 'post',
            url: 'my/userinfo',
            data: fd,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg('更改成功!')
                    getData()
                }
            }
        })


    })


})