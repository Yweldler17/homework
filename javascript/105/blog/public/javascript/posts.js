/* global $, io*/
(() => {
  'use strict';

  const addCommentForm = $('#addcomment');

  const addCommentButtons = $('.addcomment');
  addCommentButtons.click(e => {
    addCommentButtons.show();
    $(e.target).after(addCommentForm.show()).hide();
  });

  const commentBody = $('#commentbody');
  function endCommenting() {
    addCommentForm.hide();
    addCommentButtons.show();
    commentBody.val('');
  }

  $('#add').click(async e => {
    const postId = $(e.target).closest('.post').attr('id');
    const response = await fetch(`/addComment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: commentBody.val() })
    });

    if (response.ok) {
      endCommenting();
      const theComment = await response.json();
      console.log('Could add to ui here', theComment);
    } else {
      console.error(`${response.status} - ${response.statusText}`);
    }
  });

  $('#cancel').click(() => {
    endCommenting();
  });

  const socketIo = io();
  socketIo.on('comment', newComment => {
    $(`#${newComment.postId} .comments`).append(newComment.html);
  });

  socketIo.on('post', () => {
    blog.numPosts++;
    checkLoadMoreButton();
  });

  const postsContainer = $('#posts');
  const loadMoreButton = $('#loadmore');
  loadMoreButton.click(async () => {
    const numPostsLoaded = postsContainer.children().length;
    const response = await fetch(`/morePosts/?skip=${numPostsLoaded}`);
    if (!response.ok) {
      console.error(`${response.status} - ${response.statusText}`);
    }
    const newPosts = await response.text();
    postsContainer.append(newPosts);

    checkLoadMoreButton();
  });

  function checkLoadMoreButton() {
    const numPostsLoaded = postsContainer.children().length;
    if (numPostsLoaded === blog.numPosts) {
      loadMoreButton.prop('disabled', true);
    } else {
      loadMoreButton.prop('disabled', false);
    }
  }

  checkLoadMoreButton();
})();