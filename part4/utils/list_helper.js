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
  console.log(countedBlogs);
  const author = _.maxBy(_.keys(countedBlogs), (o) => countedBlogs[o]);
  console.log(_.keys(countedBlogs));
  return {
    author: author,
    blogs: countedBlogs[author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
