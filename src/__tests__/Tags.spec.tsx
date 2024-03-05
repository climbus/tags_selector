import { render } from "@testing-library/react";

import { Tags } from "../Tags";

it("Renders the tags component with title and input", () => {
  const { getByText, getByRole } = render(<Tags />);

  expect(getByText("Tagi")).toBeTruthy();
  expect(getByRole("textbox", { name: "phrase" })).toBeTruthy();
});
