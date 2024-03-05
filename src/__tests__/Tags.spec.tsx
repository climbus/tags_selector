import { fireEvent, render, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";

import handlers from "./handlers";
import { Tags } from "../Tags";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

it("Renders the tags component with title and input", () => {
  const { getByText, getByRole } = render(<Tags />);

  expect(getByText("Tagi")).toBeTruthy();
  expect(getByRole("textbox", { name: "phrase" })).toBeTruthy();
});

it.each([
  ["test", ["test1", "test2"]],
  ["hello", ["hello", "hello world"]],
  ["hello world", ["hello world"]],
])("When typing %s it should show %s", async (phrase, result) => {
  const { getByRole, getByText } = render(<Tags />);
  const input = getByRole("textbox", { name: "phrase" });

  fireEvent.change(input, { target: { value: phrase } });

  await waitFor(() => {
    for (const tag of result) {
      expect(getByText(tag)).toBeTruthy();
    }
  });
});
