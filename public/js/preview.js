/*
    preview.js
    For previewing blogs
*/

$(document).keyup(function (e) {
    if(previewIsOpen && e.keyCode === 27) {
        CloseBlog();
    }
});

function PreviewBlog(blogContent) {
    var headers = ConcatenateHeaders($('#title').val(), $('#subheading').val(), $('.datepicker').val());
    var sectionsArray = blogContent.children('.sections');
    var sampleBlogText = ConcatenateSections(sectionsArray);


    $('.preview-div .preview-content').append(sampleBlogText);



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
    return title + subheading + date;
}

function ConcatenateSections(sectionsArray) {
    console.log('Length:',sectionsArray.length);
    if(sectionsArray.length === 0) {
        return 'Nothing to display';
    }

    var sections = '';
    var target = '';
    console.log('sections array:', sectionsArray);
    $.each(sectionsArray, function(index, element) {
        console.log(index + ': ', element);
        var id = '#' + element.id;
        var temp1 = id + ' .paragraphs',
            temp2 = id + ' .list-js';
        if($(id).hasClass('images')) {
            console.log('images class found', id);
            //target = id + ' .paragraphs';
        } else if($(temp1).hasClass('paragraphs')) {
            console.log('paragraphs class found', id);
            target = id + ' .paragraphs';
        } else if($(temp2).hasClass('list-js')) {
            console.log('list-js class found', id);
            target = id + ' .list-js';
        }
        sections += $(target).html();
    });
    return sections;
}