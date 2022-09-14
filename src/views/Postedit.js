import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect, useHistory } from 'react-router-dom';

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';

import PostService from '../services/post.service';

function Postedit() {
  const { quill, quillRef } = useQuill();

  console.log(quill); // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const categorySelect = useRef();

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    // return <Redirect to="/gotogether/home" />;
    history.push(`/gotogether/home`);
  }

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [postId, setPostId] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const notiRef = useRef();

  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  const header = {
    backgroundColor: '#343a40',
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleList = () => {
    sessionStorage.setItem('post_back', 'Y');
    history.push(`/gotogether/post?category=` + categorySelect.current.value);
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

    let tmp = queryParams.get('category');
    if (tmp === null || tmp === undefined) {
      setCategory('TALK');
      categorySelect.current.value = 'TALK';
    } else {
      if (!(tmp == 'TALK' || tmp == 'QA')) {
        setCategory('TALK');
        categorySelect.current.value = 'TALK';
      } else {
        setCategory(tmp);
        categorySelect.current.value = tmp;
      }
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
            if (quill) {
              quill.clipboard.dangerouslyPasteHTML(response.data.data.content);
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
    }
  }, []);

  const handleShow = () => {
    setShow(true);
    alert(postId);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleYesClose = () => {
    setShow(false);

    setLoading(true);
    if (postId) {
      PostService.putPost(postId, {
        category: category,
        title: title,
        content: content,
      }).then(
        (response) => {
          setLoading(false);
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            history.push(
              `/gotogether/post?category=` + categorySelect.current.value,
            );
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
    } else {
      PostService.setPost({
        category: category,
        title: title,
        content: content.replace(/"/gi, "'"),
      }).then(
        (response) => {
          setLoading(false);
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            history.push(
              `/gotogether/post?category=` + categorySelect.current.value,
            );
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
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header style={header}>
                <Card.Title as="h4" style={{ color: '#ffffff' }}>
                  Post {postId ? 'Edit' : 'New'}{' '}
                  {category == 'TALK' ? 'Talk' : 'Q&A'}
                </Card.Title>
              </Card.Header>
              <Card.Body>
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
                          disabled
                          onChange={handleCategoryChange}
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
                          defaultValue=""
                          placeholder="Title"
                          defaultValue={title}
                          onChange={handleTitleChange}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" style={{ height: '300px' }}>
                      <Form.Group>
                        <label>
                          <b>Content</b>
                        </label>
                        <div
                          style={{
                            width: '100%',
                            height: 220,
                          }}
                        >
                          <div ref={quillRef} />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
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
                    style={{ float: 'right', marginRight: '10px' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </Card.Footer>
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

export default Postedit;
