import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';

import UserService from '../services/user.service';

function Profile() {
  const history = useHistory();
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    // return <Redirect to="/gotogether/home" />;
    history.push(`/gotogether/home`);
  }

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [userInfoId, setUserInfoId] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [note, setNote] = useState('');
  const [github, setGithub] = useState('');
  const [homepage, setHomepage] = useState('');
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleIntroduceChange = (e) => {
    setIntroduce(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const handleHomepageChange = (e) => {
    setHomepage(e.target.value);
  };

  const handleDeleteClick = (idx) => {
    var array = [...skills];
    console.log(array.splice(idx, 1));
    setSkills(array);
    // console.log(array);
    // console.log(skills);
  };

  const itemInput = useRef();
  const levelSelect = useRef();

  const handleAddClick = () => {
    if (itemInput.current.value.trim() == '') {
      notiRef.current.notificationAlert({
        place: 'br',
        message: (
          <div>
            <div>Skill을 입력해 주세요.</div>
          </div>
        ),
        type: 'warning',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: 2,
      });
      itemInput.current.focus();
      return;
    }

    setSkills([
      ...skills,
      { item: itemInput.current.value, level: levelSelect.current.value },
    ]);

    itemInput.current.value = '';
    levelSelect.current.value = 'INTEREST';
  };

  const handleSubmit = () => {
    handleShow();
  };

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username);
      setNickname(user.nickname);
      setRoles(user.roles[0]);
    }

    UserService.getUserInfo().then(
      (response) => {
        if (response.data.data != null) {
          setUserInfoId(response.data.data.userInfoId);
          setIntroduce(response.data.data.introduce);
          setNote(response.data.data.note);
          setGithub(response.data.data.github);
          setHomepage(response.data.data.homepage);
          if (
            !(
              response.data.data.skill === undefined ||
              response.data.data.skill == null ||
              response.data.data.skill === ''
            )
          ) {
            var data = response.data.data.skill.split('|');
            let item = [];
            data.forEach(function (d) {
              var datasub = d.split('^');
              item.push({ item: datasub[0], level: datasub[1] });
            });
            setSkills(item);
          }
        }
      },
      (error) => {
        console.log(
          (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        );
      },
    );
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const notiRef = useRef();

  const handleYesClose = () => {
    setShow(false);

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

    let temp = '';
    skills.forEach(function (d) {
      let tmp = d.item.trim().replace(/\|/g, '').replace(/\^/g, '');
      if (tmp != '') {
        temp += tmp + '^' + d.level + '|';
      }
    });

    if (temp != '') {
      temp = temp.substring(0, temp.length - 1);
    }

    setLoading(true);
    UserService.setUserInfoSave({
      introduce: introduce,
      note: note,
      github: github,
      homepage: homepage,
      skill: temp,
    }).then(
      (response) => {
        setLoading(false);
        if (response.data.result == 'S') {
          notiRef.current.notificationAlert(successOption);
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
  const handleShow = () => {
    setShow(true);
  };

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
                          defaultValue={introduce}
                          onChange={handleIntroduceChange}
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
                          defaultValue={note}
                          onChange={handleNoteChange}
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
                          defaultValue={github}
                          onChange={handleGithubChange}
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
                          defaultValue={homepage}
                          onChange={handleHomepageChange}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Table
                        className="table-hover table-striped borded"
                        variant="dark"
                      >
                        <thead>
                          <tr>
                            <th className="border-0">
                              <b>SKILL</b>
                            </th>
                            <th className="border-0">
                              <b>LEVEL</b>
                            </th>
                            <th className="border-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {skills &&
                            skills.map((data, index) => (
                              <tr key={index}>
                                <td>{data.item}</td>
                                <td>
                                  {data.level == 'BASIC' && (
                                    <Badge bg="success" text="white" size="lg">
                                      기본학습
                                    </Badge>
                                  )}
                                  {data.level == 'JOB' && (
                                    <Badge bg="danger" text="white" size="lg">
                                      업무사용
                                    </Badge>
                                  )}
                                  {data.level == 'INTEREST' && (
                                    <Badge bg="warning" text="white" size="lg">
                                      관심있음
                                    </Badge>
                                  )}
                                  {data.level == 'TOY_PROJECT' && (
                                    <Badge bg="primary" text="white" size="lg">
                                      Toy Pjt.
                                    </Badge>
                                  )}
                                </td>
                                <td>
                                  <Button
                                    variant="primary"
                                    className="btn-fill"
                                    onClick={(e) => handleDeleteClick(index)}
                                  >
                                    -
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          <tr>
                            <td>
                              <Form.Control
                                defaultValue=""
                                placeholder="Skill 입력"
                                type="text"
                                ref={itemInput}
                              ></Form.Control>
                            </td>
                            <td>
                              <Form.Select
                                aria-label="select level"
                                variant="warning"
                                ref={levelSelect}
                                defaultValue="INTEREST"
                              >
                                <option value="BASIC">기본 학습</option>
                                <option value="JOB">업무 사용</option>
                                <option value="INTEREST">관심 있음</option>
                                <option value="TOY_PROJECT">Toy Pjt.</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Button
                                variant="warning"
                                className="btn-fill"
                                onClick={(e) => handleAddClick()}
                              >
                                +
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  {loading ? (
                    <Button
                      variant="danger"
                      className="btn-fill"
                      disabled
                      style={{ float: 'right' }}
                    >
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Processing...
                    </Button>
                  ) : (
                    <Button
                      className="pull-right"
                      type="button"
                      variant="danger"
                      style={{ float: 'right' }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
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
                  src={require('assets/img/profile_bg.jpeg')}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <img
                    className="avatar border-gray"
                    src={require('assets/img/devsunset.jpg')}
                  ></img>
                  <h5 className="title">UserId : {username}</h5>
                  <h5 className="title">Nickname : {nickname}</h5>
                  <h5 className="title">Authorities : {roles}</h5>
                </div>
              </Card.Body>
              <hr></hr>
            </Card>
          </Col>
        </Row>
      </Container>
      <Notify ref={notiRef} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ height: '0px' }}>
            <b>Confirm</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <hr />
          저장 하시겠습니까 ?
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleYesClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
