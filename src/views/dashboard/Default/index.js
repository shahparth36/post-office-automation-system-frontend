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
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Accordion
                  expanded={isIssueRequestOpen}
                  onChange={handleAccordionChange}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Issue Requests</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={gridSpacing}>
                      <Grid item md={6} xs={12}>
                        <FormControl
                          sx={{
                            ...theme.typography.customInput,
                            width: "100%",
                          }}
                        >
                          <InputLabel htmlFor="outlined-adornment-source-city-name">
                            From City
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-source-city-name"
                            type="text"
                            name="source"
                            value={request.source}
                            onChange={handleChange}
                            label="From City"
                            inputProps={{}}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl
                          sx={{
                            ...theme.typography.customInput,
                            width: "100%",
                          }}
                        >
                          <InputLabel htmlFor="outlined-adornment-source-city-name">
                            To City
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-source-city-name"
                            type="text"
                            name="destination"
                            value={request.destination}
                            onChange={handleChange}
                            label="To City"
                            inputProps={{}}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <FormControl sx={{ width: 300 }}>
                          <InputLabel id="demo-multiple-name-label">
                            Service
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={request.serviceName}
                            onChange={handleChange}
                            name="serviceName"
                            input={<OutlinedInput label="City" />}
                            MenuProps={MenuProps}
                          >
                            {services.map((service) => (
                              <MenuItem key={service._id} value={service.name}>
                                {service.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        {/* Button goes here */}
                        <Button
                          size="medium"
                          type="submit"
                          variant="contained"
                          color="secondary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Accordion
                  expanded={isTrackRequestOpen}
                  onChange={handleTrackRequestAccordionChange}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Track Request</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={gridSpacing}>
                      <Grid item md={6} xs={12}>
                        <FormControl
                          sx={{
                            ...theme.typography.customInput,
                            width: "100%",
                          }}
                        >
                          <InputLabel htmlFor="outlined-adornment-package-id">
                            Enter Package ID
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-package-id"
                            type="text"
                            name="packageId"
                            value={packageId}
                            onChange={handleTrackRequest}
                            label="From City"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Button
                          size="medium"
                          type="submit"
                          variant="contained"
                          color="secondary"
                          onClick={handleCheckStatus}
                        >
                          Check Status
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
