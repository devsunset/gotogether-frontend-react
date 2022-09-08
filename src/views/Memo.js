import React, { Component } from "react";
import {
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  Button,
} from "react-bootstrap";

function Memo() {
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

  return (
    <>
      <Card>
        <Card.Header style={cardbgcolor}>
          <span>
            <InputGroup>
              <Form.Check className="mb-1 pl-0">
                <Form.Check.Label
                  style={{ paddingLeft: "65px", paddingRight: "22px" }}
                >
                  <Form.Check.Input type="checkbox"></Form.Check.Input>
                  <span className="form-check-sign"></span>
                  <Button variant="danger" size="sm" style={{ height: "25px" }}>
                    Delete
                  </Button>
                </Form.Check.Label>
              </Form.Check>
            </InputGroup>
          </span>
          <span style={rightalign}>
            <InputGroup>
              <Form.Check className="mb-1 pl-0">
                <Form.Check.Label
                  style={{ paddingLeft: "0px", paddingRight: "22px" }}
                >
                  <Form.Check.Input type="checkbox"></Form.Check.Input>
                  <span className="form-check-sign"></span>
                  <b>Detail Display</b>
                </Form.Check.Label>
              </Form.Check>
              <Form.Select>
                <option value="R">수신 메모함</option>
                <option value="S">발신 메모함</option>
              </Form.Select>
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
                    <span>
                      <Form.Check className="mb-1 pl-0">
                        <Form.Check.Label>
                          <Form.Check.Input type="checkbox"></Form.Check.Input>
                          <span className="form-check-sign"></span>
                          <i
                            className="nc-icon nc-email-85"
                            style={{ marginTop: "5px" }}
                          />
                        </Form.Check.Label>
                        {"  "}devsunset
                        <span style={rightalign}>22.08.24</span>
                      </Form.Check>
                    </span>
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
                              <b>Memo</b>
                            </td>
                            <td>........</td>
                          </tr>
                          <tr>
                            <td>
                              <b>전송</b>
                            </td>
                            <td>.....</td>
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
        <Card.Footer style={cardbgcolor}>paging...</Card.Footer>
      </Card>
    </>
  );
}

export default Memo;
