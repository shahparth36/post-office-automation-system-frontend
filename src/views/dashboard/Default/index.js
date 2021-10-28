import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router";

// material-ui
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// project imports
import PackageCard from "./PackageCard";
import TotalSerivcesCard from "./TotalSerivcesCard";
import { gridSpacing } from "../../../store/constant";
import axios from "../../../axios/axios";
import Loader from "../../../ui-component/Loader";
import CustomerDashboard from "../Customer";
import TextField from "@mui/material/TextField";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [packageId, setPackageId] = useState("");
  const [Package, setPackage] = useState({});
  const [hidden, setHidden] = useState(true);
  const [newLocation, setNewLocation] = useState("");

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

  const toggleAccordion = () => setIsOpen(!isOpen);

  const handleChange = (event) => setPackageId(event.target.value);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const response = await axios.get(`/package/${packageId}`);
      setPackage(response.data);
      setHidden(false);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const updatePackageLocation = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      if (newLocation == "") return;
      const response = await axios.put("/update-package-location", {
        newLocation,
        packageId,
      });
      setPackageId("");
      navigate(`/package/status/${packageId}`);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const updateLocation = (event) => {
    setNewLocation(event.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : role === "Admin" ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <PackageCard isLoading={isLoading} />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TotalSerivcesCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={8}>
                <Accordion expanded={isOpen} onChange={toggleAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5">
                      Update Package Location
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{ marginBottom: "15px" }}>
                      Enter Package ID to update Package's Location
                    </Typography>
                    <FormControl sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-package-id">
                        Package ID
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-package-id"
                        type="text"
                        name="packageId"
                        value={packageId}
                        onChange={handleChange}
                        label="Package ID"
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        marginLeft: "25px",
                        marginTop: "15px",
                        width: 100,
                        height: 50,
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    {!hidden && (
                      <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h3"
                            style={{ marginTop: "15px" }}
                          >
                            Package Status
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider dark />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Package ID: {Package.packageId}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Issuer Name: {Package.userId.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Type of Service: {Package.serviceId.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Status: {getStatus(Package.location)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Source: {Package.location.source}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Destination: {Package.location.destination}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Current Location:{" "}
                            {Package.location.currentLocation === null
                              ? "Not Picked Yet"
                              : Package.location.currentLocation}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Issued At: {getDate(Package.createdDate)}
                          </Typography>
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            id="standard-basic"
                            label="New Current Location"
                            variant="standard"
                            name="newLocation"
                            value={newLocation}
                            onChange={updateLocation}
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginLeft: "20px", marginTop: "10px" }}
                            onClick={updatePackageLocation}
                          >
                            Update
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CustomerDashboard services={services} />
      )}
    </>
  );
};

function getStatus(location) {
  if (location.currentLocation === null) return "Issued";
  if (location.source === location.currentLocation) return "At Source Office";
  else if (location.currentLocation === location.destination)
    return "Reached Destination Office";
  else if (
    location.currentLocation !== location.destination &&
    location.currentLocation !== location.source
  )
    return "In Transit";
}

function getDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export default Dashboard;
