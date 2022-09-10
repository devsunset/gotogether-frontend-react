import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/posts', { title, body, tags });

export const readPost = (id) => client.get(`/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  return client.get(`/posts`, {
    params: { page, username, tag },
  });
};

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = (id) => client.delete(`/posts/${id}`);
