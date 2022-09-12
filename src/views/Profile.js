import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
} from 'react-bootstrap';

import UserService from '../services/user.service';

function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [userInfoId, setUserInfoId] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [note, setNote] = useState('');
  const [github, setGithub] = useState('');
  const [homepage, setHomepage] = useState('');
  const [skills, setSkills] = useState([]);

  if (!currentUser) {
    return <Redirect to="/gotogether/home" />;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUsername(user.username);
    setNickname(user.nickname);
    setRoles(user.roles[0]);

    UserService.getUserInfo().then(
      (response) => {
        if (response.data.data != null) {
          setUserInfoId(response.data.data.userInfoId);
          setIntroduce(response.data.data.introduce);
          setNote(response.data.data.note);
          setGithub(response.data.data.github);
          setHomepage(response.data.data.homepage);
          if (
            response.data.data.skill === undefined ||
            response.data.data.skill == null ||
            response.data.data.skill === ''
          ) {
            setSkills({ item: '', level: 'INTEREST' });
          } else {
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
        setSkills({ item: '', level: 'INTEREST' });
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      },
    );
  }, []);

  const handleDeleteClick = (idx) => {
    var array = [...skills];
    alert(array[idx].item);
    array.splice(idx, 1);
    setSkills(array);
    console.log(array);
    console.log(skills);
  };
  const handleAddClick = (idx) => {
    setSkills([...skills, { item: '', level: 'INTEREST' }]);
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
                                <td>
                                  <Form.Control
                                    defaultValue=""
                                    placeholder="Skill 입력"
                                    defaultValue={data.item}
                                    type="text"
                                  ></Form.Control>
                                </td>
                                <td>
                                  <Form.Select
                                    aria-label="select level"
                                    variant="warning"
                                    defaultValue={data.level}
                                  >
                                    <option value="BASIC">기본 학습</option>
                                    <option value="JOB">업무 사용</option>
                                    <option value="INTEREST">관심 있음</option>
                                    <option value="TOY_PROJECT">
                                      Toy Pjt.
                                    </option>
                                  </Form.Select>
                                </td>
                                <td>
                                  {skills.length - 1 == index ? (
                                    <Button
                                      variant="warning"
                                      className="btn-fill"
                                      onClick={(e) => handleAddClick(index)}
                                    >
                                      +
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="primary"
                                      className="btn-fill"
                                      onClick={(e) => handleDeleteClick(index)}
                                    >
                                      -
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Button className="pull-right" type="submit" variant="danger">
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
    </>
  );
}

export default Profile;
