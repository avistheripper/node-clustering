const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

// @GET api/blogs/:id - get a blog from DB by id
// @GET api/blogs - get all blog for user
// @POST api/blogs - create new blog in DB

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    // redis caching common logic
      const redis = require('redis');
      const redisUrl = 'redis://127.0.0.1:6479';
      const client = redis.createClient(redisUrl);
      const util = require('util');

      client.get = util.promisify(client.get);
      
      const cachedBlogs = await client.get(req.user.id);
      if(cachedBlogs) {
        res.send(cachedBlogs);
      } else {
        const blogs = await Blog.find({ _user: req.user.id });
        client.set(req.user.id, blogs);
        res.send(blogs);
      }

  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
