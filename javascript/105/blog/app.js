const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

let posts;
(async () => {
  await client.connect();
  const db = client.db('blogs');
  posts = db.collection('posts');
})().catch(err => console.error(err));

app.locals.title = 'PCS MERN Blog'

app.get('/', async (req, res, next) => {
  const thePosts = await posts.find().toArray();
  res.render('layout', {
    subtitle: 'Blog Posts',
    links: [{ url: '/addPost', name: 'add post' }],
    posts: thePosts,
    partials: {
      content: 'postPage',
      posts: 'posts',
      comments: 'comments'
    },
  });
});

app.route('/addPost')
  .get((req, res, next) => {
    res.render('layout', {
      subtitle: 'Add Post',
      links: [{ url: '/', name: 'home' }],
      partials: { content: 'addPost' }
    });
  })
  .post(async (req, res, next) => {
    const post = {
      title: req.body.title,
      body: req.body.body,
      date: new Date(),
      author: 'me'
    };

    await posts.insertOne(post);
    res.redirect('/');

    socketIo.emit('post');
  });

app.post('/addComment/:id', async (req, res, next) => {
  const newComment = {
    body: req.body.body,
    author: req.user,
    date: new Date()
  };

  await posts.updateOne(
    { _id: mongo.ObjectId(req.params.id) },
    {
      $push: {
        comments: newComment
      }
    }
  );

  newComment.date = newComment.date.toLocaleString();
  res.render('comments', { comments: [newComment] }, (err, html) => {
    if (err) {
      next(err);
    }
    socketIo.emit('comment', { postId: req.params.id, html: html });
  });


  res.status(201)
    //.location()
    .send(newComment);
});

app.use((req, res, next) => {
  res.render('layout', {
    subtitle: '404. No such page',
    links: [{ url: '/', name: 'home' }]
  });
});

app.listen(80);