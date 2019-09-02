const express = require('express');
const User = require('../../modals/user');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route auth/admin
// @desc admin get all users
// @access private
router.get('/', auth, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      let users = await User.find();
      if (!users) throw new Error();
      users = users.filter(user => user.isAdmin === false);
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ msg: 'No Users' });
    }
  } else {
    res.status(400).json({ msg: 'Not Authorized' });
  }
});

// @route auth/user
// @desc admin delete profile with all todos
// @accsess private
router.delete('/:id', auth, async (req, res) => {
  if (req.user.isAdmin) {
    const _id = req.params.id;
    try {
      const deleted = await User.findByIdAndDelete({ _id });
      if (!deleted) {
        res.status(400).json({ msg: 'Not Authorized' });
      }
      res.status(200).json({ msg: 'success' });
    } catch (error) {
      res.status(400).json({ msg: 'Not Authorized' });
    }
  } else {
    res.status(400).json({ msg: 'Not Authorized' });
  }
});

module.exports = router;
