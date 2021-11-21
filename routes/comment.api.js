const express = require("express");

const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = express.Router();


const { 
    getAllComments,
    createComment, 
    updateComment,
    deleteComment
    } = require("../controllers/comment.controller");
/**
 * Description: Get all comment of 1 product
 * Access : public
 */
router.get("/:productId",getAllComments);

/**
 * Description: Update a comment
 * Access : public
 */
router.put("/:commentId", authenticationMiddleware, updateComment);
/**
 * Description:  Create comment
 * Access : Admin require
 */
router.post("/:productId", authenticationMiddleware, createComment);

/**
 * Description: Delete comment
 * Access : authenticated user
 */
router.delete("/:reviewId", authenticationMiddleware, deleteComment);

module.exports = router;