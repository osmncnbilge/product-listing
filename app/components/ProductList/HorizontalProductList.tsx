import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Product } from "~/types/product";
import { formattedNumber, getScreenSize } from "~/utils/utils";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const HorizontalProductList = ({
  horizontalProductList,
}: {
  horizontalProductList: Product[];
}) => {
  const [screenSize, setScreenSize] = useState<string>("lg");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideCount =
    screenSize === "sm"
      ? horizontalProductList.length
      : Math.ceil(horizontalProductList.length / 2) || 0;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getFilteredProductList = useCallback(() => {
    if (screenSize === "sm") {
      return horizontalProductList.slice(currentSlide, currentSlide + 1);
    }
    return horizontalProductList.slice(currentSlide * 2, currentSlide * 2 + 2);
  }, [screenSize, horizontalProductList, currentSlide]);

  const filteredProductList = getFilteredProductList();

  const handleNextClick = () => {
    if (currentSlide < horizontalProductList.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="p-4" data-testid="horizontal-product-list">
      <div className="relative flex justify-center">
        {filteredProductList.map((product: Product, index: number) => (
          <Link
            key={`${product.code}_${index}`}
            data-testid={`product-link-${product.code}`}
            to={`/products/${product.code}`}
            className="p-4 md:max-w-[50%]"
          >
            <div className="flex p-4 gap-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-24 sm:h-36 object-contain"
                data-testid={`product-image-${product.code}`}
              />
              {product.dropRatio && (
                <div
                  data-testid={`product-drop-ratio-${product.code}`}
                  className="relative bottom-4 h-fit bg-red-500 text-white text-xs font-bold rounded-full p-2"
                >
                  %{product.dropRatio}
                </div>
              )}
              <div
                data-testid={`product-name-${product.code}`}
                className="flex flex-col gap-4"
              >
                <div className="text-base sm:text-md font-semibold text-slate-500">
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
                  data-testid={`product-follow-count-${product.code}`}
                  className="text-xs font-medium text-slate-600"
                >
                  {`${formattedNumber(product.followCount)} takip`}
                </span>
              </div>
            </div>
          </Link>
        ))}
        {horizontalProductList.length >= 4 && (
          <>
            <button
              data-testid="prev-slide-button"
              disabled={currentSlide === 0}
              onClick={handlePrevClick}
              className={`absolute left-0 top-1/2 ${
                currentSlide === 0 ? "opacity-25" : ""
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              data-testid="next-slide-button"
              disabled={currentSlide === slideCount - 1}
              onClick={handleNextClick}
              className={`absolute right-0 top-1/2 ${
                currentSlide === slideCount - 1 ? "opacity-25" : ""
              }`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {horizontalProductList.length >= 4 &&
          Array.from({ length: slideCount }).map((_, index) => (
            <button
              data-testid={`slide-indicator-${index}`}
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentSlide === index ? "bg-sky-600" : "bg-gray-300"
              }`}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default HorizontalProductList;
