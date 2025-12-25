import * as postService from '../services/post.service.js';

export const create = async (req, res) => {
  try {
    const post = await postService.createPost([
      req.body.title,
      req.body.content,
      req.user.id
    ]);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (_, res) => {
  try {
    res.json(await postService.getAllPosts());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    res.json(await postService.getPostById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    res.json(
      await postService.updatePost([
        req.body.title,
        req.body.content,
        req.params.id,
        req.user.id
      ])
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await postService.deletePost(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
