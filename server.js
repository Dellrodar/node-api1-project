const express = require('express');
const cors = require('cors');

const db = require('./database');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
	res.json({ message: 'Unit 4 Module 1 api project 1' });
});

server.get('/api/users', (req, res) => {
	const users = db.getUsers();
	try {
		res.json(users);
	} catch {
		res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrieved.' });
	}
});

server.post('/api/users', (req, res) => {
	const newUser = db.createUser({
		name: req.body.name,
		bio: req.body.bio,
	});
	try {
		if (newUser) {
			return res.status(201).json(newUser);
		}
		return res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} catch {
		status(500).json({
			errorMessage: 'There was an error while saving the user to the database',
		});
	}
});

server.get('/api/users/:id', (req, res) => {
	const user = db.getUserById(req.params.id);
	try {
		if (!user) {
			return res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
		}
		return res.json(user);
	} catch {
		res
			.status(500)
			.json({ errorMessage: 'The user information could not be retrieved.' });
	}
});

server.delete('/api/users/:id', (req, res) => {
	const user = db.getUserById(req.params.id);
	try {
		if (user) {
			db.deleteUser(req.params.id);
			return res.status(204).end();
		}
		return res
			.status(404)
			.json({ message: 'The user with the specified ID does not exist.' });
	} catch (error) {
		return res
			.status(500)
			.json({ errorMessage: 'The user information could not be retrieved.' });
	}
});

server.put('/api/users/:id', (req, res) => {
	const user = db.getUserById(req.params.id);
	try {
		if (!req.body.name || !req.body.bio) {
			return res
				.status(400)
				.json({ errorMessage: 'Please provide name and bio for the user.' });
		}
		if (user) {
			db.updateUser(user.id, {
				name: req.body.name || user.name,
				bio: req.body.bio || user.bio,
			});
			return res.status(200).json({ message: 'The user has been Updated!' });
		}
		return res.status(404).json({ message: 'The user cannot be found' });
	} catch {
		res
			.status(500)
			.json({ errorMessage: 'The user information could not be modified.' });
	}
});

server.listen(8080, () => {
	console.log('Server started on port 8080');
});
