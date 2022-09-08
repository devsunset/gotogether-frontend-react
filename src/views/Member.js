import React from "react";


import { Card, Button, Table, Container, Row, Col } from "react-bootstrap";

function Member() {

   const [showResults, setShowResults] = React.useState(false)

   const onVisible=()=>{
      if(showResults){
        setShowResults(false);
      }else{
        setShowResults(true);
      }
      
    }

   const rightalign = {
      float: "right",
    }
   const margintable = {
      border: "1px solid #dee2e6",
    }
    const displaynone = {
      display: "none",
    }
    const cardbgcolor = {
      backgroundColor : 'rgba(0,0,0,.03)',
    }

    const success = {
      backgroundColor: "#28a745",
      display: "inline-block",
      padding: ".25em .4em",
      fontSize: "75%",
      color: "#ffffff",
      fontWeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: ".25rem",
      marginRight:"3px",
    }

    const danger = {
      backgroundColor: "#dc3545",
      display: "inline-block",
      padding: ".25em .4em",
      fontSize: "75%",
      color: "#ffffff",
      fontWeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: ".25rem",
      marginRight:"3px",
    }

    const warning = {
      backgroundColor: "#ffc107",
      display: "inline-block",
      padding: ".25em .4em",
      fontSize: "75%",
      color: "#ffffff",
      fontWeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: ".25rem",
      marginRight:"3px",
    }

    const primary = {
      backgroundColor: "#007bff",
      display: "inline-block",
      padding: ".25em .4em",
      fontSize: "75%",
      color: "#ffffff",
      fontWeight: "700",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: ".25rem",
      marginRight:"3px",
    }


  return (
    <>
    <Card>
    <Card.Header style={cardbgcolor}>
    <span style={success}>기본 학습</span><span style={danger}>업무 사용</span><span style={warning}>관심 있음</span><span style={primary}>Toy Pjt.</span>
       
       <span style={rightalign}>22.08.24</span><p/>
    </Card.Header>
    <Card.Body>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header style={cardbgcolor} onClick={onVisible}>
                 <i className="nc-icon nc-single-02" /> devsunset    <span style={rightalign}>22.08.24</span><p/>
                </Card.Header>
               {showResults &&  <Card.Body>
                  <Table className="table-striped" style={margintable} width="80%">
                    <thead style={displaynone}>
                      <tr>
                        <th className="border-0">
                        </th>
                        <th className="border-0">
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td width="15%"><b>Introduce</b></td>
                        <td>22.08.24 10:59</td> 
                      </tr>
                      <tr>
                        <td><b>Note</b></td>
                        <td>22.08.24 10:59</td>
                      </tr>
                      <tr>
                        <td><b>Github</b></td>
                        <td>22.08.24 10:59</td>
                      </tr>
                      <tr>
                        <td><b>Homepage</b></td>
                        <td>22.08.24 10:59</td>
                      </tr>
                      <tr>
                        <td><b>Skills</b></td>
                        <td>22.08.24 10:59</td>
                      </tr>
                      <tr>
                        <td><b>메모전송</b></td>
                        <td>22.08.24 10:59</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              }
              </Card>
            </Col>
          </Row>
        </Container>
       </Card.Body>
       <Card.Footer style={cardbgcolor}>
        aaaa
       </Card.Footer>
      </Card>
    </>
  );
}

export default Member;
