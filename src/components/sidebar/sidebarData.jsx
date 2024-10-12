import {
  IconHeart,
  IconHomeFilled,
  IconMessages,
  IconSettings,
  IconSquareRoundedPlus,
  IconUserCircle,
  IconUserSearch,
} from "@tabler/icons-react";

export const sidebarData = [
  {
    name: "Home", //display name
    icon: IconHomeFilled,
    link: "/home",
  },
  {
    name: "Create",
    icon: IconSquareRoundedPlus,
    link: "/create",
  },
  {
    name: "Users",
    icon: IconUserSearch,
    link: "/search",
  },
  {
    name: "Message",
    icon: IconMessages,
    link: "/message",
  },
  {
    name: "Likes",
    icon: IconHeart,
    link: "/likes",
  },
  {
    name: "profile",
    icon: IconUserCircle,
    link: "/view-profile",
  },
  {
    name: "Settings",
    icon: IconSettings,
    link: "/settings",
  },
];
