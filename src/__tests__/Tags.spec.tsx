import { fireEvent, render, waitFor, within } from "@testing-library/react";
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

afterEach(() => {
  server.events.removeAllListeners();
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

it("Shows no tags when phrase is shorter than 3 characters", async () => {
  server.events.on("request:start", (req) => {
    const phrase = new URL(req.request.url).searchParams.get("phrase");
    expect(phrase).not.toBeNull();
    expect(phrase?.length).toBeGreaterThanOrEqual(3);
  });

  const { getByRole } = render(<Tags />);
  const input = getByRole("textbox", { name: "phrase" });

  fireEvent.change(input, { target: { value: "he" } });
});

it("Click on tag item should check tag and add to seleted list", async () => {
  const { getByRole, getByText } = render(<Tags />);
  const input = getByRole("textbox", { name: "phrase" });

  fireEvent.change(input, { target: { value: "test" } });

  await waitFor(() => {
    expect(getByText("test1")).toBeTruthy();
  });

  const item = getByRole("listitem", { name: "test1" });
  fireEvent.click(item);

  await waitFor(() => {
    const checkbox = within(item).getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBeTruthy();
    expect(
      within(getByRole("list", { name: "selected tags" })).getByText(/test1/),
    ).toBeTruthy();
  });
});

it("Loads initial tags", async () => {
  const { getByRole } = render(
    <Tags
      initial={[
        { id: 1, name: "tag1" },
        { id: 2, name: "tag2" },
      ]}
    />,
  );
  expect(
    within(getByRole("list", { name: "selected tags" })).getByText(/tag1/),
  ).toBeTruthy();
  expect(
    within(getByRole("list", { name: "selected tags" })).getByText(/tag2/),
  ).toBeTruthy();
});

it("Click on remove button removes tag from list", async () => {
  const { getByRole } = render(
    <Tags
      initial={[
        { id: 1, name: "tag1" },
        { id: 2, name: "tag2" },
      ]}
    />,
  );
  const selected = getByRole("list", { name: "selected tags" });
  fireEvent.click(
    within(within(selected).getByText(/tag1/)).getByRole("button"),
  );

  await waitFor(() => {
    expect(within(selected).queryByText(/tag1/)).toBeNull();
  });
});

it("Click selected checkbox removes tag from list", async () => {
  const { getByRole, getByText } = render(
    <Tags
      initial={[
        { id: 1, name: "test1" },
        { id: 2, name: "test2" },
      ]}
    />,
  );

  const input = getByRole("textbox", { name: "phrase" });
  fireEvent.change(input, { target: { value: "test" } });

  await waitFor(() => {
    expect(getByText("test1")).toBeTruthy();
  });

  const item = getByRole("listitem", { name: "test1" });
  fireEvent.click(item);

  const selected = getByRole("list", { name: "selected tags" });

  await waitFor(() => {
    expect(within(selected).queryByText(/test1/)).toBeNull();
  });
});
