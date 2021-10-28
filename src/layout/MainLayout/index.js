import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

// project imports
import Breadcrumbs from "../../ui-component/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Customization from "../Customization";
import navigation from "../../menu-items";
import { drawerWidth } from "../../store/constant";
import { SET_MENU } from "../../store/actions";
import { AuthContext } from "../../context/auth.context";
import axios from "../../axios/axios";
import Loader from "../../ui-component/Loader";

// assets
import { IconChevronRight } from "@tabler/icons";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const isLoggedIn = () => {
  return (
    localStorage.getItem("postOfficeAccessToken") !== null &&
    localStorage.getItem("postOfficeAccessToken") !== undefined
  );
};

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/user");
        setUser(response.data);
      } catch (error) {
        console.log(error.response);
        // setMessage(error.response.data.message);
        // navigate('/login')
      }
    }
    setIsLoading(true);
    if (isLoggedIn()) {
      fetchData();
      setIsLoading(false);
    } else {
      navigate("/login");
    }
  }, [matchDownMd]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* header */}
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: theme.palette.background.default,
              transition: leftDrawerOpened
                ? theme.transitions.create("width")
                : "none",
            }}
          >
            <Toolbar>
              <Header
                handleLeftDrawerToggle={handleLeftDrawerToggle}
                user={user}
              />
            </Toolbar>
          </AppBar>

          {/* drawer */}
          <Sidebar
            drawerOpen={leftDrawerOpened}
            drawerToggle={handleLeftDrawerToggle}
            role={user.role}
          />

          {/* main content */}
          <Main theme={theme} open={leftDrawerOpened}>
            {/* breadcrumb */}
            <Outlet />
          </Main>
        </Box>
      )}
    </>
  );
};

export default MainLayout;
