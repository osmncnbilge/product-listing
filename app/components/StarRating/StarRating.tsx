import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StartIconOutline } from "@heroicons/react/24/outline";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = maxStars - filledStars;

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <StarIcon
          key={`filled-${index}`}
          className="w-6 h-6 text-yellow-300"
          data-testid={`filled-star-${index}`}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StartIconOutline
          key={`empty-${index}`}
          className="w-6 h-6 text-gray-200"
          data-testid={`empty-star-${index}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
