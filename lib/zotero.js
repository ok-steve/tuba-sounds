const fetch = require('./fetch');

const baseUrl = `https://api.zotero.org/users/${process.env.ZOTERO_USER_ID}`;

module.exports = async function (path) {
  return fetch(`${baseUrl}${path}`, {
    duration: '1w',
    fetchOptions: {
      headers: {
        'Zotero-API-Version': 3,
        'Zotero-API-Key': process.env.ZOTERO_API_KEY,
      },
    },
  });
};
