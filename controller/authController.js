'use strict';
require('dotenv').config();

const db = require('../connection/conn'); // Koneksi ke database
const bcrypt = require('bcryptjs'); // Untuk hashing password
const jwt = require('jsonwebtoken'); // Untuk JWT token
const response = require('../response/response'); // Utilitas response
const { request } = require('express');
const { header } = require('express/lib/request');
const SECRET_KEY = process.env.SECRET_KEY;

// **Register User**
exports.registerUser = async (req, res) => {
  const { name, email, password, gender } = req.body;

  // Validasi input
  if (!name || !email || !password || !gender) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Name, email, password, and gender are required',
    });
  }

  // Validasi gender
  if (!['M', 'F'].includes(gender)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Gender must be L (Laki-laki) or P (Perempuan)',
    });
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid email format',
    });
  }

  try {
    // Periksa apakah email sudah terdaftar
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('Database error (checking email):', err);
        return res.status(500).json({
          statusCode: 500,
          message: 'Error checking email in the database',
          error: err.message,
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          statusCode: 409,
          message: 'Email already registered',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user ke database
      const insertQuery =
        'INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)';

      db.query(
        insertQuery,
        [name, email, hashedPassword, gender],
        (err, result) => {
          if (err) {
            console.error('Database error (inserting user):', err);
            return res.status(500).json({
              statusCode: 500,
              message: 'Error registering user',
            });
          }

          const userId = result.insertId; // Ambil userId dari hasil insert user

          // Insert ke tabel avatar
          const insertAvatarQuery =
            'INSERT INTO avatars (userId, exp, gold, level, health, maxHealth) VALUES (?, ?, ?, ?, ?, ?)';

          db.query(
            insertAvatarQuery,
            [userId, 0, 1000, 1, 100, 100],
            (avatarErr) => {
              if (avatarErr) {
                console.error('Database error (inserting avatar):', avatarErr);
                return res.status(500).json({
                  statusCode: 500,
                  message: 'Error registering user avatar',
                });
              }

              res.status(201).json({
                statusCode: 201,
                message: 'User registered successfully',
                data: {
                  name,
                  email,
                  gender,
                  avatar: {
                    exp: 0,
                    gold: 1000,
                    level: 1,
                    health: 100,
                    maxHealth: 100,
                  },
                },
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error('Unexpected error (register):', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Unexpected server error',
    });
  }
};

// **Login User**
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Email and password are required',
    });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database error (fetching user):', err);
      return res.status(500).json({
        statusCode: 500,
        message: 'Error fetching user',
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid email or password',
      });
    }

    const user = results[0];

    try {
      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Invalid email or password',
        });
      }

      // JWT Token
      const token = jwt.sign(
        {
          userId: user.userid,
          name: user.name,
          email: user.email,
          gender: user.gender,
        },
        SECRET_KEY,
        { expiresIn: '1d' } // Expires in 1 day
      );

      res.status(200).json({
        statusCode: 200,
        message: 'Login successful',
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Error processing login',
      });
    }
  });
};

// **Logout User**
exports.logoutUser = (req, res) => {
  // Logout endpoint instructs the client to clear its token
  res.status(200).json({
    statusCode: 200,
    message: 'User successfully logged out.',
  });
};

// **Middleware untuk Melindungi Endpoint**
exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Ambil token dari header Authorization
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Token required',
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifikasi token
    req.user = decoded; // Simpan data user ke dalam request
    next();
  } catch (err) {
    console.error('Token error:', err);
    return res.status(403).json({
      statusCode: 403,
      message: 'Invalid or expired token',
    });
  }
};

exports.cekMe = (req, res) => {
  try {
    // Data pengguna yang diautentikasi tersedia di req.user
    const user = req.user;

    // Return data pengguna
    res.status(200).json({
      statusCode: 200,
      message: 'Auth Berhasil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error('Error in cekMe:', error);
    res.status(401).json({
      statusCode: 401,
      message: 'Auth User Gagal',
    });
  }
};
