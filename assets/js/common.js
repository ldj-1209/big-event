/*
通用的接口调用设置
*/

var baseUrl = 'http://ajax.frontend.itheima.net/'

$.ajaxPrefilter(function(option) {

    console.log(option);

    option.url = baseUrl + option.url

    if (option.url.lastIndexOf('/my/') !== -1) {

        option.headers = {
            Authorization: localStorage.getItem('mytoken')
        }
    }

    option.complete = function(res) {


        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('mytoken')

            location.href = './login.html'
        }
    }

})