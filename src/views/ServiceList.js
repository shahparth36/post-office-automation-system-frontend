import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useTheme } from "@mui/material/styles";
import axios from "../axios/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Loader from "../ui-component/Loader";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Divider, Input } from "@mui/material";

const EnhancedTableToolbar = ({ handleSubmit }) => {
  const theme = useTheme();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");

  const toggleAddService = () => setIsAddServiceOpen(!isAddServiceOpen);

  const handleChange = (event) => setServiceName(event.target.value);

  const addService = () => {
    handleSubmit(serviceName);
    toggleAddService();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 4 },
        pr: { xs: 1, sm: 1 },
        pt: { sm: 3 },
      }}
    >
      <Typography
        // sx={{ flex: "1 1 100%" }}
        variant="h3"
        id="tableTitle"
        component="div"
      >
        All Services
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        style={{ marginLeft: "auto", marginRight: "10px" }}
        onClick={toggleAddService}
      >
        Add Service
      </Button>
      <Dialog open={isAddServiceOpen} onClose={toggleAddService}>
        <DialogTitle>Service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a Service, please enter the service name here.
          </DialogContentText>
          <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-service">
              Service Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-service"
              type="text"
              name="service"
              value={serviceName}
              onChange={handleChange}
              label="Service Name"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddService}>Cancel</Button>
          <Button color="secondary" onClick={addService}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/services");
        console.log(response.data);
        setPackages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (serviceName) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/service", { serviceName });
      console.log(response.data);
      setPackages([...packages, response.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <EnhancedTableToolbar handleSubmit={handleSubmit} />
          <Divider />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((row) => (
                <TableRow hover key={row._id}>
                  <TableCell
                    style={{ color: "#5E35B1" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{`${getDate(
                    row.createdDate
                  )}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

function getDate(date) {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export default EnhancedTable;
