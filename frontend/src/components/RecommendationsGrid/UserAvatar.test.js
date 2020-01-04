import { UserAvatar } from "./UserAvatar";

describe("UserAvatar", () => {
  const props = {
    classes: {
      root: "root",
      tooltip: "tooltip",
      avatarContainer: "avatarContainer",
      image: "image",
      tooltipHeading: "tooltipHeading",
      name: "name",
      link: "link",
      icon: "icon"
    },
    data: {
      id: "1",
      profileUrl: "profileUrl",
      avatarName: "avatarName",
      avatarImageUrl: "avatarImageUrl",
      onlineStatus: "onlineStatus"
    }
  };

  it("should render successfully", () => {
    const wrapper = shallow(<UserAvatar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
