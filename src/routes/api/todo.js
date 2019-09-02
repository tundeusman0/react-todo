const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route auth/todo
// @desc add a todo
// @access private
router.post('/', auth, async (req, res) => {
  const { completed, description } = req.body;
  if (!completed || !description) {
    return res.status(406).json({ msg: 'fill all' });
  }
  try {
  } catch (error) {}
});

// @route auth/todo
// @desc get all todo
// @access private

// @route auth/todo
// @desc edit a todo
// @access private

// @route auth/todo
// @desc delete a todo
// @access private

module.exports = router;
