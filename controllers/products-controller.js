export const getProduct = (req, res) => {
  const { id, hasTrial } = req.customer;

  res.status(200).json({
    message: `Customer ${id} has access to the product. ${
      hasTrial ? 'Trial' : 'Subscription'
    } is active`
  });
};
