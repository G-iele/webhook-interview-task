export const errorHandler = (err, req, res, next) => {
  err.status
    ? res.status(err.status).json({ msg: err.message })
    : res.status(500).json({ msg: 'Server error' });
};
