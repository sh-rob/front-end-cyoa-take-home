import { render, screen, userEvent } from "@testing-library/react";
import App from "./App";

const renderAppp = () => render(<App />);

test("renders New Comment component", () => {
  renderAppp();
  const commentText = screen.getByText("New Comment");
  expect(commentText).toBeInTheDocument();
});

test("renders comment board", () => {
  renderAppp();
  const commentsTitle = screen.getByText(/Comments/i);
  expect(commentsTitle).toBeInTheDocument();
});

test("clicks delete icon", () => {
  const deleteIcon = screen.getByRole("img", {
    name: /delete/i,
  });

  userEvent.click(deleteIcon);
});

test("send comment", () => {
  const nameBox = screen.getByRole("textbox", {
    name: /name/i,
  });

  const messageBox = screen.getByRole("textbox", {
    message: /message/i,
  });

  userEvent.type(nameBox, "fake name");
  userEvent.type(messageBox, "fake comment");

  const createCommentButton = screen.getByRole("button", {
    name: /create comment/i,
  });

  userEvent.click(createCommentButton);
});

test("renders error message when user tries to click Send Comment with no name", async () => {
  const createCommentButton = screen.getByRole("button", {
    name: /create comment/i,
  });

  userEvent.click(createCommentButton);

  await screen.findByText("This is required");
});

test("renders error message when user tries to click Send Comment with no  message", async () => {
  const nameBox = screen.getByRole("textbox", {
    name: /name/i,
  });

  userEvent.type(nameBox, "fake name");

  const createCommentButton = screen.getByRole("button", {
    name: /create comment/i,
  });

  userEvent.click(createCommentButton);

  await screen.findByText("This is required");
});
