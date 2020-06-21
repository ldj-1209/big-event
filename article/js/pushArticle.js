$(function() {

    var form = layui.form;

    // 初始化富文本编辑器
    initEditor();


    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            if (res.status === 0) {
                // 使用模板引擎，把渲染的结果放到 下拉框里面
                $('select[name="cate_id"]').html(template('tpl-category', res));
                // 处理完数据，使用layui提供的办法，更新下拉框
                form.render('select');
            }
        }
    });



    var $image = $('#image');
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };
    $image.cropper(options);



    $('#chooseImage').click(function() {
        $('#file').click();
    });

    // 文件域的内容改变的时候，重置剪裁区
    $('#file').change(function() {
        // 找到文件对象，为其创建url
        var url = URL.createObjectURL(this.files[0]);
        // 销毁剪裁区，更换图片，重建剪裁区
        $image.cropper('destroy').attr('src', url).cropper(options);
    });


    var state = '';
    $('#fabu').click(function() {
        state = '已发布';
    });
    $('#caogao').click(function() {
        state = '草稿';
    });


    $('form').on('submit', function(e) {
        e.preventDefault();

        var data = new FormData(this);

        data.append('state', state);


        $image.cropper('getCroppedCanvas', {
            height: 280,
            width: 400
        }).toBlob(function(blob) {

            data.append('cover_img', blob);

            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: data,
                success: function(res) {
                    layer.msg(res.message);

                    if (res.status === 0) {
                        location.href = '/article/article.html';
                    }
                },

                processData: false,
                contentType: false
            });
        });
    })
})