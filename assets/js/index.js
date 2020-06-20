$(function() {

    transCation();

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

function transCation() {
    $.ajax({
        type: 'get',
        url: 'my/userinfo',

        success: function(res) {
            if (res.status === 0) {


                var username = res.data.nickname || res.data.username

                $('.username').html(username)

                var imgurl = res.data.user_pic || './assets/images/avatar.jpg'

                $('.username').siblings('img').attr('src', imgurl)


            }

        }
    })
}

$.transCation = transCation;