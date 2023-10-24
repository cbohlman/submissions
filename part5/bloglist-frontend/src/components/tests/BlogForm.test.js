import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "../BlogForm";
import userEvent from "@testing-library/user-event";

describe("<Blogform />", () => {
  test("Form calls event handler with correct details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const container = render(<BlogForm createBlog={createBlog} />).container;

    const titleInput = container.querySelector("#titleInput");
    const authorInput = container.querySelector("#authorInput");
    const urlInput = container.querySelector("#urlInput");
    const submitButton = container.querySelector("#submitButton");

    await user.type(titleInput, "Test Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "Test Url");

    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Test Title");
    expect(createBlog.mock.calls[0][0].author).toBe("Test Author");
    expect(createBlog.mock.calls[0][0].url).toBe("Test Url");
  });
});
