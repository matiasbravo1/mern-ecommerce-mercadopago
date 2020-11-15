const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

require('./models/User');

require('./services/passport');

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/myRoutes')(app);
require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
