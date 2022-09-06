import React from "react";

import { Card, Container, Row, Col } from "react-bootstrap";

function Member() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Member</Card.Title>
                <p className="card-category">Member</p>
              </Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Member;
