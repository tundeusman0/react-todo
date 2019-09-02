const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/api/user');
const adminRouter = require('./routes/api/admin');

const app = express();

// enable json
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
// test default route
app.get('*', (req, res) => {
  res.status(200).json({
    msg: 'it works well'
  });
});

// default port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
