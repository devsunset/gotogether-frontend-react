import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Card,
  Button,
  Table,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Badge,
} from 'react-bootstrap';
import Notify from 'react-notification-alert';
import Pagination from 'react-bootstrap-4-pagination';
import { Spinner } from 'react-spinners-css';

import UserService from '../services/user.service';
import MemoService from '../services/memo.service';

function Member() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [showResults, setShowResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [members, setMembers] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const notiRef = useRef();
  const memoRefs = useRef([]);

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
            if (checkAll) {
              tmp.push(true);
            } else {
              tmp.push(false);
            }
          });

          setShowResults(tmp);
        }
      },
      (error) => {
        setLoading(false);

        setPage(1);

        setMembers([]);

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

  const handleCheckAllChange = (e) => {
    setCheckAll(e.target.checked);

    let copyArray = [...showResults];
    copyArray.forEach(function (d, idx) {
      if (checkAll) {
        copyArray[idx] = false;
      } else {
        copyArray[idx] = true;
      }
    });
    setShowResults(copyArray);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getUserInfoList('INIT');
    }
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

  const sendMemo = (idx, receiver) => {
    var successOption = {
      place: 'br',
      message: (
        <div>
          <div>Success.</div>
        </div>
      ),
      type: 'primary',
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 2,
    };

    var failOption = {
      place: 'br',
      message: (
        <div>
          <div>Fail.</div>
        </div>
      ),
      type: 'danger',
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 2,
    };

    if (memoRefs.current[idx].value == '') {
      notiRef.current.notificationAlert({
        place: 'br',
        message: (
          <div>
            <div>메모 내용을 입력해 주세요.</div>
          </div>
        ),
        type: 'warning',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: 2,
      });
      memoRefs.current[idx].focus();
      return;
    }

    setLoading(true);
    MemoService.sendMemo({
      memo: memoRefs.current[idx].value.trim(),
      receiver: receiver,
    }).then(
      (response) => {
        setLoading(false);
        if (response.data.result == 'S') {
          notiRef.current.notificationAlert(successOption);
          memoRefs.current[idx].value = '';
        } else {
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
        setLoading(false);
        notiRef.current.notificationAlert(failOption);
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString(),
        );
      },
    );
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
                <Form.Check.Input
                  type="checkbox"
                  defaultChecked={checkAll}
                  onChange={handleCheckAllChange}
                ></Form.Check.Input>
                <span className="form-check-sign"></span>
                <b>Detail Display</b>
              </Form.Check.Label>
            </Form.Check>

            <InputGroup>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Search"
                defaultValue={keyword}
                onKeyPress={handleKeyPress}
                onChange={handleKeywordChange}
              ></Form.Control>
              <Button
                variant="info"
                size="sm"
                onClick={(e) => getUserInfoList('INIT')}
              >
                <i className="nc-icon nc-zoom-split" />
              </Button>
              <p />
            </InputGroup>
          </span>
          <p />
        </Card.Header>
        <Card.Body>
          <Container fluid>
            {members.length == 0 && (
              <Col md="12" style={{ textAlign: 'center' }}>
                <Alert className="alert-with-icon" variant="primary">
                  <span data-notify="icon" className="nc-icon nc-atom"></span>
                  <span>No Data.</span>
                </Alert>
              </Col>
            )}
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
                                    <Button
                                      variant="success"
                                      size="lg"
                                      onClick={(e) =>
                                        sendMemo(idx, member.username)
                                      }
                                    >
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
                                      ref={(el) => (memoRefs.current[idx] = el)}
                                      onChange={(e) =>
                                        handleMemoChange(idx, e.target.value)
                                      }
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
      <Notify ref={notiRef} />
    </>
  );
}

export default Member;
