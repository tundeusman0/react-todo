const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(res => console.log(`mongoose connected`))
  .catch(e => console.log('unable to connect', e));
