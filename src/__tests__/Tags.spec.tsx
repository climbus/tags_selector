import { fireEvent, render, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";

import handlers from "./handlers";
import { Tags } from "../Tags";

it("Renders the tags component with title and input", () => {
  const { getByText, getByRole } = render(<Tags />);

  expect(getByText("Tagi")).toBeTruthy();
  expect(getByRole("textbox", { name: "phrase" })).toBeTruthy();
});

it("When typing on input it should ask api for tags", async () => {
  const server = setupServer(...handlers);

  server.listen();

  const { getByRole, getByText } = render(<Tags />);
  const input = getByRole("textbox", { name: "phrase" });

  fireEvent.change(input, { target: { value: "test" } });

  await waitFor(() => {
    expect(getByText("test1")).toBeTruthy();
    expect(getByText("test2")).toBeTruthy();
  });

  server.close();
});
