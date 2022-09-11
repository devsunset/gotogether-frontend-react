import api from './api';
import Common from './common.js';

// Post
const getPostList = (page, size, reqData) => {
  return api.post('/post/list?page=' + page + '&size=' + size, reqData);
};

const getPost = (postId) => {
  return api.get('/post/' + postId);
};

const setPost = (reqData) => {
  return api.post('/post/', Common.preRequestHandler(reqData));
};

const putPost = (postId, reqData) => {
  return api.put('/post/' + postId, Common.preRequestHandler(reqData));
};

const deletePost = (postId) => {
  return api.delete('/post/' + postId);
};

const changePostCategory = (postId) => {
  return api.put('/post/changecategory/' + postId);
};

// PostComment
const getPostCommentList = (postId) => {
  return api.get('/postcomment/list/' + postId);
};

const deletePostComment = (postCommentId) => {
  return api.delete('/postcomment/' + postCommentId);
};

const setPostComment = (reqData) => {
  return api.post('/postcomment/', Common.preRequestHandler(reqData));
};

const PostService = {
  getPostList,
  getPost,
  setPost,
  putPost,
  deletePost,
  changePostCategory,
  getPostCommentList,
  deletePostComment,
  setPostComment,
};

export default PostService;
