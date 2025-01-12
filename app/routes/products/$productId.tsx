import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { ProductDetail } from "~/types/product";
import { PRODUCT_URL } from "~/constants/urls";
import FormattedPrice from "~/components/FormattedPrice/FormattedPrice";
import { capitalizeFirstLetter } from "~/utils/utils";
import StarRating from "~/components/StarRating/StarRating";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const loader = async ({
  params,
}: {
  params: { productId: number };
}): Promise<ProductDetail> => {
  const response = await fetch(PRODUCT_URL(params.productId));
  if (!response.ok) {
    throw new Response("Failed to fetch product details", {
      status: response.status,
    });
  }
  const product: ProductDetail = await response.json();
  return product;
};

const ProductDetailPage = () => {
  const product = useLoaderData<ProductDetail>();

  return (
    <div className="flex flex-col h-screen" data-testid="product-detail-page">
      <div className="container mx-auto p-6">
        <div className="flex gap-2 items-center p-6" data-testid="breadcrumb">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500"
            data-testid="home-link"
          >
            <HomeIcon className="w-5 h-5" />
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-xs font-semibold" data-testid="product-mkName">
            {product.mkName}
          </span>
        </div>
        <div
          className="flex flex-col p-6 rounded-lg"
          data-testid="product-details"
        >
          <div className="flex">
            <div className="flex flex-col">
              <span
                className="text-base sm:text-md font-semibold text-slate-500"
                data-testid="product-mkName-detail"
              >
                {product.mkName}
              </span>
              <span
                className="text-md sm:text-xl font-semibold"
                data-testid="product-name"
              >
                {product.productName}
              </span>
              <span
                className="text-xs sm:text-sm font-bold mt-2 w-fit px-1.5 py-2 bg-yellow-100"
                data-testid="product-badge"
              >
                {product.badge}
              </span>
            </div>
            <div className="ml-auto" data-testid="product-rating">
              <StarRating rating={product.rating} />
            </div>
          </div>
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-36 sm:h-48 mb-4 object-contain"
            data-testid="product-image"
          />
          <div
            className="flex flex-col gap-2 items-center bg-gray-100 p-4 text-gray-800 border-t-2 border-gray-200"
            data-testid="product-price-section"
          >
            <p>Kapasite Seçenekleri</p>
            <ul className="flex gap-2" data-testid="storage-options">
              {product.storageOptions.map((option, index) => (
                <li
                  key={index}
                  className="text-gray-600 px-8 py-4 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:cursor-pointer"
                  data-testid={`storage-option-${index}`}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p className="font-semibold" data-testid="count-of-prices">
              {product.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat
              seçeneği
            </p>
            <FormattedPrice price={product.price} data-testid="product-price" />
            {product.freeShipping && (
              <p
                className="text-green-500 font-semibold"
                data-testid="free-shipping"
              >
                Ücretsiz Kargo
              </p>
            )}
            <p className="text-gray-400" data-testid="last-update">
              Son güncelleme: {capitalizeFirstLetter(product.lastUpdate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
