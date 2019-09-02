const User = require('../modals/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(406).json({ msg: 'Not authorized' });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(409).json({ msg: 'Not authorized' });
    }
    const user = await User.findById({ _id: decoded._id });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Not authorized' });
  }
};

module.exports = auth;
