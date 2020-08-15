import React, { useState } from "react";
import FundManagement from "./FundManagement.jsx";
import UserManagement from "./UserManagement.jsx";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default (props) => {
  const [status] = useState(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      {status !== null ? (
        <div>{status === "risk" ? <FundManagement /> : <UserManagement />}</div>
      ) : (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Smart Finance
              </Typography>
              <Button color="inherit" onClick={props.logout}>
                Logout
              </Button>
            </Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Fund Management" />
              <Tab label="User Management" />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <FundManagement />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserManagement />
          </TabPanel>
        </div>
      )}
    </div>
  );
};
