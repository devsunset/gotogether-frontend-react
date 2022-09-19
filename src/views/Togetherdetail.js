import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-spinners-css';
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import TogetherService from '../services/together.service';

function Togetherdetail() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);

  const { user: currentUser } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [togetherId, setTogetherId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('STUDY');
  const [maxMember, setMaxMember] = useState(4);
  const [currentMember, setCurrentMember] = useState(1);
  const [openKakaoChat, setOpenKakaoChat] = useState('');
  const [skills, setSkills] = useState('');
  const [involveType, setInvolveType] = useState('ONOFFLINE');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [writerNickname, setWriterNickname] = useState('');
  const [writerUsername, setWriterUsername] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [hit, setHit] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [commentContent, setCommentContent] = useState('');

  const categorySelect = useRef();
  const maxMemberSelect = useRef();
  const currentMemberSelect = useRef();
  const involveTypeSelect = useRef();
  const comment = useRef();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [actionFlag, setActionFlag] = useState('');
  const notiRef = useRef();

  const header = {
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '15px',
  };

  const headerCommentList = {
    backgroundColor: '  #4091e2',
    color: '#ffffff',
    padding: '15px',
  };

  const headerComment = {
    backgroundColor: '#28a745',
    color: '#ffffff',
    padding: '15px',
  };

  const footer = {
    backgroundColor: '#343a40',
    color: '#ffffff',
    float: 'center',
    padding: '5px',
    marginTop: '50px',
  };

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

  const handleList = () => {
    sessionStorage.setItem('together_back', 'Y');
    history.push('/together');
  };

  const handleEdit = () => {
    sessionStorage.setItem('together_back', 'Y');
    history.push('/togetheredit?togetherId=' + togetherId);
  };

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username);
      setNickname(user.nickname);
      setRoles(user.roles[0]);
    }

    setTogetherId(queryParams.get('togetherId'));

    if (
      queryParams.get('togetherId') !== undefined &&
      queryParams.get('togetherId') != '' &&
      queryParams.get('togetherId') != null
    ) {
      TogetherService.getTogether(queryParams.get('togetherId')).then(
        (response) => {
          if (response.data.result == 'S') {
            setCategory(response.data.data.category);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setHit(response.data.data.hit);
            setWriterNickname(response.data.data.nickname);
            setWriterUsername(response.data.data.username);
            setModifiedDate(response.data.data.modifiedDate);
            setOpenKakaoChat(response.data.data.openKakaoChat);
            setMaxMember(response.data.data.maxMember);
            setCurrentMember(response.data.data.currentMember);
            setSkills(response.data.data.skill);

            setInvolveType(response.data.data.involveType);
            setLatitude(response.data.data.latitude);
            setLongitude(response.data.data.longitude);

            if (response.data.data.involveType !== 'ONLINE') {
              mapscript(
                response.data.data.latitude,
                response.data.data.longitude,
              );
            }
          } else {
            notiRef.current.notificationAlert(failOption);
          }
        },
        (error) => {
          notiRef.current.notificationAlert(failOption);
          console.log(
            (error.response && error.response.data) ||
              error.message ||
              error.toString(),
          );
        },
      );

      getTogetherCommentList();
    }
  }, []);

  const mapscript = (argLatitude, argLongtitude) => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(argLatitude, argLongtitude),
      level: 4,
    };

    //map
    const map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(argLatitude, argLongtitude);

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  const getTogetherCommentList = () => {
    TogetherService.getTogetherCommentList(queryParams.get('togetherId')).then(
      (response) => {
        if (response.data.result == 'S') {
          setCommentList(response.data.data);
          setCommentCount(response.data.data.length);
        } else {
          setCommentList([]);
          setCommentCount(0);
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
        setCommentList([]);
        setCommentCount(0);
        notiRef.current.notificationAlert(failOption);
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.messagde) ||
            error.message ||
            error.toString(),
        );
      },
    );
  };

  const handleDelete = () => {
    setActionFlag('deleteTogether');
    handleShow();
  };

  const handleDeleteComment = (id) => {
    setCommentId(id);
    setActionFlag('deleteComment');
    handleShow();
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = () => {
    if (commentContent.trim() == '') {
      notiRef.current.notificationAlert({
        place: 'br',
        message: (
          <div>
            <div>Comment 내용을 입력해 주세요</div>
          </div>
        ),
        type: 'warning',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: 2,
      });
      comment.current.focus();
      return;
    }
    setActionFlag('setComment');
    handleShow();
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleYesClose = () => {
    setShow(false);
    if (actionFlag == 'deleteTogether') {
      deleteTogether();
    } else if (actionFlag == 'deleteComment') {
      deleteComment();
    } else if (actionFlag == 'setComment') {
      setComment();
    }
  };

  const deleteTogether = () => {
    setLoading(true);
    TogetherService.deleteTogether(queryParams.get('togetherId')).then(
      (response) => {
        if (response.data.result == 'S') {
          notiRef.current.notificationAlert(successOption);
          history.push(`/together?category=` + category);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
        setLoading(false);
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

  const deleteComment = () => {
    setLoading(true);
    TogetherService.deleteTogetherComment(commentId).then(
      (response) => {
        if (response.data.result == 'S') {
          getTogetherCommentList();
          notiRef.current.notificationAlert(successOption);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
        setLoading(false);
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

  const setComment = () => {
    setLoading(true);
    TogetherService.setTogetherComment({
      togetherId: togetherId,
      content: commentContent,
    }).then(
      (response) => {
        comment.current.value = '';
        if (response.data.result == 'S') {
          getTogetherCommentList();
          notiRef.current.notificationAlert(successOption);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        comment.current.value = '';
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
        <Card.Header style={header}>
          <span style={{ float: 'left' }}>
            <i className="nav-icon fas fa-user" style={{color:"#ffffff"}} />{writerNickname}
            <br />
            <i className="nav-icon fas fa-edit" style={{color:"#ffffff"}} /> {modifiedDate}
          </span>
          <span style={{ float: 'right' }}>
            <i className="fas fa-eye fa-fw" style={{color:"#ffffff"}} /> {hit}
            <br />
            <i className="fas fa-comment-dots fa-fw" style={{color:"#ffffff"}} /> {commentCount}
          </span>
        </Card.Header>

        <Card.Body style={{ height: '100%' }}>
          <Container fluid>
            <Form>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                        <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        제목
                      </b>
                    </label>
                    <Form.Control
                      placeholder="Together 제목을 입력 하세요"
                      defaultValue={title}
                      maxLength="120"
                      disabled
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                        <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        목적
                      </b>
                    </label>
                    <br />
                    <Form.Select
                      aria-label="select category"
                      variant="warning"
                      ref={categorySelect}
                      style={{ width: '100%' }}
                      disabled
                    >
                      <option value="STUDY">함께 공부해요</option>
                      <option value="PORTFOLIO">포트폴리오 구축</option>
                      <option value="HACKATHON">해커톤 참가</option>
                      <option value="CONTEST">공모전 참가</option>
                      <option value="TOY_PROJECT">토이 프로젝트 구축</option>
                      <option value="PROJECT">프로젝트 구축</option>
                      <option value="ETC">기타</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                        <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        최대 모집 인원
                      </b>
                    </label>
                    <br />
                    <Form.Select
                      aria-label="select category"
                      variant="warning"
                      ref={maxMemberSelect}
                      style={{ width: '100%' }}
                      defaultValue={maxMember}
                      disabled
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                        <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        현재 참여 인원
                      </b>
                    </label>
                    <br />
                    <Form.Select
                      aria-label="select category"
                      variant="warning"
                      ref={currentMemberSelect}
                      style={{ width: '100%' }}
                      defaultValue={currentMember}
                      disabled
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                        <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        Kakao Open Chat Link{' '}
                      </b>
                    </label>
                    <Form.Control
                      placeholder=" Kakao Open Chat Link (옵션)"
                      defaultValue={openKakaoChat}
                      disabled
                      maxLength="120"
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <label>
                    <b>
                      <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                      상세 설명
                    </b>
                  </label>
                  <Card>
                    <Card.Header
                      style={{ backgroundColor: '#3472F7' }}
                    ></Card.Header>
                    <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <label>
                    <b>
                      <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                      Skill
                    </b>
                  </label>
                  <br />
                  <Card>
                    <Card.Header
                      style={{
                        backgroundColor: '#3472F7',
                        paddingBottom: '10px',
                      }}
                    >
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
                    </Card.Header>
                    <Card.Body>
                      {skills &&
                        skills.split('|').map((skill, index) => (
                          <span key={index} style={{ marginRight: '2px' }}>
                            <Badge
                              bg={
                                skill.split('^')[1] == 'BASIC'
                                  ? 'success'
                                  : skill.split('^')[1] == 'JOB'
                                  ? 'danger'
                                  : skill.split('^')[1] == 'INTEREST'
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Form.Group>
                    <label>
                      <b>
                       <i className="nav-icon far fa-plus-square" style={{ marginRight: '5px' }} />
                        참여방식
                      </b>
                    </label>
                    <br />
                    <Form.Select
                      aria-label="select category"
                      variant="warning"
                      ref={involveTypeSelect}
                      style={{ width: '100%' }}
                      disabled
                      defaultValue={involveType}
                    >
                      <option value="ONOFFLINE">ON/OFF LINE </option>
                      <option value="OFFLINE">OFF LINE </option>
                      <option value="ONLINE">ON LINE </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {involveType !== 'ONLINE' && (
                <Row>
                  <Col md="12">
                    <div
                      id="map"
                      style={{
                        width: '100%',
                        height: '70vh',
                      }}
                    ></div>
                  </Col>
                </Row>
              )}
            </Form>
          </Container>
        </Card.Body>
        <Card.Footer style={footer}>
          <Button
            className="pull-right"
            type="button"
            variant="primary"
            className="btn-fill"
            style={{ float: 'right' }}
            onClick={handleList}
          >
            List
          </Button>

          {(writerUsername == username || roles == 'ROLE_ADMIN') && (
            <Button
              className="pull-right"
              type="button"
              variant="success"
              className="btn-fill"
              style={{ float: 'right', marginRight: '10px' }}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          {(writerUsername == username || roles == 'ROLE_ADMIN') && (
            <Button
              className="pull-right"
              type="button"
              variant="danger"
              style={{ float: 'right', marginRight: '10px' }}
              onClick={handleDelete}
              className="btn-fill"
            >
              Delete
            </Button>
          )}
        </Card.Footer>
      </Card>

      {commentList &&
        commentList.map((comment, idx) => (
          <Card key={comment.togetherCommentId}>
            <Card.Header style={headerCommentList}>
              <span style={{ float: 'left' }}>
                <i className="nc-icon nc-single-02" /> {comment.nickname}
                <br />
                <i className="nc-icon nc-time-alarm" /> {comment.createdDate}
              </span>
              <span style={{ float: 'right' }}>
                {(comment.username == username || roles == 'ROLE_ADMIN') && (
                  <Button
                    variant="warning"
                    size="sm"
                    className="btn-fill"
                    onClick={(e) =>
                      handleDeleteComment(comment.togetherCommentId)
                    }
                  >
                    X
                  </Button>
                )}
              </span>
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {comment.content}
              </div>
            </Card.Body>
          </Card>
        ))}

      {currentUser ? (
        <Card>
          <Card.Header style={headerComment}>Reply</Card.Header>
          <Card.Body>
            <Form.Control
              cols="80"
              defaultValue=""
              placeholder="Comment를 남겨 보세요."
              rows="4"
              as="textarea"
              onChange={handleCommentChange}
              ref={comment}
            ></Form.Control>
            <Button
              className="pull-right"
              type="button"
              variant="danger"
              style={{ float: 'right', margin: '10px' }}
              onClick={handleSubmit}
              className="btn-fill"
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert className="alert-with-icon" variant="primary">
          <span data-notify="icon" className="nc-icon nc-bell-55"></span>
          <span>로그인을 하시면 댓글 작성이 가능합니다.</span>
        </Alert>
      )}

      <Notify ref={notiRef} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ height: '0px' }}>
            <b>Confirm</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <hr />
          {actionFlag == 'deleteTogether' && '삭제 하시겠습니까 ?'}
          {actionFlag == 'deleteComment' && '댓글을 삭제 하시겠습니까 ?'}
          {actionFlag == 'setComment' && '저장 하시겠습니까 ?'}

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

export default Togetherdetail;
