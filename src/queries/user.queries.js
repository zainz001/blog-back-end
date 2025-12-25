export const createUserQuery = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING id, name, email;
`;

export const getUserByEmailQuery = `
  SELECT * FROM users WHERE email = $1;
`;
