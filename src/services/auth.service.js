import { pool } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import {
  createUserQuery,
  getUserByEmailQuery
} from '../queries/user.queries.js';

export const registerUser = async ({ name, email, password }) => {
  try {
    const hashed = await hashPassword(password);

    const { rows } = await pool.query(createUserQuery, [
      name,
      email,
      hashed,
    ]);

    return rows[0];
  } catch (err) {
    // PostgreSQL unique violation
    if (err.code === '23505') {
      const error = new Error('Email already registered');
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};


export const loginUser = async ({ email, password }) => {
  const { rows } = await pool.query(getUserByEmailQuery, [email]);
  const user = rows[0];

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id });
  return { token, user };
};
