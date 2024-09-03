import { IconHeart, IconHomeFilled,IconMessages,IconSettings,IconSquareRoundedPlus,IconUserSearch } from "@tabler/icons-react";

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
        link:"/users"
    },
    {
        name:"Messages",
        icon: IconMessages,
        link:"/message"
    },
    {
        name:"Likes",
        icon: IconHeart,
        link:"/likes"
    },
    {
        name:"Settings",
        icon:IconSettings
    }
]