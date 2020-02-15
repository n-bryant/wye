/**
 * returns a combined playtime and individual playtime by user for a game
 * @param {Object} game
 * @param {Array} userOwnedGamesList
 * @returns {Object}
 */
function getGamePlaytime(game, userOwnedGamesList) {
  const playtimeByUser = Object.keys(userOwnedGamesList).map(user => {
    if (
      userOwnedGamesList[user]["games"].some(
        userGame => userGame.id === game.appid
      )
    ) {
      return {
        steamId: user,
        hoursPlayed: userOwnedGamesList[user]["games"].filter(
          userGame => userGame.id === game.appid
        )[0].hoursPlayed
      };
    } else {
      return {
        steamId: user,
        hoursPlayed: 0
      };
    }
  });

  const totalHours = playtimeByUser.reduce(
    (total, val) => parseFloat((total + val.hoursPlayed).toFixed(2), 10),
    0
  );
  return {
    totalHours,
    playtimeByUser
  };
}

module.exports = getGamePlaytime;
