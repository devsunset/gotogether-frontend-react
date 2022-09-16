import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import { Redirect, useHistory } from 'react-router-dom';

import {
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
  const [writerNickname, setWriterNickname] = useState('');
  const [writerUsername, setWriterUsername] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [hit, setHit] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const notiRef = useRef();

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

  const handleChangeCatogory = () => {
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

  const handleDelete = () => {
    handleShow();
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
    }
  }, []);

  const handleShow = () => {
    notiRef.current.notificationAlert({
      place: 'br',
      message: (
        <div>
          <div>내용을 입력해 주세요.</div>
        </div>
      ),
      type: 'warning',
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 2,
    });
    return;

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleYesClose = () => {
    setShow(false);
    setLoading(true);
    PostService.putPost(postId, {
      category: category,
      title: title,
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
          <Card.Title as="h4" style={{ color: '#ffffff' }}>
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
          </Card.Title>
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

export default Postdetail;

{
  /* <template>



                        <!-- ////////////////////////////////////////////////// -->
                            <div class="col-12"  :key="index" v-for="(comment,index) in postComments">
                                <div class="card">
                                <div class="card-header">
                                <h3 class="card-title"><i class="nav-icon fas fa-user"></i> &nbsp;{{comment.nickname}}<br/><i class="nav-icon fas fa-edit"></i>&nbsp;{{comment.modifiedDate}}</h3>
                                <div class="card-tools">
                                <button  v-if="userid == comment.username || roles == 'ROLE_ADMIN'"  type="button" class="btn btn-tool" data-card-widget="remove" title="Remove" @click="deleteComment(comment.postCommentId)">
                                <i class="fas fa-times"></i>
                                </button>
                                </div>
                                </div>
                                <div class="card-body">
                                    <div style="white-space:pre-wrap;word-break:break-all">{{comment.content}}</div>
                                </div>
                                </div>
                            </div>
                    <!-- ////////////////////////////////////////////////// -->

                    <div v-if="currentUser" class="card card-success" style="margin:15px">
                            <div class="card-header">
                            <h3 class="card-title">Reply</h3>
                            </div>
                            <div class="card-body">
                                    <textarea rows="5" class="form-control"  placeholder="Comment를 남겨 보세요." maxlength="1000" v-model="comment" ref="comment"></textarea>
                                    <br>
                                    <div style="float:right"><button  type="submit" class="btn btn-danger" style="margin-left: 15px;" @click="setComment">Submit</button></div>
                            </div>
                    </div>


                    <div v-else-if="!currentUser" class="callout callout-info" style="margin:10px">
                    <h5><i class="fas fa-info"></i> Notice</h5>
                        <p style="text-align:center">로그인을 하시면 댓글 작성이 가능합니다.</p>
                    </div>


</template>


export default {


             setDelete() {
                    this.$confirm("삭제 하시겠습니까?").then(() => {
                            PostService.deletePost(this.$route.query.postId).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Post",
                                            query: { category: this.category },
                                        });
                                    }else{
                                            this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    
                  }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
            },
             setUpdate() {
                    this.$confirm("Category를 변경 하시겠습니까?").then(() => {
                            PostService.changePostCategory(this.$route.query.postId).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Post",
                                            query: { category: response.data.data },
                                        });
                                    }else{
                                            this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    
                  }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
            },
            getPostCommentList(){
                PostService.getPostCommentList(this.$route.query.postId).then(
                    (response) => {
                        if(response.data.result == 'S'){
                             this.postComments = response.data.data; 
                             this.comment_count= this.postComments.length;
                        }else{
                             this.postComments = [];
                             this.comment_count= 0;
                             this.$toast.error(`Fail.`);
                        }
                    },
                    (error) => {
                         this.comment_count= 0;
                        this.postComments = [] ;
                        this.$toast.error(`Fail.`);
                        console.log(
                        (error.response &&
                            error.response.data &&
                            error.response.data.messagde) ||
                        error.message ||
                        error.toString());
                    }
               );
            },
            deleteComment(postCommentId) {
                    this.$confirm("삭제 하시겠습니까?").then(() => {
                            PostService.deletePostComment(postCommentId).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.getPostCommentList();
                                        this.$toast.success(`Success.`);
                                    }else{
                                        this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    
                 }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
            },
            setComment() {
                 if( this.comment.trim() == ''){
                    this.$toast.warning(`Comment 내용을 입력해 주세요.`);
                    this.$refs.comment.focus();
                    return;
                }

                    this.$confirm("저장 하시겠습니까?").then(() => {
                            PostService.setPostComment({postId : this.$route.query.postId, content : this.comment}).then(
                                (response) => {
                                    this.comment = '';
                                    if(response.data.result == 'S'){
                                        this.getPostCommentList();
                                        this.$toast.success(`Success.`);
                                    }else{
                                        this.$toast.error(`Fail.`);
                                    }
                                },
                                (error) => {
                                    this.comment = '';
                                    this.$toast.error(`Fail.`);
                                    console.log(
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString());
                                }
                        );
                    
                  }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
            },
        },
};
</script> */
}
