export const getProduct = (req, res) => {
  const { id, status } = req.customer;

  res.status(200).json({
    message: `Customer ${id} has access to the product. Status: ${status}`
  });
};
