// const express = requires('express');

// const Posts = require('./seeds/posts.js');

// const router = express.Router();

// const server = express();
// server.use(express.json());
// server.use(cors());

// const PORT = 3000;

// const sendUserError = (status, message, res) => {
//     res.status(status).json({errorMessage: message
//     });
//     return;
// }

// server.get('/api/posts', async (req, res) => {
//     try {
//       const posts = await db.find();
//       res.status(200).json(posts);
//     } catch (error) {
//       res.status(500).json({ message: " error: 'The posts information could not be retrieved'", error: error });
//     }
//   });

//   server.get('/api/posts/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     try {
//       let foundPostId = await db.findById(id);
//       {
//         foundPostId.length
//           ? res.status(200).json(foundPostId)
//           : res.status(404).json({ error: 'The post with the specified ID does not exist.' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'The post information could not be retrieved.' });
//     }
//   });

// server.post('/api/posts/', async (req, res) => {
// console.log(req.body);
// const userPostData = req.body;
// if(!userPostData.title || !userPostData.content) {
//     res.status(400).json({errorMessage: "Please provide the title and contents for the post."});
// } else {
//   try {
//     const newPost = await db.insert(userPostData);
//     res.status(201).json(newPost);
//   } catch(err) {
//     console.log("There was an error while saving the post to the database. The error is , error");
//     res.status(500).json({error: "There was an error while saving the post to the database. The error is, error"});
//  }
// }
// });

// server.delete('/api/posts/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     db.remove(id)
//     .then(deletedPost => {
//       deletedPost
//         ? res.status(202).json({message: "Post removed"})
//         : res.status(404).json({message: "The post with the specified ID does not exist."});
//     })
//     .catch(err => {
//         res.status(500).json({error: "The post could not be removed."});
//     });
//   });

// server.put('/api/posts/:id', async (req, res) => {
// try {
//   const { id } = req.params;
//   const changes = req.body;

//   if(!changes.title || !changes.content){
//       res.status(400).json({errorMessage: "Please provide the title and contents for the post"});
//   } else {
//     const foundPost = await db.findById(id);
//     if(!foundPost) {
//        res.status(404).json({message: "The post with the specified ID does not exist."});
//     } else {
//       const count = await db.update(id, changes);
//       res.status(200).json({message: `${count} users updated`});
//     }
//   }
// }
// catch (error) {
//     res.status(500).json({messag: "The post could not be updated."});
//   }
// });


// // Listen
// server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));


//Basic structure of a router; but needs to live inside of a main server.
const express = require('express');

const router = express.Router();
const db = require('../data/db.js');

router.get('/', async (req, res) => {
    try {
      const posts = await db.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: " error: 'The posts information could not be retrieved'", error: error });
    }
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      let foundPostId = await db.findById(id);
      {
        foundPostId.length
          ? res.status(200).json(foundPostId)
          : res.status(404).json({ error: 'The post with the specified ID does not exist.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
  });

router.post('/', async (req, res) => {
console.log(req.body);
const userPostData = req.body;
if(!userPostData.title || !userPostData.contents) {
    res.status(400).json({errorMessage: "Please provide the title and contents for the post."});
} else {
  try {
    const newPost = await db.insert(userPostData);
    res.status(201).json(newPost);
  } catch(err) {
    console.log("There was an error while saving the post to the database. The error is , error");
    res.status(500).json({error: "There was an error while saving the post to the database. The error is, error"});
 }
}
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);

    db.findById(id).then(postToDelete => {
      if(postToDelete.length) {
        db.remove(id)
          .then(deletedPost => {
            deletedPost
              ? res.status(200).json(postToDelete[0])
              : res.status(500).json({error: "The post could not be removed."});
          })
          .catch(err => {
              res.status(500).json({error: "The post could not be removed."});
          });
  
      } else {
        res.status(404).json({message: "Nothing to delete."});
      }
    });
    
  });

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const foundPost = await db.findById(id);
    if(!foundPost) {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    } else {
      const count = await db.update(id, changes);
      if(count) {
        const updatedPost = await db.findById(id);
        if(updatedPost.length) {
          res.status(200).json(updatedPost[0]);
        } else {
          res.status(500).json({message: "The post was updated but could not retrieve data."});  
        }
      } else {
        res.status(500).json({message: "The post could not be updated."});
      }
      res.status(200).json({message: `${count} users updated`});
    }
  } catch(error) {
    res.status(500).json({message: "The post could not be updated."});

  }


// try {
//   const { id } = req.params;
//   const changes = req.body;

//   if(!changes.title || !changes.contents){
//       res.status(400).json({errorMessage: "Please provide the title and contents for the post"});
//   } else {
//     const foundPost = await db.findById(id);
//     if(!foundPost) {
//        res.status(404).json({message: "The post with the specified ID does not exist."});
//     } else {
//       const count = await db.update(id, changes);
//       res.status(200).json({message: `${count} users updated`});
//     }
//   }
// }
// catch (error) {
//     res.status(500).json({message: "The post could not be updated."});
//   }
});


module.exports = router;