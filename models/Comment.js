const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        targetProduct: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        isDeleted: {type: Boolean, default: false},
    }, {
    timestamps: true
}
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;