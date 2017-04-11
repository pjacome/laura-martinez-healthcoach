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
    var mainImage = ReadURL($('#main-image')[0]);
    ConcatenateHeaders();

    var sectionsArray = blogContent.children('.sections');
    var sampleBlogText = ConcatenateSections(sectionsArray);
    $('.preview-sections').append(sampleBlogText);
    FixWidth();


    $('.preview-div').removeClass('preview-close');
    $('.preview-div').addClass('preview-expand');
    previewIsOpen = true;
}

function CloseBlog() {
    $('.preview-sections').empty();

    $('.preview-div').addClass('preview-close');
    $('.preview-div').removeClass('preview-expand');
    previewIsOpen = false;
}

function ConcatenateHeaders() {
    $('#preview-date').html($('.datepicker').val());
    $('#preview-title').html($('#title').val());
    $('#preview-subheading').html($('#subheading').val());
}

function ConcatenateSections(sectionsArray) {
    if(sectionsArray.length === 0) {
        return 'No body to display.';
    }

    var sections = '';
    var target = '';
    $.each(sectionsArray, function(index, element) {
        var id = '#' + element.id;
        var temp1 = id + ' .paragraphs',
            temp2 = id + ' .list-js';
        if($(id).hasClass('images')) {
            console.log('images class found', id);
            var input = $(id + ' .btn input');
            var idNumber = parseInt(element.id.split('-')[1]);
            sections += '<div id="image-wrapper-' + idNumber + '" class="div-wrapping-sections-img center"></div>'
            SectionsImagePreview(input[0], idNumber);
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

function ReadURL(input) {
    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#main-img-holder').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function SectionsImagePreview(input, number) {
    if(input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var str = '<img class="scale" src="'+e.target.result+'">';
            $('#image-wrapper-'+number).append(str);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function FixWidth() {
    var listsArray = $('.preview-content.container  .list-wrapper').children('.preview-list');
    $.each(listsArray, function(index, value) {
        var maxWidth = 0;
        $.each($(value).children('li'), function(index, li) {
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