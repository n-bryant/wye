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
    tags: game.tags.split(", ")
  };
};

module.exports = wyeGameReducer;
