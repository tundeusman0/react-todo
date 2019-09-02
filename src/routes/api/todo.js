const express = require('express');
const auth = require('../../middleware/auth');
const Todo = require('../../modals/todos');

const router = express.Router();

// @route auth/todo
// @desc add a todo
// @access private
router.post('/', auth, async (req, res) => {
  const { completed, description } = req.body;
  if (!completed || !description) {
    return res.status(406).json({ msg: 'fill all fields' });
  }
  try {
    const todo = new Todo({ ...req.body, createdBy: req.user._id });
    await todo.save();
    res.status(201).json({ todo });
  } catch (error) {
    return res.status(400).json({ msg: 'Todo not created' });
  }
});

// @route auth/todo
// @desc get all todo
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ createdBy: req.user.id });
    if (!todos) {
      return res.status(405).json({ msg: 'no todos' });
    }
    if (todos.length === 0) {
      return res.status(406).json({ msg: 'You have no Todo' });
    }
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json({ msg: 'no todos' });
  }
});

// @route auth/todo
// @desc edit a todo
// @access private
router.patch('/:id', auth, async (req, res) => {
  const { description, completed } = req.body;
  if (!description || !completed) {
    return res.status(406).json({ msg: 'fill all fields' });
  }
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id
      },
      { $set: { description, completed } },
      { new: true }
    );
    if (!todo) throw new Error();
    res.status(200).json({ todo });
  } catch (error) {
    res.status(400).json({ msg: 'todo not updated' });
  }
});

// @route auth/todo
// @desc delete a todo
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    if (!deleted) throw new Error();
    res.status(200).json({ deleted });
  } catch (error) {
    res.status(400).json({ msg: 'todo not deleted' });
  }
});

module.exports = router;
