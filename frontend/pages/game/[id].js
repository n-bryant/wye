import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import get from "lodash.get";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { withStyles } from "@material-ui/core/styles";
import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";

import LoadingState from "../../src/components/LoadingState";
import GameDetails from "../../src/components/Game/GameDetails";

import styles from "./[id].styles";

// game query
export const GET_GAME_QUERY = gql`
  query GET_GAME_QUERY($gameId: ID!) {
    game(gameId: $gameId) {
      details(gameId: $gameId) {
        id
        name
        releaseDate
        shortDescription
        headerImageUrl
        backgroundImageUrl
        price {
          freeToPlay
          onSale
          discountPercentage
          initialFormatted
          finalFormatted
        }
        controllerSupport
        developers
        publishers
        website
        platforms
        requirements {
          minimum
          recommended
        }
        metacritic {
          score
          reviewsPageUrl
        }
        categories {
          description
        }
        genres {
          description
        }
        highlightedVideos {
          id
          title
          thumbnailUrl
          fullsizeUrl
        }
        screenshots {
          id
          thumbnailUrl
          fullsizeUrl
        }
        videos {
          id
          title
          thumbnailUrl
          fullsizeUrl
        }
      }
      articles(gameId: $gameId) {
        url
        printDate
        author
        title
        contents
      }
    }
  }
`;

/**
 * renders a game page
 */
export const Game = props => {
  const classnames = Game.classnames(props);
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_GAME_QUERY, {
    variables: {
      gameId: router.query.id
    }
  });
  const details = get(data, ["game", "details"]);
  const articles = get(data, ["game", "articles"]);

  if (loading) {
    // game query loading state
    return (
      <div className={classnames.root()}>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    // game query error state
  }

  return (
    <div className={classnames.root()}>
      {details && articles && <GameDetails data={{ details, articles }} />}
    </div>
  );
};
Game.classnames = createClassNameHelper(`${JSS_CLASS_NAME_PREFIX}Game`);
Game.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string
  })
};
Game.defaultProps = {
  classes: {}
};

export default withStyles(styles)(Game);
