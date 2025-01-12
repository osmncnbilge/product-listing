import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";

describe("StarRating component", () => {
  test("renders the correct number of filled and empty stars", () => {
    render(<StarRating rating={3} />);
    
    const filledStars = screen.getAllByTestId(/filled-star-/);
    const emptyStars = screen.getAllByTestId(/empty-star-/);
    
    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });

  test("renders all filled stars when rating is 5", () => {
    render(<StarRating rating={5} />);
    
    const filledStars = screen.getAllByTestId(/filled-star-/);
    const emptyStars = screen.queryAllByTestId(/empty-star-/);
    
    expect(filledStars).toHaveLength(5);
    expect(emptyStars).toHaveLength(0);
  });

  test("renders all empty stars when rating is 0", () => {
    render(<StarRating rating={0} />);
    
    const filledStars = screen.queryAllByTestId(/filled-star-/);
    const emptyStars = screen.getAllByTestId(/empty-star-/);
    
    expect(filledStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(5);
  });

  test("rounds the rating correctly", () => {
    render(<StarRating rating={2.6} />);
    
    const filledStars = screen.getAllByTestId(/filled-star-/);
    const emptyStars = screen.getAllByTestId(/empty-star-/);
    
    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });
});