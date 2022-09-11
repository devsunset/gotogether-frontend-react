import React, { Component } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from 'react-bootstrap';

import logo from 'assets/img/devsunset.jpg';

function Sidebar({ color, image, routes }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: 'url(' + image + ')',
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <NavLink
            to={'/gotogether/home'}
            className="nav-link"
            activeClassName="active"
          >
            <span className="logo-img">
              <img src={require('assets/img/devsunset.jpg')} /> &nbsp; Go
              Together
            </span>
          </NavLink>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.invisible) return null;
            if (prop.path == '/memo' || prop.path == '/profile') {
              if (!currentUser) {
                return null;
              }
            }

            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? 'active active-pro'
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
