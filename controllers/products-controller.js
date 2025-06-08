export const getProduct = (req, res) => {
  if (req.hasAccess) {
    return res.status(200).json({
      message: `Customer has access to the product. Subscription is active`
    });
  } else {
    return res.status(200).json({
      message: `Subscription is not active`
    });
  }
};
