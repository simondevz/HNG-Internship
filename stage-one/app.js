const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;
  const utc_time = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!slack_name || !track) {
    res.status(400).send({
      message:
        "You must have a slack_name and track in your query params to use this endpoint",
    });
  }

  const current_day = weekday[utc_time.getUTCDay()];
  res.status(200).send({
    slack_name,
    current_day,
    utc_time: JSON.parse(JSON.stringify(utc_time)).split(".")[0] + "Z",
    track,
    github_file_url:
      "https://github.com/simondevz/HNG-Internship/blob/main/stage-one/app.js",
    github_repo_url: "https://github.com/simondevz/HNG-Internship/tree/main",
    status_code: 200,
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`app listening on port ${port}!`));
