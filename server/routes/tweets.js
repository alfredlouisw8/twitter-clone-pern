const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//all tweets

router.get("/", authorization, async (req, res) => {
  try {
    let tweets;
    if (req.query.search) {
      tweets = await pool.query(
        "select u.user_name,u.user_email,t.tweet_id, t.description from users as u inner join tweets as t on u.user_id = t.user_id where t.description like '" +
          req.query.search +
          "%'order by t.tweet_id desc"
      );
    } else {
      tweets = await pool.query(
        "select u.user_name,u.user_email,t.tweet_id, t.description from users as u inner join tweets as t on u.user_id = t.user_id order by t.tweet_id desc"
      );
    }

    res.json(tweets.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

//create tweet

router.post("/", authorization, async (req, res) => {
  try {
    const { description } = req.body;

    if (description.length <= 240) {
      const newTweet = await pool.query(
        "INSERT INTO tweets (user_id, description) VALUES($1, $2) RETURNING tweet_id, description",
        [req.user.id, description]
      );

      res.json(newTweet.rows[0]);
    } else {
      return res.json("tweet must be under 240 characters");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//update todo

router.put("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE tweets SET description = $1 WHERE tweet_id = $2 and user_id = $3 returning *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("this tweet is not yours");
    }

    res.json("Tweet was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete todo

router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM tweets WHERE tweet_id = $1 and user_id = $2 returning *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("this tweet is not yours");
    }

    res.json("Tweet was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
