import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {
  render() {

    return (
      <div>
        <div className='NavBar' style={{backgroundColor: '#978344'}}>
          <AppBar position="static" style={{backgroundColor: '#978344'}}>
            <Toolbar>
              <IconButton edge="start" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Altrue
              </Typography>
              <Link to="/login"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    color: "white"
                  }}>Login</Link>
              <Link to="/register"
                style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    color: "white"
                  }}>Register</Link>
              <Link
                to="/registerManager"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "white"
                }}
                >Register as Manager
              </Link>
              <Link
                to="/loginManager"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "white"
                }}
                >Manager Login
              </Link>
              <Link
                to="/loginAdmin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  color: "white"
                }}
                >Admin Login
              </Link>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    )
  }
}

export default NavBar
