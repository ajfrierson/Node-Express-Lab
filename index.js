// const express = require('express');
// const db = require('./data/db.js');
// const cors = require('cors');

// const server = express();
// server.use(express.json());
// server.use(cors());

// const PORT = 3000;

// const sendUserError = (status, message, res) => {
//     res.status(status).json({errorMessage: message
//     });
//     return;
// }



// // Listen
// server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

// module.exports = server;

// const server = require('./server.js');
// const PORT = 3000;

// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}...`);
// });

const server = require('./server.js');
const portNumber = process.env.PORT || 4000;

server.listen(portNumber, () => {
    console.log(`\n*** Server Running on http://localhost:${portNumber} ***\n`);
  });
