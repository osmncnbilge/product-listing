import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import VerticalProductList from "./VerticalProductList";
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

const VerticalProductListWithRoute: React.FC<{
  productList: Product[];
  nextUrl: string;
}> = ({ productList, nextUrl }) => {
  return (
    <MemoryRouter>
      <VerticalProductList productList={productList} nextUrl={nextUrl} />
    </MemoryRouter>
  );
};

describe("VerticalProductList", () => {
  test("renders product list correctly", () => {
    render(
      <VerticalProductListWithRoute productList={mockProducts} nextUrl="" />
    );

    expect(screen.getByTestId("product-name-101")).toHaveTextContent(
      "Product 1"
    );
    expect(screen.getByTestId("product-name-102")).toHaveTextContent(
      "Product 2"
    );
    expect(screen.getByTestId("product-count-of-prices-101")).toHaveTextContent(
      "5 satıcı"
    );
    expect(screen.getByTestId("product-count-of-prices-102")).toHaveTextContent(
      "3 satıcı"
    );
    expect(screen.getByTestId("product-follow-count-101")).toHaveTextContent(
      "1.000 takip"
    );
    expect(screen.getByTestId("product-follow-count-102")).toHaveTextContent(
      "2.000 takip"
    );
  });

  test("renders load more button when nextUrl is provided", () => {
    render(
      <VerticalProductListWithRoute
        productList={mockProducts}
        nextUrl="http://example.com/next"
      />
    );

    expect(screen.getByTestId("load-more-button")).toHaveTextContent(
      "Daha Fazla Yükle"
    );
  });

  test("does not render load more button when nextUrl is not provided", () => {
    render(
      <VerticalProductListWithRoute productList={mockProducts} nextUrl="" />
    );

    expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
  });

  test("calls loadMore function when load more button is clicked", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ productList: [], nextUrl: "" }),
      })
    ) as jest.Mock;

    render(
      <VerticalProductListWithRoute
        productList={mockProducts}
        nextUrl="http://example.com/next"
      />
    );

    const loadMoreButton = screen.getByTestId("load-more-button");
    fireEvent.click(loadMoreButton);

    expect(global.fetch).toHaveBeenCalledWith("http://example.com/next");
  });

  test("displays loading state when load more button is clicked", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ productList: [], nextUrl: "" }),
      })
    ) as jest.Mock;

    render(
      <VerticalProductListWithRoute
        productList={mockProducts}
        nextUrl="http://example.com/next"
      />
    );

    const loadMoreButton = screen.getByText("Daha Fazla Yükle");
    fireEvent.click(loadMoreButton);

    expect(screen.getByText("Yükleniyor...")).toBeInTheDocument();
  });
});
