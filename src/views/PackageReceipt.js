import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router";

import { Typography, Paper, Grid, Divider } from "@mui/material";
import { gridSpacing } from "../store/constant";
import axios from "../axios/axios";
import { AuthContext } from "../context/auth.context";
import Loader from "../ui-component/Loader";

function PackageReceipt() {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [Package, setPackage] = useState({});

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const packageId = params.packageId;
        if (!params.packageId) {
          navigate("/dashboard");
        } else {
          const response = await axios.get(`/package/${packageId}`);
          setPackage(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isAuthenticated ? (
        <Paper
          style={{
            padding: "15px",
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h3" style={{ textAlign: "center" }}>
                Package Receipt
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider dark />
            </Grid>
            <Grid item xs={12}>
              <Typography>Package ID: {Package.packageId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Issuer Name: {Package.userId.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Type of Service: {Package.serviceId.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Status: {getStatus(Package.location)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Source: {Package.location.source}</Typography>
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
              <Typography>Issued At: {getDate(Package.createdDate)}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

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

export default PackageReceipt;
