const sendResponse = require("../helpers/sendResponse");
const Cart = require("../models/Cart");
const Comment = require("../models/Comment");

const commentController = {};

commentController.getAllComments = async (req, res, next) =>{
    let result;
    const {productId} = req.params
    try {
      result = await Comment.find({isDeleted: false, targetProduct: productId})
      console.log(result,"adele");
    } catch (error) {
      return next(error);
    }
    return sendResponse(
      res,
      200,
      true,
     result,
      false,
      "Successfully get all comment"
    );
}

commentController.createComment = async (req, res, next) => {
    let result;
    try {
        const author = req.currentUser._id;
        let { content } = req.body;
        const { productId } = req.params;
        if (!author || !productId || !content) throw new Error("Need inputs");
        //a comment content should be at least 50 words
        content.split(" ")
        // if (content.trim().split(" ").length < 10) {
        //     throw new Error("Please add content at lease 10 words")
        // };

        //user bought product
        const found = await Cart.findOne(
            {
                owner: author,
                status: "paid",
                "products.productId": productId,
            }
        );
        if (!found) throw new Error("Please pay before comment");
        
        const newComment = {
            author,
            content,
            targetProduct: productId,
        }
        result = await Comment.create(newComment);

    } catch (error) {
        return next(error);
    }
    sendResponse(res, 200, true, result, false, "Successfully create comment")
}

commentController.deleteComment = async (req, res, next) =>{
    let result;
    const {reviewId} = req.params                       
    try {
        const found = await Comment.findOne({_id: reviewId, author:req.currentUser._id});
        // console.log(found.author, 'found')
        // if(req.currentUser._id !== found.author){
        //     throw new Error("U not a user post this comment")
        // }
        if(!found) throw new Error("You are not allowed to delete other's comment")
    //   result = await Comment.findOneAndUpdate({reviewId, author:req.currentUser._id },{isDeleted:true}, {new: true})
       result = await Comment.findByIdAndDelete(reviewId)
    } catch (error) {
      return next(error);
    }
    return sendResponse(
      res,
      200,
      true,
     result,
      false,
      "Successfully delete comment"
    );
}

commentController.updateComment = async (req, res, next) => {
    let result;
    
    const allowOptions = ["content"];
    const updateObject = {};
    const { commentId } = req.params;
    try {
      allowOptions.forEach((option) => {
        if (req.body[option] !== undefined) {
          updateObject[option] = req.body[option];
        }
      });
      const found = await Comment.findOne({_id: commentId, author:req.currentUser._id});
      if(!found) throw new Error("You are not allowed to change other's comment")

      if (!commentId) throw new Error("Comment not found");
      result = await Comment.findByIdAndUpdate(commentId, updateObject, {
        new: true,
      });
    } catch (error) {
      return next(error);
    }
    return sendResponse(
      res,  
      200,
      true,
      result,
      false,
      "Successfully update comment"
    );
}

module.exports = commentController;
