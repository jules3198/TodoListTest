const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB congig
const db = require('./config/keys').mongoURI;
const Routes=require('./app/routes/index');


// Connect to MongoDB
mongoose
  .connect(
    db,
    {useNewUrlParser: true  }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world!'));
Routes(app);

const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app