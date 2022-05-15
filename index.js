const express = require("express"); // express 모듈 가져오기
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User"); // 유저 가져오기

const config = require("./config/key");
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      succes: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
