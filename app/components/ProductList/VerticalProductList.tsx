import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "~/types/product";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import { formattedNumber } from "~/utils/utils";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface VerticalProductListProps {
  productList: Product[];
  nextUrl: string;
}

const VerticalProductList: React.FC<VerticalProductListProps> = ({
  productList,
  nextUrl,
}) => {
  const [data, setData] = useState({
    productList,
    nextUrl,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = async () => {
    if (!data.nextUrl || loading) return;

    setLoading(true);
    const response = await fetch(data.nextUrl);

    if (!response.ok) {
      console.error("Failed to fetch next products");
      setLoading(false);
      return;
    }

    const newData = await response.json();

    setData((prevData: any) => ({
      ...prevData,
      nextUrl: newData.nextUrl,
      productList: [...prevData.productList, ...newData.productList],
    }));
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-10 px-4 bg-gray-100 rounded-lg">
        {data.productList.map((product: Product, index: number) => (
          <Link
            key={`${product.code}_${index}`}
            to={`/products/${product.code}`}
          >
            <div className="flex flex-col gap-2 rounded-lg p-4 bg-white">
              <div className="flex">
                {product.dropRatio && (
                  <div className="h-fit bg-red-500 text-white text-xs font-bold rounded-full p-2">
                    %{product.dropRatio}
                  </div>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-36 sm:h-48 object-contain"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="text-base sm:text-md font-semibold text-slate-500"
                  data-testid={`product-name-${product.code}`}
                >
                  {product.name}
                </div>
                <div className="flex flex-col">
                  <FormattedPrice price={product.price} />
                  <div className="flex items-center text-slate-500">
                    <span
                      data-testid={`product-count-of-prices-${product.code}`}
                      className="text-xs"
                    >
                      {`${product.countOfPrices} satıcı`}
                    </span>
                    <ChevronRightIcon className="w-3 h-3" />
                  </div>
                </div>
                <span
                  className="text-xs font-medium text-slate-600"
                  data-testid={`product-follow-count-${product.code}`}
                >
                  {`${formattedNumber(product.followCount)} takip`}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {data.nextUrl && (
        <div className="mt-6 text-center">
            <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
            data-testid="load-more-button"
            >
            {loading ? "Yükleniyor..." : "Daha Fazla Yükle"}
            <ArrowPathIcon className="w-5 h-5 inline-block ml-2" />
            </button>
        </div>
      )}
    </>
  );
};

export default VerticalProductList;
