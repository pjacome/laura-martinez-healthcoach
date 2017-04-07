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
    var headers = ConacatenateHeaders($('#title').val(), $('#subheading').val(), $('.datepicker').val());
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
    console.log('sections array:', sectionsArray);
    $.each(sectionsArray, function(index, element) {
        console.log(index + ': ', element);
        var id = '#' + value.id;
        var target = id + ' .paragraphs';
        sections += $(target).html();
        if(element.hasClass('images')) {
            //
        } else if($(target).hasClass('paragraphs')) {
            //
        } else if($(target).hasClass('list-js')) {
            //
        }
    });
    return sections;
}