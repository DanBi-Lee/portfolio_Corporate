$(document).ready(function(){

    var url_interests = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = 'bc882020aaba3d06149d4ea4c663ceaa';

    /* 갤러리에 처음 들어왔을 때 방식에 따른 리스트 불러오기  */
    var queryString = queryStringObject()
    var search_keword = queryString.imgaeSearchBox;
    if(search_keword){
        get_flickr(url_search, key, search_keword);
    }else{
        get_flickr(url_interests, key);
    }

    /* 레이아웃 */
    var isoOptions = {
        itemSelector: '.list_image > li',
        percentPosition: true,
        masonry: {
        columnWidth: '.list_image > li'
        }
    };
    var $grid = $('.list_image').isotope( isoOptions );

    $('body').on('click', '#gallery .list_image li a', function(e){
        e.preventDefault();
        var imgSrc = $(this).attr('href');
        create_pop(imgSrc);
    });

    $('body').on('click', '.popup_image span', remove_pop);

    $('#search button').on('click', function(e){
        e.preventDefault();
        var tags = $('#search input[type=text]').val();
        if(tags){
            get_flickr(url_search, key, tags);
        }else{
            alert('검색어를 입력해주세요');
        }
        $('#search input[type=text]').val('');
    });

    function get_flickr(url, key, tags){
        $.ajax({
            url : url,
            dataType : 'json',
            data : {
                api_key : key,
                per_page : 20,
                tags : tags,
                format : 'json',
                nojsoncallback : 1,
                safe_search : 1,
                privacy_filter : 1
            }
        })
        .success(function(data){
            console.log(data);
            $('#gallery .list_image').empty();
            var item = data.photos.photo;
            $(item).each(function(){
                var farm = this.farm;
                var server = this.server;
                var imgId = this.id;
                var imgSec = this.secret;
                var tit = (function(title){
                    var STRNUM = 15;
                    if(title){
                        if(title.length < STRNUM){
                            return title;
                        }else{
                            return title.substr(0,STRNUM) + '...';
                        }
                    }else{
                        return 'nonamed'
                    }
                })(this.title);

                $('#gallery .list_image').append(
                    $('<li>')
                        .append(
                            $('<a>')
                                .attr('href', 'https://farm' + farm + '.staticflickr.com/' + server + '/' + imgId + '_' + imgSec + '_b.jpg')
                                .append(
                                    $('<img>')
                                        .attr('src', 'https://farm' + farm + '.staticflickr.com/' + server + '/' + imgId + '_' + imgSec + '_m.jpg'),
                                    $('<h2>').text(tit)
                                )
                        )
                );
            });
            $grid.isotope( 'destroy' );
            setTimeout(function(){
                $grid.isotope( isoOptions )
            }, 1000);
        })
        .error(function(){
            alert('이미지 로드에 실패했습니다.');
        });
    }

    function create_pop(imgSrc){
        $('body').append(
            $('<aside class="popup_image">')
                .append(
                    $('<img>')
                        .attr('src', imgSrc)
                        .css({
                            'width' : '100%'
                        }),
                    $('<span>').text('close')
                )
                .hide()
                .fadeIn()
        );
    }

    function remove_pop(){
        $('.popup_image').fadeOut(500,function(){
            $(this).remove();
        })
    }

    function queryStringObject(){
        var queryString = window.location.search.substr(1).split('&');
        if(queryString == ""){
            return {};
        }
        var queryStringObject = {};
        for (var i=0; i<queryString.length; i++){
            var param = queryString[i].split('=');
            var param_key = param[0];
            var param_value = param[1];
            if(param.length == 1){
                queryStringObject[param_key] = "";
            }else{
                queryStringObject[param_key] = decodeURIComponent(param_value);
            }
        }
        return queryStringObject;
    }

});