import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";

describe("<Blog />", () => {
  let container;
  const likeHandler = jest.fn();
  const deleteHandler = jest.fn();
  const user = {
    id: "123456",
    name: "Test Name",
    username: "testusername",
  };

  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
    likes: 0,
    user: user,
  };

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={user}
        likeHandler={likeHandler}
        deleteHandler={deleteHandler}
      />
    ).container;
  });

  test("blog renders title and author by default", () => {
    const titleElement = container.querySelector(".compactBlogView");
    expect(titleElement).not.toHaveStyle("display: none");
    const fullElement = container.querySelector(".fullBlogView");
    expect(fullElement).toHaveStyle("display: none");
  });

  test("blog shows url and likes when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const div = container.querySelector(".fullBlogView");
    expect(div).not.toHaveStyle("display: none");
  });

  test("like button clicked twice calls handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const likeButton = container.querySelector("#likeButton");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
