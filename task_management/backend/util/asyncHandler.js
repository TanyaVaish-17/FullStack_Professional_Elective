// it is check whether it will contain any error or not, if it contains does not contain any error , then promise will be resolve and the code 
// will continue by handling next api calls , and if there is error we handle it using catch by calling next middleware using next.

//

const asyncHandler = (requestHandler) => {
  return (req, res, next)=>{
    Promise.resolve(requestHandler(req, res, next))
      .catch(next);
  };
};

export default asyncHandler;
