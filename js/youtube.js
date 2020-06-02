$(document).ready(function(){

    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var key = 'AIzaSyCJUOT6XedzBAxos5ldGeg01er_5mg5DyA';
    var playlistId = 'PLkHGKpEnuEu9XVIinaydA6cVecKV5J7Ci';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 15,
        playlistId: playlistId
    };

    load_youtube();

    $('body').on('click','#video .list > li',function(e){
        e.preventDefault();
        var vid_id = $(this).find('a').attr('href');
        create_pop(vid_id);
    });
    
    $('body').on('click','.pop span', function(){
        $('.pop').remove();
    })

    function load_youtube(){
        $.ajax({
            url : URL,
            dataType : 'jsonp',
            data : options      
        })
        .success(function(data){
            create_list(data);
        })
        .error(function(){
            alert('Fail to load Youtube data!!');
        })
    }

    function create_list(data){
        $(data.items).each(function(index, item){
            var title = item.snippet.title;
            var thumb = item.snippet.thumbnails.standard.url;
            var vid_id = item.snippet.resourceId.videoId;
            var svg = '<svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>';
    
            $('#video .list')
                .append(
                    $('<li>')
                        .append(
                            $('<a>')
                                .attr('href', vid_id)
                                .append(
                                    $('<img>').attr('src', thumb),
                                    $('<div class="contents">')
                                        .append(
                                            $('<div class="svg">').html(svg),
                                            $('<h2 class="title">').text(title)
                                        )
                                )
                        )
                );
        });
    }

    function create_pop(vid_id){
        $('body').append(
            $('<aside class="pop">')
                .css({
                    width:1000, padding:60, boxSizing:'border-box', position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:4, backgroundColor:'#000'
                })
                .append(
                    $('<iframe>')
                        .attr({
                            width:'100%', height:600, src:'https://www.youtube.com/embed/'+vid_id,
                            frameborder:0, allowfullscreen:true
                        }),
    
                    $('<span>').text('close').css({
                        fontSize:12, color:'#fff', position:'absolute', top:20, right:20
                    })
                )
        )
    }

});