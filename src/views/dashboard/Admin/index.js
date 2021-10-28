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
import { gridSpacing } from "../../../store/constant";
import axios from "../../../axios/axios";
import Loader from "../../../ui-component/Loader";

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

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    source: "",
    destination: "",
    serviceName: "",
  });
  const [services, setServices] = useState([]);
  const [packageId, setPackageId] = useState("");

  const [isIssueRequestOpen, setIsIssueRequestOpen] = useState(true);
  const [isTrackRequestOpen, setIsTrackRequestOpen] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/services");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("/send-package", request);
      // setMessage('Issued Request Successfully');
      setRequest({
        source: "",
        destination: "",
        serviceName: "",
      });
      navigate(`/package/receipt/${response.data.packageId}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const handleTrackRequest = (event) => {
    setPackageId(event.target.value);
  };

  const handleAccordionChange = () => {
    setIsIssueRequestOpen(!isIssueRequestOpen);
  };

  const handleTrackRequestAccordionChange = () => {
    setIsTrackRequestOpen(!isTrackRequestOpen);
  };

  const handleCheckStatus = async (event) => {
    try {
      navigate(`/package/status/${packageId}`);
      // const response = await axios.get(`/package/${packageId}`);
      // console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}></Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}></Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AdminDashboard;
