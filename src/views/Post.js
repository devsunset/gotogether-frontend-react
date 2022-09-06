import React from "react";

import { Card, Table, Container, Row, Col } from "react-bootstrap";

function Post() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4"></Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0" width="60%">
                        Talk
                      </th>
                      <th className="border-0">Reply</th>
                      <th className="border-0">View</th>
                      <th className="border-0">Nickname</th>
                      <th className="border-0">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Talk 게시판</td>
                      <td>1</td>
                      <td>1</td>
                      <td>devsunset</td>
                      <td>22.08.24 10:59</td>
                    </tr>
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

export default Post;
