import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import DevicesIcon from '@material-ui/icons/Devices';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import ArchiveIcon from '@material-ui/icons/Archive';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {Container, Nav, NavItem, NavLink} from 'reactstrap';
import * as nav from  "../appnav";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <BrowserRouter>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemLink href="/signin">
        <ListItemText primary="Search" />
      </ListItemLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemLink href="/">
        <ListItemText primary="News" />
      </ListItemLink>
        <NavItem>
            <NavLink><Link to="/about-us">Home</Link></NavLink>
        </NavItem>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemLink href="/">
       <ListItemText primary="Favorite" />
      </ListItemLink>
    </ListItem>
  </div>
  </BrowserRouter>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>More</ListSubheader>
    <ListItemLink href="/about-us">
    <ListItemIcon>
        <BusinessIcon />
    </ListItemIcon>
    <ListItemText primary="About" />
    </ListItemLink>
  </div>
);