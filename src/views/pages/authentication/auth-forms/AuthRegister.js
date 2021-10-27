import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../../axios/axios";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "../../../../hooks/useScriptRef";
import Google from "../../../../assets/images/icons/social-google.svg";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../../../utils/password-strength";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    contactNo: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("/user", user);
      if (response.data.message === "User created successfully")
        navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <form noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-name-register">
            Name
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-name-register"
            type="text"
            value={user.name}
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-register">
            Email Address
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email-register"
            type="email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-password-register">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-register"
            type={showPassword ? "text" : "password"}
            value={user.password}
            name="password"
            label="Password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{}}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-address-register">
            Address
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-address-register"
            type="text"
            value={user.address}
            name="address"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-city-register">
            City
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-city-register"
            type="text"
            value={user.city}
            name="city"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-contactNo-register">
            Phone Number
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-contactNo-register"
            type="text"
            value={user.contactNo}
            name="contactNo"
            onChange={handleChange}
          />
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign up
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default Register;
