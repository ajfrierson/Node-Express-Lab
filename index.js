const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

const PORT = 3000;

const sendUserError = (status, message, res) => {
    res.status(status).json({errorMessage: message
    });
    return;
}

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." 
    });
    return;
  });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(id).then(posts => {
        res.status(400).json(posts)
    }).catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist."
    });
    return;
  });
});



// Listen
server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));