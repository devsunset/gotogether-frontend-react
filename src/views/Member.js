import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { Form, InputGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap-4-pagination';

import { Spinner } from 'react-spinners-css';

import UserService from '../services/user.service';

function Member() {
  const [showResults, setShowResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [paginationConfig, setPaginationConfig] = useState({
    totalPages: 1,
    currentPage: 0,
    showMax: 5,
    size: 'sm',
    threeDots: true,
    prevNext: true,
    onClick: function (page) {
      console.log(page);
    },
  });
  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState('');
  const [members, setMembers] = useState([]);

  const cardheaderrightalign = {
    float: 'right',
    margin: '10px',
    width: '370px',
  };

  const rightalign = {
    float: 'right',
  };

  const displaynone = {
    display: 'none',
  };
  const cardbgcolor = {
    backgroundColor: 'rgba(0,0,0,.07)',
  };

  const footer = {
    backgroundColor: 'rgba(0,0,0,.07)',
    float: 'center',
    padding: '15px',
  };

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username);
      setNickname(user.nickname);
      setRoles(user.roles[0]);
    }

    getUserInfoList('INIT');
  }, []);

  const getUserInfoList = (flag) => {
    if (flag == 'INIT') {
      setPage(1);

      setPaginationConfig({
        totalPages: 1,
        currentPage: 0,
        showMax: 5,
        size: 'sm',
        threeDots: true,
        prevNext: true,
        onClick: function (page) {
          console.log(page);
        },
      });
    } else {
      setPage(flag);
    }

    setLoading(true);
    UserService.getUserInfoList(page - 1, 5, {
      category: '',
      keyword: keyword,
    }).then(
      (response) => {
        setLoading(false);
        if (response.data.data != null) {
          setMembers(response.data.data.content);

          setPaginationConfig({
            totalPages: response.data.data.number + 1,
            currentPage: response.data.data.totalPages,
            showMax: 10,
            size: 'sm',
            threeDots: true,
            prevNext: true,
            onClick: function (page) {
              getUserInfoList(page);
            },
          });

          let tmp = [];
          response.data.data.content.forEach(function (d) {
            tmp.push(false);
          });

          setShowResults(tmp);
        }
      },
      (error) => {
        setLoading(false);

        setPage(1);

        setPaginationConfig({
          totalPages: 1,
          currentPage: 0,
          showMax: 5,
          size: 'sm',
          threeDots: true,
          prevNext: true,
          onClick: function (page) {
            console.log(page);
          },
        });

        setShowResults([]);

        console.log(
          (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        );
      },
    );
  };

  const onVisible = (idx) => {
    let copyArray = [...showResults];
    if (showResults[idx]) {
      copyArray[idx] = false;
    } else {
      copyArray[idx] = true;
    }
    setShowResults(copyArray);
  };

  return (
    <>
      {loading && (
        <Spinner
          style={{
            position: 'fixed',
            top: '40%',
            left: '60%',
            zIndex: '9999999',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      <Card>
        <Card.Header style={cardbgcolor}>
          <Badge bg="success" text="white">
            기본학습
          </Badge>{' '}
          <Badge bg="danger" text="white">
            업무사용
          </Badge>{' '}
          <Badge bg="warning" text="white">
            {' '}
            관심있음
          </Badge>{' '}
          <Badge bg="primary" text="white">
            Toy Pjt.
          </Badge>{' '}
          <span style={cardheaderrightalign}>
            <Form.Check className="mb-1 pl-0">
              <Form.Check.Label style={{ paddingLeft: '22px' }}>
                <Form.Check.Input type="checkbox"></Form.Check.Input>
                <span className="form-check-sign"></span>
                <b>Detail Display</b>
              </Form.Check.Label>
            </Form.Check>
            <InputGroup>
              <Form.Control
                size="sm"
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
            {members &&
              members.map((member, idx) => (
                <Row key={member.username}>
                  <Col md="12">
                    <Card>
                      <Card.Header
                        style={cardbgcolor}
                        onClick={(e) => onVisible(idx)}
                      >
                        <i className="nc-icon nc-single-02" /> {member.nickname}
                        <span style={rightalign}>
                          {member.modifiedDate.substring(2, 10)}
                        </span>
                        <p />
                      </Card.Header>
                      {showResults[idx] && (
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
                                <td width="10%">
                                  <b>Introduce</b>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {member.introduce}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Note</b>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {member.note}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Github</b>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    <a href={member.github} target="_blank">
                                      {member.github}
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Homepage</b>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    <a href={member.homepage} target="_blank">
                                      {member.homepage}
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Skills</b>
                                </td>
                                <td>
                                  {member.skill &&
                                    member.skill
                                      .split('|')
                                      .map((skill, index) => (
                                        <span
                                          key={index}
                                          style={{ marginRight: '2px' }}
                                        >
                                          <Badge
                                            bg={
                                              skill.split('^')[1] == 'BASIC'
                                                ? 'success'
                                                : skill.split('^')[1] == 'JOB'
                                                ? 'danger'
                                                : skill.split('^')[1] ==
                                                  'INTEREST'
                                                ? 'warning'
                                                : 'primary'
                                            }
                                            text="white"
                                            size="lg"
                                          >
                                            {skill.split('^')[0]}
                                          </Badge>
                                        </span>
                                      ))}
                                </td>
                              </tr>

                              {member.username != username && (
                                <tr>
                                  <td>
                                    <b>
                                      <i
                                        className="nc-icon nc-email-85"
                                        style={{ marginTop: '5px' }}
                                      />
                                      &nbsp; 메모전송
                                    </b>
                                    <br />
                                    <Button variant="success" size="lg">
                                      Send
                                    </Button>
                                  </td>
                                  <td>
                                    <Form.Control
                                      cols="80"
                                      defaultValue=""
                                      placeholder="내용을 입력 하세요..."
                                      rows="2"
                                      as="textarea"
                                    ></Form.Control>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </Card.Body>
                      )}
                    </Card>
                  </Col>
                </Row>
              ))}
          </Container>
        </Card.Body>
        <Card.Footer style={footer}>
          <Pagination {...paginationConfig} />
        </Card.Footer>
      </Card>
    </>
  );
}

export default Member;
