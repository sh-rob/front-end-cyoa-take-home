import { render, screen } from "@testing-library/react";
import App from "./App";

const renderAppp = () => render(<App />);

test("renders Comment component", () => {
  renderAppp();
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("adds comment", () => {
  renderAppp();
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
