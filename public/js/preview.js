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

    /*window.setTimeout(function() {
        $('.preview-div').removeClass('preview-close');
        $('.preview-div').addClass('preview-expand');
        previewIsOpen = true;
    }, 2000);*/

    $('.preview-div').removeClass('preview-close');
    $('.preview-div').addClass('preview-expand');
    previewIsOpen = true;
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
            var str = '<img id="testID" class="scale" src="'+e.target.result+'">';
            $('#image-wrapper-' + number).append(str);

            // fix rotation/orientation of image
            console.log('1');
            var imgTest = document.getElementById('testID');
            console.log('2', imgTest);
            EXIF.getData(imgTest, function() {
                console.log('3', this);
                //var exif = EXIF.readFromBinaryFile(new BinaryFile(this));
                var exif = EXIF.getTag(this, 'Orientation');
                console.log('4');
                switch (exif) {
                    case 2:
                        alert('rotate 2');
                        break;
                    case 3:
                        alert('rotate 3');
                        break;
                    case 4:
                        alert('rotate 4');
                        break;
                    case 5:
                        alert('rotate 5');
                        break;
                    case 6:
                        console.log(exif.pretty);
                        this.rotate(0.5 * Math.PI);
                        break;
                    case 7:
                        alert('rotate 7');
                        break;
                    case 8:
                        alert('rotate 8');
                        break;
                }
                console.log('5');
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
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