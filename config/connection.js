const { connect, connection } = require('mongoose');

connect('mongodb+srv://mongoCloud:password1234@cluster0.u0l90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
