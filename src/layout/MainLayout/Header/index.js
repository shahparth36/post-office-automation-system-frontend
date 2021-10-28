import { useContext } from "react";
import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import ProfileSection from "./ProfileSection";
import postIT from "../../../assets/images/icons/PostITHorizontal.png";

// assets
import { IconMenu2 } from "@tabler/icons";

const Header = ({ user, handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          {/* <LogoSection /> */}
          <img
            style={{ display: "block" }}
            src={postIT}
            width="90"
            height="60"
          />
        </Box>
        <ButtonBase
          sx={{ marginRight: 10, borderRadius: "12px", overflow: "hidden" }}
        >
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <Box sx={{ flexGrow: 1 }} />
      {/* notification & profile */}
      <ProfileSection user={user} />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
