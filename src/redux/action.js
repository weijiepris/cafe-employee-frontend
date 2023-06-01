export const addToCart = (data) => {
  console.warn("addToCart is called", data);
  return {
    type: "ADD_TO_CART",
    data,
  };
};
