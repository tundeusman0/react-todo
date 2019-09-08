const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routes/api/user');
const adminRouter = require('./routes/api/admin');
const todoRouter = require('./routes/api/todo');

const app = express();
// enable cors
app.use(cors());
// enable json
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/todo', todoRouter);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  // load unwanted route here
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// default port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
