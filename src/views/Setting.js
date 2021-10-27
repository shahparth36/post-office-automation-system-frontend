import React from "react";

import { Paper, Typography, Grid, Divider } from "@mui/material";
import { gridSpacing } from "../store/constant";

function Setting() {
  return (
    <Paper style={{ marginTop: "1%" }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography>Change Password</Typography>
        </Grid>
        <Divider />
      </Grid>
    </Paper>
  );
}

export default Setting;
