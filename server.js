// const express = require('express');

// const postsRouter = require('/seeds/posts-router.js');

// const server = express();

// server.use(express.json());

// server.use('/api/posts', postsRouter);

// server.get('/', async (req, res) => {
//     res.send(`
//       <h2>Lambda Hubs API</h>
//       <p>Welcome to the Lambda Hubs API</p>
//     `);
//   });


// modules.exports = server;

//Basic structure of a server
const express = require('express');

// const Hubs = require('./hubs/hubs-model.js');
const postsRouter = require('./router/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

// server.get('/', async (req, res) => {
//   res.send(`
//     <h2>Lambda Hubs API</h>
//     <p>Welcome to the Lambda Hubs API</p>
//   `);
// });


// export default server; ES6
module.exports = server;

