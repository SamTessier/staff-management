import React, { useState, useContext } from "react";
import {
  IconButton,
  Grid,
  Tooltip,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StudentDetails from "./StudentDetails";
import { getStudents, getStaff } from "../localStorageDB";
import { AuthContext } from '../AuthContext';

const MainScreen = () => {
  const { logOut } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  let data = searchTerm !== "" ? [...getStudents(), ...getStaff()] : [];
  data = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogOut = () => {
    logOut();
  };
  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <Box
      border={1}
      borderColor="grey.500"
      borderRadius={2}
      p={3}
      m={2}
      bgcolor="grey.100"
    >
      <Grid
        container
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item>
              <IconButton color="primary" component={Link} to="/schools">
                <HomeIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Schools
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" component={Link} to="/staff">
                <WorkIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Staff
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" component={Link} to="/students">
                <PeopleIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Students
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Log out">
                <IconButton color="primary" onClick={handleLogOut}>
                  <ExitToAppIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Typography variant="caption" display="block" textAlign="center">
                Log Out
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            {showSearch ? (
              <TextField
                variant="outlined"
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "80%" }}
                onBlur={() => setShowSearch(false)}
              />
            ) : (
              <IconButton onClick={() => setShowSearch(true)}>
                <SearchIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2} alignItems="center">
            {searchTerm &&
              data.map((item, index) => (
                <Grid
                  key={index}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="body1">{item.name}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="primary"
                      onClick={() => handleDetailsOpen(item)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        {selectedStudent && (
          <StudentDetails
            student={selectedStudent}
            open={detailsOpen}
            handleClose={handleDetailsClose}
            handleDelete={() => {}}
            handleEdit={() => {}}
          />
        )}
      </Grid>
    </Box>
  );
};

export default MainScreen;
