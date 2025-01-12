export const getScreenSize = (): string => {
  if (typeof window === "undefined") {
    return "sm"; // Varsayılan değer, sunucu tarafında render edilirken kullanılacak
  }

  const width = window.innerWidth;

  if (width < 640) {
    return "sm";
  } else if (width >= 640 && width < 768) {
    return "md";
  } else if (width >= 768 && width < 1024) {
    return "lg";
  } else if (width >= 1024 && width < 1280) {
    return "xl";
  } else {
    return "2xl";
  }
};

export const formattedNumber = (value: number) => {
  return Intl.NumberFormat("tr-TR").format(value);
};

export const capitalizeFirstLetter = (value: string) => {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};
