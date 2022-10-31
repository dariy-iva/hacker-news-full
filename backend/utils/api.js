const fetch = require('node-fetch');

function verifyResolve(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

module.exports.getNewsIdList = () => fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
  .then(verifyResolve);

module.exports.getNewItemById = (id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  .then(verifyResolve);
