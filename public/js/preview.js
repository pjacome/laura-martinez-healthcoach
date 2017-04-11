/*
    preview.js
    For previewing blogs
*/

$(document).keyup(function(e) {
    if(previewIsOpen && e.keyCode === 27) {
        CloseBlog();
    }
});

function PreviewBlog(blogContent) {
    var headers = ConcatenateHeaders($('#title').val(), $('#subheading').val(), $('.datepicker').val());
    var sectionsArray = blogContent.children('.sections');
    var sampleBlogText = ConcatenateSections(sectionsArray);

    $('.preview-div .preview-content').append(headers);
    $('.preview-div .preview-content').append(sampleBlogText);
    FixWidth();


    $('.preview-div').removeClass('preview-close');
    $('.preview-div').addClass('preview-expand');
    previewIsOpen = true;
}

function CloseBlog() {
    $('.preview-div .preview-content').empty();

    $('.preview-div').addClass('preview-close');
    $('.preview-div').removeClass('preview-expand');
    previewIsOpen = false;
}

function ConcatenateHeaders(title, subheading, date) {
    var titleString = '<h3 class="lmhc-main-title-font">' + title + '</h3>';
    var subheadingString = (subheading) ? '<h5 class="center grey-text" style="width: 80%; margin: 0 auto;">' + subheading + '</h5>' : '';
    var dateString = '<h6><i class="grey-text" style="position: absolute; bottom: 0; right: 0;">' + date + '</i></h6>';
    var wrapper = '' +
        '<div class="center" style="position: relative;">' +
            dateString +
            titleString +
            subheadingString +
        '</div>';
    return wrapper;
}

function ConcatenateSections(sectionsArray) {
    if(sectionsArray.length === 0) {
        return 'Nothing to display';
    }

    var sections = '';
    var target = '';
    $.each(sectionsArray, function(index, element) {
        var id = '#' + element.id;
        var temp1 = id + ' .paragraphs',
            temp2 = id + ' .list-js';
        if($(id).hasClass('images')) {
            console.log('images class found', id);
            // special case
        } else if($(temp1).hasClass('paragraphs')) {
            target = id + ' .paragraphs';
            sections += '<p>' + $(target).html() + '</p>';
        } else if($(temp2).hasClass('list-js')) {
            target = id + ' .list-js';
            var listID = $(temp2)[0].id.split('-');
            var typeOfList = listID[0] + '-' + listID[1]
            if(typeOfList === 'numbered-list') {
                sections += '' +
                    '<hr>' +
                    '<div class="list-wrapper">' +
                        '<ol class="browser-default preview-list">' +
                            $(target).html() +
                        '</ol>' +
                    '</div>' +
                    '<hr>';
            } else if(typeOfList === 'bullet-list') {
                sections += '' +
                    '<hr>' +
                    '<div class="list-wrapper">' +
                        '<ul class="browser-default preview-list">' +
                            $(target).html() +
                        '</ul>' +
                    '</div>' +
                    '<hr>';
            }
        }
    });
    return sections;
}

function FixWidth() {
    var listsArray = $('.preview-content.container > .list-wrapper').children('.preview-list');
    $.each(listsArray, function(index, value) {
        var maxWidth = 0;
        $.each($(value).children('li'), function(index, li) {
            var length = $(li).html().length;
            if(maxWidth < length)
                maxWidth = length;

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.font = '24px Roboto, sans-serif';
            var li_width = ctx.measureText($(li).html()).width;
            if(maxWidth < li_width)
                maxWidth = li_width;
        });
        var ulWidth = $(value).css('width').split('px');
        var currentWidth = parseInt(ulWidth[0]);
        if(maxWidth > currentWidth)
            $(value).css('width', (40+maxWidth+40) + 'px');
    });
}