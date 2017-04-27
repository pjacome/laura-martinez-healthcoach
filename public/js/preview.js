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
    //window.setTimeout(FixImageOrientation, 1000);
    window.setTimeout(function() {
        $('.preview-div').removeClass('preview-close');
        $('.preview-div').addClass('preview-expand');
        previewIsOpen = true;
    }, 2000);

    //$('.preview-div').removeClass('preview-close');
    //$('.preview-div').addClass('preview-expand');
    //previewIsOpen = true;
}

/**
 *  CloseBlog
 *  Closes the preview
 */
function CloseBlog() {
    $('.preview-sections').empty();

    $('.preview-div').addClass('preview-close');
    $('.preview-div').removeClass('preview-expand');
    previewIsOpen = false;
}

/**
 *  ConcatenateHeaders
 *  Appends the HTML before the sections. So the title, subheading,
 *  date, and main image
 */
function ConcatenateHeaders() {
    $('#preview-date').html($('.datepicker').val());
    $('#preview-title').html($('#title').val());
    $('#preview-subheading').html($('#subheading').val());
}

/**
 *  ConcatenateSections
 *  Appends the sections. So the paragraphs, images, and lists that are
 *  dynamically added by the admin
 *  @param sectionsArray - Array[Strings] where each string is HTML content
 */
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

            // append section
            sections += '<div id="image-wrapper-' + idNumber + '" class="div-wrapping-sections-img center"></div>'
            SectionsImagePreview(input[0], idNumber);
            setTimeout(FixImageOrientation2('#blog-image-' + idNumber), 500);
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

/**
 *  ReadURL
 *  Reads the main file input and displays it
 *  @param input - Very first input of the secionts.
 *                 Also considered, section[0]
 */
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
            var str = '<img id="blog-image-'+number+'" class="scale" src="'+e.target.result+'">';
            $('#image-wrapper-' + number).append(str);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 *  FixImageOrientation
 *  Fixes the Orientation of the photos that are served in the incorrect orientation
 */
function FixImageOrientation() {
    // fix rotation/orientation of image
    var imageWrappers = $('.preview-sections').children('.div-wrapping-sections-img');
    var l = imageWrappers.length;
    console.log('1:', l);
    $.each(imageWrappers, function (index, imageWrapper) {
        var number = imageWrapper.id.split('-')[2];
        var image = $('#blog-image-' + number)[0];
        console.log('2a:', $('#blog-image-' + number));
        console.log('2b:', image);
        EXIF.getData(image, function() {
            console.log('3');
            var orientation = EXIF.getTag(this, 'Orientation');
            switch(orientation) {
                case 6:
                    console.log('4: case 6');
                    $(this).addClass('rotate90');
                    break;
            }
            console.log('5');
        });
        console.log('6');
    });
    console.log('7');
}

function FixImageOrientation2(id) {
    var image = $(id)[0];
    console.log('1a:', $(id));
    console.log('1b:', image);
    EXIF.getData(image, function () {
        console.log('2');
        var orientation = EXIF.getTag(this, 'Orientation');
        switch (orientation) {
            case 6:
                console.log('3: case 6');
                $(this).addClass('rotate90');
                break;
        }
        console.log('4');
    });
    console.log('5');
}

/**
 *  FixWidth
 *  Fixes the width of <ul> lists and <ol> lists so that the lists are
 *  centered based on the longest string in the list
 */
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