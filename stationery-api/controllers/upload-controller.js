const testUpload = async (req, res, next) => {
  try {
    console.log(req.file);
    res.json({ message: "Successfully uploaded files" });
  } catch (error) {
    return next(error);
  }
};

module.exports = testUpload;
