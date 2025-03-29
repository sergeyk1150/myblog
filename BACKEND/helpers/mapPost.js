const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (post) {
  return {
    id: post._doc._id,
    title: post._doc.title,
    imageUrl: post._doc.image_url,
    content: post._doc.content,
    comments: post._doc.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    publishedAt: post._doc.createdAt,
  };
};
