import React from "react";

interface FormattedPriceProps {
  price: number;
}

const FormattedPrice: React.FC<FormattedPriceProps> = ({ price }) => {
  const formattedPrice = price.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [integerPart, decimalPart] = formattedPrice.split(",");

  return (
    <span data-testid="formatted-price">
      <span data-testid="integer-part" className="text-2xl font-bold">
        {integerPart}
      </span>
      <span data-testid="decimal-part">,{decimalPart} TL</span>
    </span>
  );
};

export default FormattedPrice;
