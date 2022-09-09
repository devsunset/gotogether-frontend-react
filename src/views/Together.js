import React from "react";

import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import Pagination from "react-bootstrap-4-pagination";

function Together() {
  const rightalign = {
    float: "right",
    margin: "10px",
    width: "340px",
  };

  let paginationConfig = {
    totalPages: 7,
    currentPage: 3,
    showMax: 5,
    size: "sm",
    threeDots: true,
    prevNext: true,
    onClick: function (page) {
      console.log(page);
      alert(page);
    },
  };

  const footer = {
    backgroundColor: "rgba(0,0,0,.07)",
    float: "center",
    padding: "15px",
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Button
                  variant="success"
                  size="sm"
                  style={{ marginTop: "15px" }}
                >
                  New
                </Button>
                <span style={rightalign}>
                  <InputGroup>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Search"
                    ></Form.Control>
                    <Button variant="info" size="sm">
                      <i className="nc-icon nc-zoom-split" />
                    </Button>
                    <p />
                  </InputGroup>
                </span>
                <p />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0" width="60%">
                        <b>Together</b>
                      </th>
                      <th className="border-0">
                        <b>Progress</b>
                      </th>
                      <th className="border-0">
                        <b>Reply</b>
                      </th>
                      <th className="border-0">
                        <b>View</b>
                      </th>
                      <th className="border-0">
                        <b>Nickname</b>
                      </th>
                      <th className="border-0">
                        <b>Date</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Together</td>
                      <td>1</td>
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

export default Together;
