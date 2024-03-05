import { render } from "@testing-library/react";

import { Tags } from "../Tags";

it("Renders the ... component", () => {
  const { getByText } = render(<Tags />);
  expect(getByText("Tagi")).toBeTruthy();
});
