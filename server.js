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

server.post("/api/users", (req, res) =>{
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  })
  if (newUser) {
  res.status(201).json(newUser)
  } else {
    status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  }
})

server.get("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})

server.delete("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    db.deleteUser(req.params.id)
    res.status(204).end()
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist." })
  }
})

 server.put("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id)
  if (user) {
    db.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio,
    })
    res.status(200).json({message: "The user has been Updated!"})
  }
 })

 server.listen(8080, () =>{
  console.log("Server started on port 8080")
})
