export const createPostQuery = `
  INSERT INTO posts (title, content, author_id)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

export const getAllPostsQuery = `
  SELECT posts.*, users.name AS author_name
  FROM posts
  JOIN users ON posts.author_id = users.id
  ORDER BY created_at DESC;
`;

export const getPostByIdQuery = `
  SELECT posts.*, users.name AS author_name
  FROM posts
  JOIN users ON posts.author_id = users.id
  WHERE posts.id = $1;
`;

export const updatePostQuery = `
  UPDATE posts
  SET title = $1, content = $2, updated_at = NOW()
  WHERE id = $3 AND author_id = $4
  RETURNING *;
`;

export const deletePostQuery = `
  DELETE FROM posts WHERE id = $1 AND author_id = $2;
`;
