const express = require("express");
const userApi = express.Router();

const users = [
  {
    id: 1,
    firstName: "Laurent",
    lastName: "Bajrami",
    email: "laurent@hotmail.com",
    password: "1234",
  },
  {
    id: 2,
    firstName: "Henrik",
    lastName: "Braathen",
    email: "henrik@hotmail.com",
    password: "1234",
  },
];

userApi.get("", (req, res) => {
  console.log(users);
  res.json(users);
});

userApi.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((b) => b.id === id);
  console.log({ user });
  res.json(user);
});

userApi.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((b) => b.id === id);
  const { firstName, lastName, email, password } = req.body;
  users[userIndex] = { firstName, lastName, email, password, id };
  res.status(200).end();
});

userApi.post("", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  users.push({ firstName, lastName, email, password, id: users.length + 1 });
  res.status(201).end();
});

module.exports = userApi;
