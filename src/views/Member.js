import React, { Component } from "react";
import { Card, Button, Table, Container, Row, Col } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap-4-pagination";

function Member() {
  const [showResults, setShowResults] = React.useState(false);

  const onVisible = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };

  const rightalign = {
    float: "right",
    margin: "10px",
  };

  const displaynone = {
    display: "none",
  };
  const cardbgcolor = {
    backgroundColor: "rgba(0,0,0,.07)",
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

  return (
    <>
      <Card>
        <Card.Header style={cardbgcolor}>
          <Badge bg="success" text="white">
            기본학습
          </Badge>{" "}
          <Badge bg="danger" text="white">
            업무사용
          </Badge>{" "}
          <Badge bg="warning" text="white">
            {" "}
            관심있음
          </Badge>{" "}
          <Badge bg="primary" text="white">
            Toy Pjt.
          </Badge>{" "}
          <span style={rightalign}>
            <Form.Check className="mb-1 pl-0">
              <Form.Check.Label style={{ paddingLeft: "22px" }}>
                <Form.Check.Input
                  defaultChecked
                  type="checkbox"
                ></Form.Check.Input>
                <span className="form-check-sign"></span>
                <b>Detail Display</b>
              </Form.Check.Label>
            </Form.Check>
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
        <Card.Body>
          <Container fluid>
            <Row>
              <Col md="12">
                <Card>
                  <Card.Header style={cardbgcolor} onClick={onVisible}>
                    <i className="nc-icon nc-single-02" /> devsunset{" "}
                    <span style={rightalign}>22.08.24</span>
                    <p />
                  </Card.Header>
                  {showResults && (
                    <Card.Body>
                      <Table bordered width="80%">
                        <thead style={displaynone}>
                          <tr>
                            <th className="border-0"></th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td width="15%">
                              <b>Introduce</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Note</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Github</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Homepage</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Skills</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                          <tr>
                            <td>
                              <b>메모전송</b>
                            </td>
                            <td>22.08.24 10:59</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  )}
                </Card>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer style={cardbgcolor}>
          <Pagination {...paginationConfig} />
        </Card.Footer>
      </Card>
    </>
  );
}

export default Member;
