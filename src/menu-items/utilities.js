// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconDashboard,
  IconMailbox,
} from "@tabler/icons";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconDashboard,
  IconMailbox,
};

const utilities = {
  id: "utilities",
  title: "",
  type: "group",
  children: [
    {
      id: "util-dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.IconDashboard,
      breadcrumbs: true,
    },
    {
      id: "util-packages",
      title: "Packages",
      type: "item",
      url: "/packages",
      icon: icons.IconMailbox,
      breadcrumbs: false,
    },
    // {
    //     id: 'util-settings',
    //     title: 'Settings',
    //     type: 'item',
    //     url: '/setting',
    //     icon: icons.IconPalette,
    //     breadcrumbs: false
    // },
    // {
    //     id: 'util-profile',
    //     title: 'Profile',
    //     type: 'item',
    //     url: '/profile',
    //     icon: icons.IconShadow,
    //     breadcrumbs: false
    // },
  ],
};

export default utilities;
