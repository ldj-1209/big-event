$(function() {

    var form = layui.form

    function loadList() {
        $.ajax({
            type: 'get',
            url: 'my/article/cates',
            success: function(res) {
                if (res.status === 0) {

                    var list = template('list-tpl', res)
                    $('tbody').html(list)
                }


            }
        })
    }

    loadList()


    // 点击编辑按钮事件

    var edit = null
    $('tbody').on('click', '#redact', function() {


        var id = $(this).data('id')

        $.ajax({
            type: 'get',
            url: 'my/article/cates/' + id,
            success: function(res) {

                edit = layer.open({
                    type: 1,
                    title: '编辑文章分类信息',
                    content: $('#tpl-cpl').html(),
                    area: ['500px', '250px']
                })

                form.val('editForm', res.data)
            }
        })

    })

    // 修改分类信息

    $('body').on('submit', '#edit-form', function(e) {

        e.preventDefault()
        var fd = $(this).serialize()


        $.ajax({
            type: 'post',
            url: 'my/article/updatecate',
            data: fd,
            success: function(res) {
                if (res.status === 0) {
                    loadList()
                    layer.msg('修改成功 !')

                    layer.close(edit)
                }

            }
        })
    })



    // 删除按钮事件
    $('tbody').on('click', '#del', function() {

        var id = $(this).data('id')

        $.ajax({
            type: 'get',
            url: 'my/article/deletecate/' + id,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadList()
                }
            }

        })

    })

    var addList = null
    $('#addList').click(function() {
        addList = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tpl-add').html(),
            area: ['500px', '250px']
        });
    })

    $('body').on('submit', '#add-form', function(e) {

        e.preventDefault()
        var fd = $(this).serialize()

        $.ajax({
            type: 'post',
            url: 'my/article/addcates',
            data: fd,
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadList()
                    layer.close(addList)
                }

            }
        })
    })
})