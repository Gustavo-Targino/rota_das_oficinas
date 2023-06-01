import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import styles from "./Topo.module.css";

import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CalculateIcon from '@mui/icons-material/Calculate';
import GamepadIcon from '@mui/icons-material/Gamepad';
import HomeIcon from '@mui/icons-material/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA400",
    },
  },
});

export default function Topo() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Início", "Conversor de números romanos", "Jogo da Vida", "Divisor de conta de restaurante"].map((text, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton>
                <Link style={{display:'flex'}} className={styles.link}  to={
                index === 0
                  ? "/"
                  : index === 1
                  ? "/conversor"
                  : index === 2
                  ? "/jogodavida"
                  : index === 3
                  ? '/divisor'
                  : ''
              }>
                
              <ListItemIcon>
                {index === 0 ? <HomeIcon/> 
                : index === 1 ? (
                  <CalculateIcon />
                ) : index === 2 ? (
                    <GamepadIcon />
                ) : (
                    <CalculateIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "#FFA400" }} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const renderMobileMenu = (
    <Drawer
      anchor={"right"}
      open={state["right"]}
      onClose={toggleDrawer("right", false)}
    >
      {list("right")}
    </Drawer>
  );

  // backgroundColor: 'transparent',
  // backdropFilter:"blur(10px)",
  // color:"#fff",
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "5rem" }}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          padding: { md: "0.5rem", xs: "0rem" },
          
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {xs:'space-between', md:'space-around'},
            backgroundColor: "transparent",
            
          }}
        >
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
              }}
              src="/brand_logo.svg"
            />
            
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex", sm: "none" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <MenuItem>
                <Link to="/" className={styles.link}>
                  <Typography>Início</Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/conversor" className={styles.link}>
                  <Typography>Conversor</Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/jogodavida" className={styles.link}>
                  <Typography>Jogo da vida</Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/divisor" className={styles.link}>
                  <Typography>Divisor</Typography>
                </Link>
              </MenuItem>

    
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              position: "fixed",
              left: "90%",
            }}
          >
            <IconButton
              size="small"
              onClick={toggleDrawer("right", true)}
              color="inherit"
            >
              <ThemeProvider theme={theme}>
                <MenuIcon color="primary" />
              </ThemeProvider>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
