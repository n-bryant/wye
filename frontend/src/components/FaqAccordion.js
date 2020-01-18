import React from "react";
import PropTypes from "prop-types";

import createClassNameHelper from "@n_bryant/classnames-helper";
import JSS_CLASS_NAME_PREFIX from "../../lib/classNamePrefix";
import { withStyles } from "@material-ui/core/styles";

import { useRouter } from "next/router";

import Link from "next/link";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import IndexPageBackground from "./ScrollingBackground/IndexPageBackground";
import styles from "./FaqAccordion.styles";

export const EXPAND_ALL_BUTTON_OPTIONS = {
  COLLAPSE: "collapse all",
  EXPAND: "expand all"
};

/**
 * renders an FAQ accordion
 */
export const FaqAccordion = props => {
  const classnames = FaqAccordion.classnames(props);
  const router = useRouter();

  // gets the default expanded panel
  const getDefaultExpanded = () => {
    const matches = router.asPath.match(/(?<=#)[^\]]+/);
    if (matches) {
      if (matches[0] === "profile") {
        return "panel5";
      } else if (matches[0] === "steamid") {
        return "panel6";
      }
    }
    return false;
  };

  // initial state
  const [expanded, setExpanded] = React.useState(getDefaultExpanded());
  const [expandAll, setAllExpanded] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  // event handling
  const handleChange = panel => (_e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleHover = panel => {
    setHovered(panel ? panel : false);
  };

  return (
    <div className={classnames.root()}>
      <div className={classnames.element("titleContainer")}>
        <Typography className={classnames.element("title")}>
          Frequently Asked Questions
        </Typography>
        <Button
          className={classnames.element("expandAllButton")}
          onClick={() => setAllExpanded(!expandAll)}
        >
          {expandAll
            ? EXPAND_ALL_BUTTON_OPTIONS.COLLAPSE
            : EXPAND_ALL_BUTTON_OPTIONS.EXPAND}
        </Button>
      </div>
      <div className={classnames.element("faqContainer")}>
        <ExpansionPanel
          expanded={expanded === `panel1` || expandAll}
          onChange={handleChange(`panel1`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel1`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel1`
                })}
              />
            }
            aria-controls={`panel1bh-content`}
            id={`panel1bh-header`}
            onMouseEnter={() => handleHover(`panel1`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              Attribution
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1" gutterBottom={true}>
              Wye uses popular libraries which include:{" "}
              <Link href="https://reactjs.org/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  React
                </a>
              </Link>
              ,{" "}
              <Link href="https://material-ui.com/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Material-UI
                </a>
              </Link>
              ,{" "}
              <Link href="https://nextjs.org/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  NextJs
                </a>
              </Link>
              ,{" "}
              <Link href="https://www.apollographql.com/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Apollo GraphQL
                </a>
              </Link>
              ,{" "}
              <Link href="https://nodejs.org/en/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Node.js
                </a>
              </Link>
              , and{" "}
              <Link href="https://momentjs.com/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Moment.js
                </a>
              </Link>
              .
            </Typography>
            <Typography variant="body1" gutterBottom={true}>
              Wye uses{" "}
              <Link href="https://www.prisma.io/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Prisma
                </a>
              </Link>{" "}
              as a data management solution.
            </Typography>
            <Typography variant="body1" gutterBottom={true}>
              Wye uses{" "}
              <Link href="https://steamspy.com/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  SteamSpy
                </a>
              </Link>{" "}
              for some game data.
            </Typography>
            <Typography variant="body1" gutterBottom={true}>
              Wye uses{" "}
              <Link href="https://airbnb.io/enzyme/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Enzyme
                </a>
              </Link>{" "}
              and{" "}
              <Link href="https://jestjs.io/" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  Jest
                </a>
              </Link>{" "}
              for testing.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel2` || expandAll}
          onChange={handleChange(`panel2`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel2`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel2`
                })}
              />
            }
            aria-controls={`panel2bh-content`}
            id={`panel2bh-header`}
            onMouseEnter={() => handleHover(`panel2`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              How to contact you?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1" gutterBottom={true}>
              Wye is not affiliated with Valve or Steam! If you want to contact
              Valve{" "}
              <Link
                href="http://www.valvesoftware.com/contact/"
                prefetch={false}
              >
                <a className={classnames.element("link")}>
                  visit their contact page
                </a>
              </Link>
              .
            </Typography>
            <Typography variant="body1">
              You can reach me at{" "}
              <Link href="mailto:wye.app.dev@gmail.com" prefetch={false}>
                <a className={classnames.element("link")}>
                  wye.app.dev@gmail.com
                </a>
              </Link>
              .
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel3` || expandAll}
          onChange={handleChange(`panel3`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel3`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel3`
                })}
              />
            }
            aria-controls={`panel3bh-content`}
            id={`panel3bh-header`}
            onMouseEnter={() => handleHover(`panel3`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              Why did you decide to make Wye?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1">
              Wye was created to help friends figure out what to play together
              more easily. Wye allows you and your friends to easily see what
              multiplayer games you already have, how much you have played those
              games, and can recommend new multiplayer games for you to play
              based on what you have played in the past.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          name="profile"
          expanded={expanded === `panel4` || expandAll}
          onChange={handleChange(`panel4`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel4`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel4`
                })}
              />
            }
            aria-controls={`panel4bh-content`}
            id={`panel4bh-header`}
            onMouseEnter={() => handleHover(`panel4`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              How are you getting this information?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1">
              Wye makes use of Steam's public{" "}
              <Link
                href="https://developer.valvesoftware.com/wiki/Steam_Web_API"
                prefetch={false}
              >
                <a className={classnames.element("link")} target="_blank">
                  API
                </a>
              </Link>{" "}
              for game and user profile data in combination with data from{" "}
              <Link href="https://steamspy.com/api.php" prefetch={false}>
                <a className={classnames.element("link")} target="_blank">
                  SteamSpy
                </a>
              </Link>{" "}
              for building recommendations.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel5` || expandAll}
          onChange={handleChange(`panel5`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel5`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel5`
                })}
              />
            }
            aria-controls={`panel5bh-content`}
            id={`panel5bh-header`}
            onMouseEnter={() => handleHover(`panel5`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              Why does my Steam profile need to be set to public?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1" gutterBottom={true}>
              Wye relies on Steam's public API to get information about your
              online status, owned and recently played games, and avatar image.
              Some of this data is restricted if a profile is not set to public.
              Wye does not store profile data.
            </Typography>
            <Typography variant="body1">
              You can read more about Steam Profile Privacy{" "}
              <Link
                href="https://support.steampowered.com/kb_article.php?ref=4113-YUDH-6401"
                prefetch={false}
              >
                <a
                  id="profile"
                  className={classnames.element("link")}
                  target="_blank"
                >
                  here
                </a>
              </Link>
              .
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel6` || expandAll}
          onChange={handleChange(`panel6`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel6`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel6`
                })}
              />
            }
            aria-controls={`panel6bh-content`}
            id={`panel6bh-header`}
            onMouseEnter={() => handleHover(`panel6`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              How do I find my SteamID?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1">
              You can locate your SteamID by following the steps listed in the
              support article about it{" "}
              <Link
                href="https://support.steampowered.com/kb_article.php?ref=1558-QYAX-1965"
                prefetch={false}
              >
                <a
                  id="steamid"
                  className={classnames.element("link")}
                  target="_blank"
                >
                  here
                </a>
              </Link>
              .
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel7` || expandAll}
          onChange={handleChange(`panel7`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel7`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel7`
                })}
              />
            }
            aria-controls={`panel7bh-content`}
            id={`panel7bh-header`}
            onMouseEnter={() => handleHover(`panel7`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              How do I report a bug?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1">
              Wye has a{" "}
              <Link
                href="https://github.com/n-bryant/wye/issues?state=open"
                prefetch={false}
              >
                <a className={classnames.element("link")} target="_blank">
                  GitHub issue tracker
                </a>
              </Link>{" "}
              where you can report bugs or request features.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={expanded === `panel8` || expandAll}
          onChange={handleChange(`panel8`)}
          className={classnames.element("panel")}
        >
          <ExpansionPanelSummary
            className={classnames.element("panelSummary", {
              expanded: expanded === `panel8`
            })}
            expandIcon={
              <Icon
                path={mdiChevronDown}
                className={classnames.element("expandIcon", {
                  withHovered: hovered === `panel8`
                })}
              />
            }
            aria-controls={`panel8bh-content`}
            id={`panel8bh-header`}
            onMouseEnter={() => handleHover(`panel8`)}
            onMouseLeave={() => handleHover()}
          >
            <Typography
              className={classnames.element("panelSummaryText")}
              variant="h3"
            >
              Why is a game's information different on Wye than on the Steam
              store page?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classnames.element("panelDetails")}>
            <Typography variant="body1">
              Wye utilizes user review data from SteamSpy to determine a user
              rating for a game. This rating is a percentage of positive vs
              negative reviews from SteamSpy's data for the game, and may not
              match the rating found on Steam. Additionally, price information
              is aggregated on a daily basis, so it's possible that the game's
              information is slightly behind.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <IndexPageBackground />
    </div>
  );
};
FaqAccordion.classnames = createClassNameHelper(
  `${JSS_CLASS_NAME_PREFIX}FaqAccordion`
);
FaqAccordion.propTypes = {
  // styles to apply
  classes: PropTypes.shape({
    root: PropTypes.string,
    titleContainer: PropTypes.string,
    title: PropTypes.string,
    faqContainer: PropTypes.string,
    expandAllButton: PropTypes.string,
    panel: PropTypes.string,
    expandIcon: PropTypes.string,
    expandIconWithHovered: PropTypes.string,
    panelSummary: PropTypes.string,
    panelSummaryExpanded: PropTypes.string,
    panelSummaryText: PropTypes.string,
    panelDetails: PropTypes.string,
    link: PropTypes.string
  })
};
FaqAccordion.defaultProps = {
  classes: {}
};

export default withStyles(styles)(FaqAccordion);
