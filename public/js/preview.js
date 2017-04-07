/*
    preview.js
    For previewing blogs
*/

function PreviewBlog(blogContent) {
    console.log('so far so good');
    $('.preview-div .preview-content').append(blogContent.html());

    $('.preview-div').removeClass('preview-close');
    $('.preview-div').addClass('preview-expand');
}

function CloseBlog() {
    console.log('exiting');
    $('.preview-div .preview-content').empty();

    $('.preview-div').addClass('preview-close');
    $('.preview-div').removeClass('preview-expand');
}