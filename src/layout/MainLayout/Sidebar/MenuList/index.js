// material-ui
import { Typography } from "@mui/material";
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconDashboard,
  IconMailbox,
} from "@tabler/icons";

// project imports
import NavGroup from "./NavGroup";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconDashboard,
  IconMailbox,
};

const adminSidebar = {
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
      breadcrumbs: false,
    },
    {
      id: "util-services",
      title: "Services",
      type: "item",
      url: "/services",
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

const userSidebar = {
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

const adminItems = {
  items: [adminSidebar],
};

const userItems = {
  items: [userSidebar],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = ({ role }) => {
  let navItems, menuItem;
  if (role === "Admin" || role === "User") {
    if (role === "Admin") menuItem = adminItems;
    else menuItem = userItems;
    navItems = menuItem.items.map((item) => {
      switch (item.type) {
        case "group":
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
  }

  return <>{navItems}</>;
};

export default MenuList;
