import { pool } from '../config/db.js';
import * as queries from '../queries/post.queries.js';

export const createPost = async (data) => {
  try {
    return (await pool.query(queries.createPostQuery, data)).rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    return (await pool.query(queries.getAllPostsQuery)).rows;
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    return (await pool.query(queries.getPostByIdQuery, [id])).rows[0];
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (data) => {
  try {
    const [title, content, postId, userId] = data;

    const result = await pool.query(queries.updatePostQuery, [title, content, postId, userId]);

    if (result.rows.length === 0) {
      throw new Error('You are not allowed to edit this post or post does not exist');
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id, userId) => {
  try {
    return pool.query(queries.deletePostQuery, [id, userId]);
  } catch (error) {
    throw error;
  }
};
