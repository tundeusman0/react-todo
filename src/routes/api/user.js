const express = require('express');
const User = require('../../modals/user');
const auth = require('../../middleware/auth');

const router = express.Router();

//  @route api/user
//  @desc create a user
//  @access public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(406).json({ msg: 'fill all fields' });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(406).json({ msg: 'User already exist' });
  }
  try {
    const user = new User({ name, email, password });
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ msg: 'Unable to register' });
  }
});

// @route auth/user
// @desc login profile
// @access public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(406).json({ msg: 'fill up the field' });
  }
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (e) {
    return res.status(400).json({ msg: 'Not Authorized' });
  }
});

// @route auth/user
// @desc get profile
// @access private
router.get('/', auth, (req, res) => {
  res.status(200).json({ user: req.user, token: req.token });
});

// @router auth/user
// @desc update user profile
// @access Private
router.patch('/', auth, async (req, res) => {
  const { name, email } = req.body;
  const _id = req.user._id;
  if (!name || !email) {
    return res.status(406).json({ msg: 'fill the fields' });
  }
  try {
    const emailExisted = await User.findOne({ email });
    if (emailExisted) throw new Error();
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { name, email } },
      { new: true }
    );
    if (!user) {
      return res.status(409).json({ msg: 'Not a user' });
    }
    res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ msg: 'Not Authorized' });
  }
});

// @route auth/user
// @desc user delete self
// @access private
router.delete('/', auth, async (req, res) => {
  const _id = req.user._id;
  try {
    const deleted = await User.findByIdAndDelete({ _id });
    if (!deleted) {
      res.status(400).json({ msg: 'Not Authorized' });
    }
    res.status(200).json({ msg: 'success' });
  } catch (error) {
    res.status(400).json({ msg: 'Not Authorized' });
  }
});

module.exports = router;
