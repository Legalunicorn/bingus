import { IconHeart, IconHomeFilled,IconMessages,IconSettings,IconSquareRoundedPlus,IconUserCircle,IconUserSearch } from "@tabler/icons-react";

export const sidebarData = [
    {
        name:"Home",
        icon: IconHomeFilled,
        link:"/home"
    },
    {
        name:"Create",
        icon: IconSquareRoundedPlus,
        link:"/create"
    },
    {
        name:"Users",
        icon: IconUserSearch,
        link:"/search"
    },
    {
        name:"Messages",
        icon: IconMessages,
        link:"/message"
    },
    { //i didnt want to deal with this yet so removed it
    // there was a big pain point of unliking post without invaliding the like feed,due to using a general hook for liking
        name:"Likes",
        icon: IconHeart,
        link:"/likes"
    },
    {
        name:"profile",
        icon: IconUserCircle,
        link:"/view-profile"
    },
    {
        name:"Settings",
        icon:IconSettings
    }
]