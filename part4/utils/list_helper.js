const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? "No Input Blogs Given"
    : blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

const mostBlogs = (blogs) => {
  const countedBlogs = _.countBy(blogs, "author");
  const author = _.maxBy(_.keys(countedBlogs), (o) => countedBlogs[o]);
  return {
    author: author,
    blogs: countedBlogs[author],
  };
};

const mostLikes = (blogs) => {
  const countTable = {};
  blogs.forEach((blog) => {
    if (countTable[blog.author]) {
      countTable[blog.author] += blog.likes;
    } else {
      countTable[blog.author] = blog.likes;
    }
  });
  const author = _.maxBy(_.keys(countTable), (o) => countTable[o]);
  return {
    author: author,
    likes: countTable[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
