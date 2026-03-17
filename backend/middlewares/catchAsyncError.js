export const catchAsyncError = (cbFn) => {
  return (req, res, next) => {
    Promise.resolve(cbFn(req, res, next)).catch(next);
  };
};
