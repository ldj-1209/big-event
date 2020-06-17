$(function() {

    $.ajax({
        type: 'get',
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        headers: {
            Authorization: mytoken
        },
        success: function(res) {
            if (res.status === 0) {
                console.log(res);

                var username = res.data.username
                $('.username').html(username)

                var imgurl = res.data.user_pic
                if (imgurl) {
                    $('.username').siblings('img').attr('src', imgurl)
                } else {
                    $('.username').siblings('img').attr('src', './assets/images/avatar.jpg')
                }
            }

        }
    })


    // 控制退出事件
    $('#close-btn').click(function() {


        layer.confirm('真的要退出吗?', {
            icon: 3,
            title: '提示'
        }, function(index) {

            localStorage.removeItem('mytoken')

            location.href = ('./login.html')


            layer.close(index);
        })
    })
})