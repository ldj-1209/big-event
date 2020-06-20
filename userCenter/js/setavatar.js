$(function() {

    var option = {
        aspectRatio: 1,

        preview: '.img-preview'
    }
    var $img = $('.cropper-box img')

    $img.cropper(option)




    $('#upload').click(function() {
        $('input[type=file]').click()
    })

    $('input[type=file]').change(function(e) {
        var file = e.target.files[0]

        var imgUrl = URL.createObjectURL(file)

        $img.cropper('destroy').attr('src', imgUrl).cropper(option)

    })


    $('#submit').click(function() {

        var imgURL = $img.cropper('getCroppedCanvas', {
            width: 100,
            hieht: 100
        }).toDataURL('image/png')




        $.ajax({
            type: 'post',
            url: 'my/update/avatar',
            data: {
                avatar: imgURL
            },
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)

                    window.parent.transCation()
                }

            }
        })
    })



})