// routes/users.js
var express = require('express');
var router = express.Router();
const usersData = require('../data/usersData'); // Import the users data

// API endpoint to get users with pagination, sorting, and record length
router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || 'id';
  const length = parseInt(req.query.length) || usersData.length;

  const startIndex = (page - 1) * length;
  const endIndex = startIndex + length;
  const sortedUsers = usersData.slice().sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a[sort] - b[sort];
  });

  const selectedUsers = sortedUsers.slice(startIndex, endIndex);

  // Render the users.pug view and pass the users data to it
  res.render('users', { users: selectedUsers });
});

module.exports = router;
