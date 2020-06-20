/*
通用的接口调用设置
*/
$(function() {
    var baseUrl = 'http://www.liulongbin.top:3007/';

    $.ajaxPrefilter(function(option) {

        option.beforeSend = function() {

            window.NProgress && window.NProgress.start()
        }

        option.url = baseUrl + option.url

        if (option.url.lastIndexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('mytoken')
            }
        }

        option.complete = function(res) {

            window.NProgress && window.NProgress.done()

            if (res.responseJSON === 1) {

                localStorage.removeItem('mytoken')
            }

        }
    })
})