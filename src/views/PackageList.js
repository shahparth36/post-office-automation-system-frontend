import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router";

import axios from "../axios/axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { AuthContext } from "../context/auth.context";
import Loader from "../ui-component/Loader";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "package",
    numeric: true,
    label: "Package ID",
  },
  {
    id: "location",
    numeric: false,
    label: "Current Location",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
  },
  {
    id: "createdDate",
    numeric: true,
    label: "Issued At",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 4 },
        pr: { xs: 1, sm: 1 },
        pt: { sm: 3 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h3"
        id="tableTitle"
        component="div"
      >
        All Packages
      </Typography>
    </Toolbar>
  );
};

function EnhancedTable() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/user-packages");
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

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("packageId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (packageId) => {
    navigate(`/package/status/${packageId}`);
  };

  return (
    // <Box>
    //   <Paper>
    //     <EnhancedTableToolbar/>
    //     <TableContainer>
    //       <Table
    //         aria-labelledby="tableTitle"
    //       >
    //         <EnhancedTableHead
    //           order={order}
    //           orderBy={orderBy}
    //           onRequestSort={handleRequestSort}
    //           rowCount={packages.length}
    //         />
    //         <TableBody>
    //           {/* if you don't need to support IE11, you can replace the `stableSort` call with:
    //              rows.slice().sort(getComparator(order, orderBy)) */}
    //           {stableSort(packages, getComparator(order, orderBy))
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map((row, index) => {
    //               return (
    //                 <TableRow
    //                   hover
    //                   key={row._id}
    //                 >
    //                   <TableCell
    //                     align="right"
    //                   >
    //                     {row.packageId}
    //                   </TableCell>
    //                   <TableCell align="right">{row.location.currentLocation ? row.location.currentLocation : row.location.source}</TableCell>
    //                   <TableCell align="right">{`${getStatus(row.location)}`}</TableCell>
    //                   <TableCell align="right">{`${getDate(row.createdDate)}`}</TableCell>
    //                 </TableRow>
    //               );
    //             })}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <TablePagination
    //       rowsPerPageOptions={[5, 10, 25]}
    //       component="div"
    //       count={packages.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={handleChangePage}
    //       onRowsPerPageChange={handleChangeRowsPerPage}
    //     />
    //   </Paper>
    // </Box>
    <>
      {isLoading ? (
        <Loader />
      ) : isAuthenticated ? (
        <TableContainer component={Paper}>
          <EnhancedTableToolbar />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Package ID</TableCell>
                <TableCell align="center">Current Location</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Issued At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((row) => (
                <TableRow
                  hover
                  key={row._id}
                  onClick={() => handleClick(row.packageId)}
                >
                  <TableCell
                    style={{ color: "#5E35B1" }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.packageId}
                  </TableCell>
                  <TableCell align="center">
                    {row.location.currentLocation
                      ? row.location.currentLocation
                      : "Not Picked Yet"}
                  </TableCell>
                  <TableCell align="center">{`${getStatus(
                    row.location
                  )}`}</TableCell>
                  <TableCell align="center">{`${getDate(
                    row.createdDate
                  )}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default EnhancedTable;
