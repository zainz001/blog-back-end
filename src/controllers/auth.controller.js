import * as authService from '../services/auth.service.js';
export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const data = await authService.loginUser(req.body);
  res.json(data);
};
