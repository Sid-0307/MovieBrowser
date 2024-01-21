require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

const port = 3001;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.AUTH_TOKEN,
  },
};

app.get("/popular", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.get("/trending", (req, res) => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.get("/upcoming", (req, res) => {
  console.log("hi");
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    })
    .catch((err) => console.error("error:" + err));
});

app.post("/search", (req, res) => {
  console.log(req.body);
  const name = req.body.movie;
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.post("/genre", (req, res) => {
  console.log(req.body);
  const genre = req.body.genre;
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
