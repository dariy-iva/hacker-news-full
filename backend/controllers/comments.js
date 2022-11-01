const { getItemById } = require('../utils/api');

async function getCommentsItemsList(parentId) {
  const commentsItemsList = [];

  try {
    const parentItem = await getItemById(parentId);
    const commentsIdList = parentItem.kids || [];
    const promises = commentsIdList.map((id) => getItemById(id)
      .then((item) => commentsItemsList.push(item))
      .catch((err) => Promise.reject(err)));

    await Promise.all(promises);

    return commentsItemsList.sort((a, b) => b.time - a.time);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports.getComments = async (req, res, next) => {
  const { parentId } = req.params;
  try {
    const commentsItemsList = await getCommentsItemsList(parentId);
    res.status(200).send(commentsItemsList);
  } catch (err) {
    next();
  }
};
