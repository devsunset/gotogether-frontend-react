import React, { useState, useEffect } from 'react';
import { Alert, Card, Table, Container, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';

import CommonService from '../services/common.service';

function Home() {
  const [notice, setNotice] = useState('');
  const [together, setTogether] = useState(0);
  const [user, setUser] = useState(0);
  const [talk, setTalk] = useState(0);
  const [qa, setQa] = useState(0);
  const [recentTogether, setRecentTogether] = useState([]);

  useEffect(() => {
    CommonService.getHome().then(
      (response) => {
        setTogether(response.data.data.TOGETHER);
        setUser(response.data.data.USER);
        setTalk(response.data.data.TALK);
        setQa(response.data.data.QA);
        setNotice(response.data.data.NOTICE);
        setRecentTogether(response.data.data.RECENT_TOGETHER);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setNotice(_content);
      },
    );
  }, []);

  const handleClick = (id) => {
    alert(id);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chat-round text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Together</b>
                      </p>
                      <NavLink
                        to={'/gotogether/together'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <Card.Title as="h2">{together}</Card.Title>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <NavLink
                  to={'/gotogether/together'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    <b>More Info</b>
                  </div>
                </NavLink>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-circle-09 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Member</b>
                      </p>
                      <NavLink
                        to={'/gotogether/member'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <Card.Title as="h2">{user}</Card.Title>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <NavLink
                  to={'/gotogether/member'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    <b>More Info</b>
                  </div>
                </NavLink>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-notes text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Talk</b>
                      </p>
                      <NavLink
                        to={'/gotogether/post?category=TALK'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <Card.Title as="h2">{talk}</Card.Title>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <NavLink
                  to={'/gotogether/post?category=TALK'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    <b>More Info</b>
                  </div>
                </NavLink>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-zoom-split text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Q&A</b>
                      </p>
                      <NavLink
                        to={'/gotogether/post?category=QA'}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <Card.Title as="h2">{qa}</Card.Title>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <NavLink
                  to={'/gotogether/post?category=QA'}
                  className="nav-link"
                  activeClassName="active"
                >
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    <b>More Info</b>
                  </div>
                </NavLink>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        {notice && (
          <Row>
            <Col md="12">
              <Alert className="alert-with-icon" variant="primary">
                <span data-notify="icon" className="nc-icon nc-bell-55"></span>
                <span>{notice}</span>
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Recent Together Top 3</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0" width="70%">
                        <b>Together</b>
                      </th>
                      <th className="desktop">
                        <b>Progress</b>
                      </th>
                      <th className="desktop">
                        <b>View</b>
                      </th>
                      <th className="desktop">
                        <b>Date</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTogether.length == 0 && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                          No Data.
                        </td>
                      </tr>
                    )}

                    {recentTogether.map((data) => (
                      <tr
                        key={data.togetherId}
                        data-item={data.togetherId}
                        onClick={(e) => handleClick(data.togetherId)}
                      >
                        <td className="ellipsisMobile">{data.title}</td>
                        <td>
                          {data.progressLegend == 'danger' && (
                            <ProgressBar
                              variant="danger"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'warning' && (
                            <ProgressBar
                              variant="warning"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'primary' && (
                            <ProgressBar
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'success' && (
                            <ProgressBar
                              variant="success"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}
                        </td>
                        <td className="desktop">{data.hit}</td>
                        <td className="desktop">
                          {data.createdDate.substring(2, 10)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
