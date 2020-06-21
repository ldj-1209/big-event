$(function() {
    // 
    var form = layui.form;
    var laypage = layui.laypage;
    form.render('select');


    let data = {
        pagenum: 1,
        pagesize: 3,
        // cate_id: 
        // state: 
    };

    renderArticle();

    function renderArticle() {
        $.ajax({
            url: '/my/article/list',
            data: data,
            success: function(res) {
                if (res.status === 0) {
                    $('tbody').html(template('tpl-article', res));
                }

                mypage(res.total);
            }
        });
    }


    // -------------- 实现分页 --------------------------------
    function mypage(t) {
        laypage.render({
            elem: 'page',
            count: t,
            limit: data.pagesize,
            limits: [data.pagesize, 8, 10, 15],
            curr: data.pagenum,
            layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'],
            jump: function(obj, first) {

                if (first === undefined) {
                    data.pagenum = obj.curr;
                    data.pagesize = obj.limit;
                    renderArticle();
                }
            }
        });
    }

    $.ajax({
        url: '/my/article/cates',
        success: function(res) {
            var str = template('tpl-category', res);
            $('#category').html(str);

            form.render('select');
        }
    });

    $('#search-form').on('submit', function(e) {
        e.preventDefault();

        var cate_id = $('#category').val();
        var state = $('select[name="state"]').val();

        data.pagenum = 1;

        if (cate_id) {
            data.cate_id = cate_id;
        } else {
            delete data.cate_id;
        }

        if (state) {
            data.state = state;
        } else {
            delete data.state;
        }

        renderArticle();
    })


    $('body').on('click', '.delete', function() {
        let id = $(this).attr('data-id');

        layer.confirm('是否要删除？', function(index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function(res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderArticle();
                    }
                }
            });

            layer.close(index);
        });
    })


    template.defaults.imports.formatDate = function(val) {
        var d = new Date(val);
        var year = d.getFullYear();
        var month = addZero(d.getMonth() + 1);
        var day = addZero(d.getDate());
        var hour = addZero(d.getHours());
        var minutes = addZero(d.getMinutes());
        var seconds = addZero(d.getSeconds());
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }

    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }
});