const transaction = require("../../dao/transaction");

function LikeController() {
  this.like = async (req, res, next) => {
    const { planId } = req.params;
    const { email } = req.user;

    try {
      const result = await transaction.addLikeTransaction(email, planId);
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  this.dislike = async (req, res, next) => {
    const { planId } = req.params;
    const { email } = req.user;

    try {
      const result = await transaction.removeLikeTransaction(email, planId);
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  };
}

const likeController = new LikeController();

Object.freeze(likeController);

module.exports = likeController;
