import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

// material-ui
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  InputAdornment,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "../../../store/constant";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import axios from "../../../axios/axios";
import { AuthContext } from "../../../context/auth.context";
import Loader from "../../../ui-component/Loader";
import AdminDashboard from "../Admin";
import CustomerDashboard from "../Customer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [role, setRole] = useState("");

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get("/user");
        setRole(userResponse.data.role);
        const response = await axios.get("/services");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : role === "Admin" ? (
        <AdminDashboard />
      ) : (
        <CustomerDashboard services={services} />
      )}
    </>
  );
};

export default Dashboard;
