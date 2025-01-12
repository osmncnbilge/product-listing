export const API_URL = "https://mock.akakce.dev";

export const PRODUCT_LIST = API_URL + "/page.json";

export const PRODUCT_URL = (productId: number) =>
  `${API_URL}/product${productId}.json`;
