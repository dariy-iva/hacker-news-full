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

module.exports.getComments = (req, res, next) => {
  const { parentId } = req.params;

  getCommentsItemsList(parentId)
    .then(commentsList => res.status(200).send(commentsList))
    .catch(next);
};
