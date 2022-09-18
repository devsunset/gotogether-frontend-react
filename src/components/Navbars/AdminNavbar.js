import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';

import { logout } from '../../slices/auth';
import EventBus from '../../common/EventBus';
import useBus from 'use-bus';
import routes from 'routes.js';

import MemoService from '../../services/memo.service';

function Header() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [memo, setMemo] = useState(0);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on('logout', () => {
      logOut();
    });

    getNotifition();

    return () => {
      EventBus.remove('logout');
    };
  }, [currentUser, logOut]);

  useBus('@@ui/NOTIFITION_REFRESH', () => getNotifition(), []);

  const getNotifition = () => {
    MemoService.getNewReceiveMemo().then(
      (response) => {
        setMemo(response.data.data.MEMO);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMemo(0);
      },
    );
  };

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    var node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            {currentUser && (
              <Nav.Item>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    data-toggle="dropdown"
                    id="dropdown-67443507"
                    variant="default"
                    className="m-2.5"
                  >
                    <i className="nc-icon nc-planet"></i>
                    <span className="notification">{memo}</span>
                    <span className="d-lg-none ml-1"> New Memo</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink
                      to={'/gotogether/memo'}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <span className="no-icon">Show All ({memo})</span>
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            )}

            {currentUser ? (
              <Nav.Item>
                <NavLink
                  to={'/gotogether/login'}
                  className="nav-link"
                  activeClassName="active"
                  onClick={logOut}
                >
                  <span className="no-icon"> Log Out</span>
                </NavLink>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <NavLink
                  to={'/gotogether/login'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <span className="no-icon">Log In</span>
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
