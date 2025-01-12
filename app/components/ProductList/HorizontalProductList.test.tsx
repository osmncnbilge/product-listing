import { render, screen, fireEvent } from "@testing-library/react";
import HorizontalProductList from "./HorizontalProductList";
import { MemoryRouter } from "react-router-dom";
import { Product } from "~/types/product";

const mockProducts: Product[] = [
  {
    code: 101,
    name: "Product 1",
    price: 1234.56,
    followCount: 1000,
    countOfPrices: 5,
    imageUrl: "https://via.placeholder.com/150",
    dropRatio: 10,
    url: "https://example.com/101",
  },
  {
    code: 102,
    name: "Product 2",
    price: 2345.67,
    followCount: 2000,
    countOfPrices: 3,
    imageUrl: "https://via.placeholder.com/150",
    dropRatio: 20,
    url: "https://example.com/102",
  },
];

const HorizontalProductListWithRoute: React.FC<{
  horizontalProductList: Product[];
}> = ({ horizontalProductList }) => {
  return (
    <MemoryRouter>
      <HorizontalProductList horizontalProductList={horizontalProductList} />
    </MemoryRouter>
  );
};

describe("HorizontalProductList", () => {
  test("renders HorizontalProductList component", () => {
    render(
      <HorizontalProductListWithRoute horizontalProductList={mockProducts} />
    );

    expect(screen.getByTestId("horizontal-product-list")).toBeInTheDocument();
    expect(screen.getByTestId("product-name-101")).toHaveTextContent(
      "Product 1"
    );
    expect(screen.getByTestId("product-name-102")).toHaveTextContent(
      "Product 2"
    );
  });

  test("displays formatted price correctly", () => {
    render(
      <HorizontalProductListWithRoute horizontalProductList={mockProducts} />
    );
    expect(screen.getAllByTestId("formatted-price")[0]).toHaveTextContent(
      "1.234,56 TL"
    );
    expect(screen.getAllByTestId("formatted-price")[1]).toHaveTextContent(
      "2.345,67 TL"
    );
  });

  test("displays follow count correctly", () => {
    render(
      <HorizontalProductListWithRoute horizontalProductList={mockProducts} />
    );
    expect(screen.getByTestId("product-follow-count-101")).toHaveTextContent(
      "1.000 takip"
    );
    expect(screen.getByTestId("product-follow-count-102")).toHaveTextContent(
      "2.000 takip"
    );
  });

  test("displays count of prices correctly", () => {
    render(
      <HorizontalProductListWithRoute horizontalProductList={mockProducts} />
    );
    expect(screen.getByTestId("product-count-of-prices-101")).toHaveTextContent(
      "5 satıcı"
    );
    expect(screen.getByTestId("product-count-of-prices-102")).toHaveTextContent(
      "3 satıcı"
    );
  });

  test("slider buttons work correctly", () => {
    render(
      <HorizontalProductListWithRoute
        horizontalProductList={[
          ...mockProducts,
          {
            code: 103,
            name: "Product 3",
            price: 1234.56,
            followCount: 1000,
            countOfPrices: 5,
            imageUrl: "https://via.placeholder.com/150",
            dropRatio: 10,
            url: "https://example.com/101",
          },
          {
            code: 104,
            name: "Product 4",
            price: 1234.56,
            followCount: 1000,
            countOfPrices: 5,
            imageUrl: "https://via.placeholder.com/150",
            dropRatio: 10,
            url: "https://example.com/101",
          },
        ]}
      />
    );
    const nextButton = screen.getByTestId("next-slide-button");
    const prevButton = screen.getByTestId("prev-slide-button");

    expect(prevButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(prevButton).not.toBeDisabled();
    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });

  test("filters products correctly based on screen size", () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(
      <HorizontalProductListWithRoute horizontalProductList={mockProducts} />
    );
    expect(screen.getByTestId("product-name-101")).toBeInTheDocument();
  });
});
