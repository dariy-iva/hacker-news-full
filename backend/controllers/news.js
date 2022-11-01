const { getNewsIdList, getItemById } = require('../utils/api');

async function getNewsItemsList() {
  const newsItemsList = [];

  try {
    const newsIdList = await getNewsIdList();
    const promises = newsIdList.slice(0, 100).map((id) => getItemById(id)
      .then((item) => newsItemsList.push(item))
      .catch((err) => Promise.reject(err)));

    await Promise.all(promises);

    return newsItemsList.sort((a, b) => b.time - a.time);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports.getNews = async (req, res, next) => {
  try {
    const newsItemsList = await getNewsItemsList();
    res.status(200).send(newsItemsList);
  } catch (err) {
    next();
  }
};
