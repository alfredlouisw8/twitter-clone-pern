const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

//registering

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password)

    const { name, email, password } = req.body;

    //2. check if user exist (if exist then throw error)\

    const user = await pool.query("select * from users where user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exist");
    }

    //3. bcrypt the password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. insert new user

    const newUser = await pool.query(
      "insert into users (user_name, user_email, user_password) values ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. generating jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

//login route

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body

    const { email, password } = req.body;

    //2. check if user exist

    const user = await pool.query("select * from users where user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("password or email is incorrect");
    }

    //3. check password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("password or email is incorrect");
    }

    //4. give jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
