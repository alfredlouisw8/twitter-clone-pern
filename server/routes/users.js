const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "select user_email,user_name from users where user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

router.get("/tweets", authorization, async (req, res) => {
  try {
    const tweets = await pool.query(
      "select u.user_name, u.user_email,t.tweet_id, t.description from tweets as t inner join users as u on u.user_id = t.user_id where u.user_id = $1 order by t.tweet_id desc",
      [req.user.id]
    );

    res.json(tweets.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
