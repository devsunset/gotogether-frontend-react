import React from "react";

import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function Profile() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Introduce</b>
                        </label>
                        <Form.Control
                          defaultValue=""
                          placeholder="한줄 소개"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Note</b>
                        </label>
                        <Form.Control
                          cols="80"
                          defaultValue=""
                          placeholder="자기 소개"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Github</b>
                        </label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Github"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Homepage</b>
                        </label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Homepage"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="pull-right"
                    type="submit"
                    variant="danger"
                  >
                    Submit
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <img
                    className="avatar border-gray"
                    src={require("assets/img/devsunset.jpg")}
                  ></img>
                  <h5 className="title">UserId : devsunset</h5>
                  <h5 className="title">Nickname : devsunset</h5>
                </div>
              </Card.Body>
              <hr></hr>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
