const RANK_INDICATOR = "%%rank%%";

/**
 * retrieves a game's tags with their rank
 * @param {Array} tags
 */
const getGameTags = tags => {
  return tags.map(tag => {
    const splitTag = tag.split(RANK_INDICATOR);
    return {
      name: splitTag[0],
      rank: splitTag[1] ? parseInt(splitTag[1], 10) : 0
    };
  });
};

/**
 * Transforms a game received from wye-support-service's games API
 * into a game object that matches the schema
 * @param {Object}
 * @returns {Object}
 */
const wyeGameReducer = game => {
  return {
    ...game,
    developers: game.developers.split(", "),
    publishers: game.publishers.split(", "),
    genres: game.genres.split(", "),
    tags: game.tags.length ? getGameTags(game.tags.split(", ")) : []
  };
};

module.exports = wyeGameReducer;
