import { render, screen } from "@testing-library/react";
import FormattedPrice from "./FormattedPrice";

test("renders FormattedPrice with correct formatting for different prices", () => {
  render(<FormattedPrice price={1234.56} />);

  expect(screen.getByTestId("formatted-price")).toHaveTextContent(
    "1.234,56 TL"
  );
  expect(screen.getByTestId("integer-part")).toHaveTextContent("1.234");
  expect(screen.getByTestId("decimal-part")).toHaveTextContent(",56 TL");
});
