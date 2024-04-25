const jwt = require('jsonwebtoken');

const users = [
  { username: 'admin', password: 'admin123' }
];

const Login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
  return res.json({ token });
};

module.exports = {
  Login,
};