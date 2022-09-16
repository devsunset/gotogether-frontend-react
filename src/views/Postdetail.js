import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import { Redirect, useHistory } from 'react-router-dom';

import {
  Alert,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import { Spinner } from 'react-spinners-css';

import PostService from '../services/post.service';

function Postdetail() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const categorySelect = useRef();
  const comment = useRef();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [postId, setPostId] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writerNickname, setWriterNickname] = useState('');
  const [writerUsername, setWriterUsername] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [hit, setHit] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [commentList, setCommentList] = useState([]);

  const [commentId, setCommentId] = useState(0);
  const [commentContent, setCommentContent] = useState('');

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
    sessionStorage.setItem('post_back', 'Y');
    history.push(`/gotogether/post?category=` + categorySelect.current.value);
  };

  const handleEdit = () => {
    sessionStorage.setItem('post_back', 'Y');
    history.push(
      `/gotogether/postedit?category=` +
        categorySelect.current.value +
        '&postId=' +
        queryParams.get('postId'),
    );
  };

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username);
      setNickname(user.nickname);
      setRoles(user.roles[0]);
    }

    setPostId(queryParams.get('postId'));

    if (
      queryParams.get('postId') !== undefined &&
      queryParams.get('postId') != '' &&
      queryParams.get('postId') != null
    ) {
      PostService.getPost(queryParams.get('postId')).then(
        (response) => {
          if (response.data.result == 'S') {
            setCategory(response.data.data.category);
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setHit(response.data.data.hit);
            setWriterNickname(response.data.data.nickname);
            setWriterUsername(response.data.data.username);
            setModifiedDate(response.data.data.modifiedDate);
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

      getPostCommentList();
    }
  }, []);

  const getPostCommentList = () => {
    PostService.getPostCommentList(queryParams.get('postId')).then(
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
    setActionFlag('deletePost');
    handleShow();
  };

  const handleChangeCatogory = () => {
    setActionFlag('changeCatogory');
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
    if (actionFlag == 'deletePost') {
      deletePost();
    } else if (actionFlag == 'changeCatogory') {
      changeCatogory();
    } else if (actionFlag == 'deleteComment') {
      deleteComment();
    } else if (actionFlag == 'setComment') {
      setComment();
    }
  };

  const deletePost = () => {
    setLoading(true);
    PostService.deletePost(queryParams.get('postId')).then(
      (response) => {
        if (response.data.result == 'S') {
          notiRef.current.notificationAlert(successOption);
          history.push(`/gotogether/post?category=` + category);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
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

  const changeCatogory = () => {
    PostService.changePostCategory(queryParams.get('postId')).then(
      (response) => {
        if (response.data.result == 'S') {
          notiRef.current.notificationAlert(successOption);
          history.push(`/gotogether/post?category=` + response.data.data);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
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
    PostService.deletePostComment(commentId).then(
      (response) => {
        if (response.data.result == 'S') {
          getPostCommentList();
          notiRef.current.notificationAlert(successOption);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
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
    PostService.setPostComment({
      postId: postId,
      content: commentContent,
    }).then(
      (response) => {
        comment.current.value = '';
        if (response.data.result == 'S') {
          getPostCommentList();
          notiRef.current.notificationAlert(successOption);
        } else {
          notiRef.current.notificationAlert(failOption);
        }
      },
      (error) => {
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
          {/* Post {postId ? 'Edit' : 'New'} {category == 'TALK' ? 'Talk' : 'Q&A'} */}
          <span style={{ float: 'left' }}>
            <i className="nc-icon nc-single-02" /> {writerNickname}
            <br />
            <i className="nc-icon nc-time-alarm" /> {modifiedDate}
          </span>
          <span style={{ float: 'right' }}>
            <i className="nc-icon nc-zoom-split" /> {hit}
            <br />
            <i className="nc-icon nc-chat-round" /> {commentCount}
          </span>
        </Card.Header>

        <Card.Body style={{ height: '100%' }}>
          <Container fluid>
            <Row>
              <Col md="12">
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Category</b>
                        </label>
                        <br />
                        <Form.Select
                          aria-label="select category"
                          variant="warning"
                          ref={categorySelect}
                          style={{ width: '100%' }}
                          value={category}
                          disabled
                        >
                          <option value="TALK">Talk</option>
                          <option value="QA">Q&A</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>Title</b>
                        </label>

                        <Form.Control
                          placeholder="Title"
                          defaultValue={title}
                          disabled
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Card>
                        <Card.Header
                          style={{ backgroundColor: '#3472F7' }}
                        ></Card.Header>
                        <Card.Body>
                          <div
                            dangerouslySetInnerHTML={{ __html: content }}
                          ></div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
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
          {roles == 'ROLE_ADMIN' && (
            <Button
              className="pull-right"
              type="button"
              variant="warning"
              className="btn-fill"
              style={{ float: 'right', marginRight: '10px' }}
              onClick={handleChangeCatogory}
            >
              C
            </Button>
          )}
        </Card.Footer>
      </Card>

      {commentList &&
        commentList.map((comment, idx) => (
          <Card key={comment.postCommentId}>
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
                    onClick={(e) => handleDeleteComment(comment.postCommentId)}
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
          {actionFlag == 'deletePost' && '삭제 하시겠습니까 ?'}
          {actionFlag == 'changeCatogory' && 'Category를 변경 하시겠습니까 ?'}
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

export default Postdetail;
