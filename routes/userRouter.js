const router = require("express").Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const auth = require('../middleware/auth')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get('/dummy', (req, res) =>{
  res.send('Create Event')
})

module.exports = router;
