import { useLoaderData } from "@remix-run/react";
import HorizontalProductList from "~/components/ProductList/HorizontalProductList";
import { Data } from "~/types/product";
import { PRODUCT_LIST } from "~/constants/urls";
import VerticalProductList from "~/components/ProductList/VerticalProductList";

export const loader = async (): Promise<Data> => {
  const response = await fetch(PRODUCT_LIST);
  if (!response.ok) {
    throw new Response("Failed to fetch products", { status: response.status });
  }
  const data: Data = await response.json();
  return data;
};

const Products = () => {
  const initialData = useLoaderData<Data>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ürünler</h1>
      <HorizontalProductList
        horizontalProductList={initialData.horizontalProductList}
      />
      <VerticalProductList
        productList={initialData.productList}
        nextUrl={initialData.nextUrl}
      />
    </div>
  );
};

export default Products;
