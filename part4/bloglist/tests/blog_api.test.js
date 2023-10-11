const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("GET /blogs", () => {
  test("Notes are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Correct number of blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("Expect 'id' parameter to be defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST /blogs", () => {
  test("Valid blog can be added", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "test.com",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain(newBlog.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
