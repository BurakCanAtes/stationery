const handleErrors = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "An unexpected error occured"

  res.status(status).json({ error: message });
}

module.exports = handleErrors;