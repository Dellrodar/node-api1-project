const express = require("express")

const db = require("./database")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.json({ message: "Unit 4 Module 1 api project 1" })
})

server.get("/api/users", (req, res) => {
  const users = db.getUsers()
  res.json(users);
})

server.post("api/users", (req, res) =>{
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  })
  res.status(201).json(newUser)
})

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id,
  const user = db.getUserById(id)

  if (user) {
    req.json(user)
  } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})

