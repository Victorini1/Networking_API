const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('posts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};

//update a user
const UpdateSingleUser = async (req, res) => {
try{
  User.findOneAndUpdate( 
    const updatedUser =
    { _id: req.params.userId},
    {$set: req.body},
    {runValidators: true, new: true});
    res.json(updatedUser)
}
}

 const deleteUser = async (req, res) => {
   try{
     const dele
   }
 }   
