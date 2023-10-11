const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const blog = require("../models/blog");

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

  test("If 'likes' property is missing, it's defaulted to 0", async () => {
    await Blog.deleteMany({}); // clear db
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "test.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(1);
    const likes = blogsAtEnd[0].likes;
    expect(likes).toEqual(0);
  });
  test("Title is a required property", async () => {
    const newBlog = {
      author: "test author",
      url: "test.com",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("url is a required property", async () => {
    const newBlog = {
      author: "test author",
      title: "test title",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("PUT /blogs", () => {
  test("Succeeds with valid data", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    blogToUpdate.title = "TestUpdatedTitle";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length); // make sure this doesn't change
    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain(blogToUpdate.title);
  });
});

describe("DELETE /blogs", () => {
  test("Succeeds with 204 if valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
