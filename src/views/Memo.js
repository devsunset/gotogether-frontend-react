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
  Modal,
} from 'react-bootstrap';
import Notify from 'react-notification-alert';
import Pagination from 'react-bootstrap-4-pagination';
import { Spinner } from 'react-spinners-css';
import { dispatch } from 'use-bus';

import MemoService from '../services/memo.service';

function Memo() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [showResults, setShowResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memos, setMemos] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [memoFlag, setMemoFlag] = useState('R');

  const dAllCheckRef = useRef();
  const checkAllRef = useRef();
  const memoFlagSelect = useRef();
  const notiRef = useRef();
  let dCheckRefs = useRef([]);
  let memoRefs = useRef([]);

  const [paginationConfig, setPaginationConfig] = useState({
    totalPages: 1,
    currentPage: 0,
    showMax: 5,
    size: 'sm',
    threeDots: true,
    prevNext: true,
    onClick: function (pageNumber) {
      console.log(pageNumber);
    },
  });

  const cardheaderrightalign = {
    float: 'right',
    marginRight: '0px',
    marginTop: '10px',
    marginLeft: '10px',
    marginBottom: '10px',
    width: '100%',
  };

  const rightalign = {
    float: 'right',
  };

  const displaynone = {
    display: 'none',
  };

  const header = {
    backgroundColor: '#343a40',
    color: '#ffffff',
  };

  const cardbgcolor = {
    backgroundColor: '#454d55',
    color: '#ffffff',
  };

  const footer = {
    backgroundColor: '#343a40',
    color: '#ffffff',
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

    getMemoList('INIT');
  }, []);

  const handleMemoFlagChange = (e) => {
    setMemoFlag(e.target.value);
    getMemoList('INIT');
  };

  const getMemoList = (flag) => {
    let pageArg = 1;
    if (flag == 'INIT') {
      pageArg = 1;

      setPaginationConfig({
        totalPages: 1,
        currentPage: 0,
        showMax: 5,
        size: 'sm',
        threeDots: true,
        prevNext: true,
        onClick: function (pageNumber) {
          console.log(pageNumber);
        },
      });
    } else {
      pageArg = flag;
    }

    setLoading(true);
    setCheckAll(false);

    if (dAllCheckRef.current !== undefined) {
      dAllCheckRef.current.checked = false;
      dAllCheckRef.current.value = false;
    }

    checkAllRef.current.checked = false;
    checkAllRef.current.value = false;

    dCheckRefs.current = [];
    memoRefs.current = [];

    if (memoFlagSelect.current.value == 'R') {
      MemoService.getReceiveMemo(pageArg - 1, 5).then(
        (response) => {
          setLoading(false);
          if (response.data.data != null) {
            setMemos(response.data.data.content);

            setPaginationConfig({
              totalPages: response.data.data.totalPages,
              currentPage: response.data.data.number + 1,
              showMax: 5,
              size: 'sm',
              threeDots: true,
              prevNext: true,
              onClick: function (pageNumber) {
                getMemoList(pageNumber);
              },
            });

            let tmpR = [];
            response.data.data.content.forEach(function (d) {
              if (checkAllRef.current.value) {
                tmpR.push(false);
              } else {
                tmpR.push(true);
              }
            });

            setShowResults(tmpR);
          }
        },
        (error) => {
          setLoading(false);

          setMemos([]);

          setPaginationConfig({
            totalPages: 1,
            currentPage: 0,
            showMax: 5,
            size: 'sm',
            threeDots: true,
            prevNext: true,
            onClick: function (pageNumber) {
              console.log(pageNumber);
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
    } else {
      MemoService.getSendMemo(pageArg - 1, 5).then(
        (response) => {
          setLoading(false);
          if (response.data.data != null) {
            setMemos(response.data.data.content);

            setPaginationConfig({
              totalPages: response.data.data.totalPages,
              currentPage: response.data.data.number + 1,
              showMax: 5,
              size: 'sm',
              threeDots: true,
              prevNext: true,
              onClick: function (pageNubmer) {
                getMemoList(pageNubmer);
              },
            });

            let tmpS = [];
            response.data.data.content.forEach(function (d) {
              if (checkAllRef.current.value) {
                tmpS.push(false);
              } else {
                tmpS.push(true);
              }
            });

            setShowResults(tmpS);
          }
        },
        (error) => {
          setLoading(false);

          setMemos([]);

          setPaginationConfig({
            totalPages: 1,
            currentPage: 0,
            showMax: 5,
            size: 'sm',
            threeDots: true,
            prevNext: true,
            onClick: function (pageNumber) {
              console.log(pageNumber);
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
    }
  };

  const handleDeleteCheckAllChange = (e) => {
    try {
      dCheckRefs.current.forEach((data, idx) => {
        if (e.target.checked) {
          dCheckRefs.current[idx].checked = true;
          dCheckRefs.current[idx].value = true;
        } else {
          dCheckRefs.current[idx].checked = false;
          dCheckRefs.current[idx].value = false;
        }
      });
    } catch (e) {}
  };

  const handleCheckAllChange = (e) => {
    setCheckAll(e.target.checked);

    let copyArray = [...showResults];
    copyArray.forEach(function (d, idx) {
      if (checkAll) {
        copyArray[idx] = false;
      } else {
        copyArray[idx] = true;
        if (memoFlag === 'R') {
          setReadMemo(idx);
        }
      }
    });
    setShowResults(copyArray);

    if (memoFlag === 'R') {
      dispatch('@@ui/NOTIFITION_REFRESH');
    }
  };

  const onVisible = (idx) => {
    let copyArray = [...showResults];
    if (showResults[idx]) {
      copyArray[idx] = false;
    } else {
      copyArray[idx] = true;
      if (memoFlag === 'R') {
        setReadMemo(idx);
        dispatch('@@ui/NOTIFITION_REFRESH');
      }
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
          getMemoList('INIT');
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

  const setReadMemo = (idx) => {
    if (memoFlag === 'R') {
      if (memos[idx].readflag == 'N') {
        MemoService.setReadMemo(memos[idx].memoId).then(
          (response) => {
            if (response.data.result == 'S') {
              let copyObj = [...memos];
              copyObj[idx].readflag = 'Y';
              setMemos(copyObj);
              dispatch('@@ui/NOTIFITION_REFRESH');
            }
          },
          (error) => {
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
    }
  };

  const setMemoDelete = () => {
    var checkedValue = '';
    dCheckRefs.current.forEach((data, idx) => {
      if (data !== null) {
        if (dCheckRefs.current[idx].checked) {
          checkedValue += memos[idx].memoId + ',';
        }
      }
    });

    if (checkedValue !== '') {
      checkedValue = checkedValue.substring(0, checkedValue.length - 1);
    } else {
      notiRef.current.notificationAlert({
        place: 'br',
        message: (
          <div>
            <div>삭제할 메모를 선택해 주세요.`</div>
          </div>
        ),
        type: 'warning',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: 2,
      });
      return;
    }

    handleShow();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

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

    var checkedValue = '';
    dCheckRefs.current.forEach((data, idx) => {
      if (data !== null) {
        if (dCheckRefs.current[idx].checked) {
          checkedValue += memos[idx].memoId + ',';
        }
      }
    });

    if (checkedValue !== '') {
      checkedValue = checkedValue.substring(0, checkedValue.length - 1);
    }

    setLoading(true);

    if (memoFlag === 'R') {
      MemoService.setDeleteReceiveMemo(checkedValue).then(
        (response) => {
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            getMemoList('INIT');
            dispatch('@@ui/NOTIFITION_REFRESH');
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
    } else {
      MemoService.setDeleteSendMemo(checkedValue).then(
        (response) => {
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            getMemoList('INIT');
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
    }
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
          <span style={cardheaderrightalign}>
            {memos.length > 0 && (
              <Form.Check className="mb-1 pl-0">
                <Form.Check.Label
                  style={{
                    paddingLeft: '65px',
                    paddingRight: '22px',
                  }}
                >
                  <Form.Check.Input
                    type="checkbox"
                    ref={dAllCheckRef}
                    onChange={handleDeleteCheckAllChange}
                  ></Form.Check.Input>
                  <span className="form-check-sign"></span>
                  <Button
                    className="btn-fill"
                    variant="danger"
                    size="sm"
                    onClick={setMemoDelete}
                  >
                    Delete
                  </Button>
                </Form.Check.Label>
              </Form.Check>
            )}
            <InputGroup>
              <Form.Check className="mb-1 pl-0">
                <Form.Check.Label
                  style={{
                    marginLeft: '65px',
                    paddingLeft: '0px',
                    paddingRight: '22px',
                  }}
                >
                  <Form.Check.Input
                    type="checkbox"
                    defaultChecked={checkAll}
                    onChange={handleCheckAllChange}
                    ref={checkAllRef}
                  ></Form.Check.Input>
                  <span className="form-check-sign"></span>
                  <b>Detail Display</b>
                </Form.Check.Label>
              </Form.Check>
              <Form.Select ref={memoFlagSelect} onChange={handleMemoFlagChange}>
                <option value="R">수신 메모함</option>
                <option value="S">발신 메모함</option>
              </Form.Select>
            </InputGroup>
          </span>
          <p />
        </Card.Header>
        <Card.Body>
          <Container fluid>
            {memos &&
              memos.map((memo, idx) => (
                <Row key={memo.memoId}>
                  <Col md="12">
                    <Card>
                      <Card.Header
                        style={cardbgcolor}
                        onClick={(e) => onVisible(idx)}
                      >
                        <Form.Check className="mb-1 pl-0">
                          <Form.Check.Label>
                            <Form.Check.Input
                              type="checkbox"
                              ref={(el) => (dCheckRefs.current[idx] = el)}
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                            <i
                              className="nc-icon nc-email-85"
                              style={{ marginTop: '5px', marginRight: '5px' }}
                            />
                            {memoFlag == 'R' && memo.readflag === 'N' && (
                              <Badge
                                bg="danger"
                                text="white"
                                style={{
                                  marginLeft: '5px',
                                  marginRight: '5px',
                                  marginTop: '7px',
                                  verticalAlign: 'top',
                                }}
                              >
                                New
                              </Badge>
                            )}
                          </Form.Check.Label>
                          {memoFlag == 'R'
                            ? memo.senderNickname
                            : memo.receiverNickname}
                          <span style={rightalign}>
                            {memo.modifiedDate.substring(2, 10)}
                          </span>
                        </Form.Check>
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
                                  <b>Memo</b>
                                  {memoFlag == 'S' && memo.readflag == 'Y' && (
                                    <span>
                                      <br />
                                      <Badge bg="warning" text="white">
                                        수신일시
                                      </Badge>
                                      <br />
                                      {memo.modifiedDate.substring(5, 16)}
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <div
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {memo.memo}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>
                                    <i
                                      className="nc-icon nc-email-85"
                                      style={{ marginTop: '5px' }}
                                    />
                                    &nbsp;{' '}
                                    {memoFlag == 'R' ? '답장전송' : '다시전송'}
                                  </b>
                                  <br />
                                  {memoFlag == 'R' && (
                                    <Button
                                      variant="success"
                                      size="lg"
                                      onClick={(e) =>
                                        sendMemo(idx, memo.senderUsername)
                                      }
                                    >
                                      Send
                                    </Button>
                                  )}
                                  {memoFlag == 'S' && (
                                    <Button
                                      variant="warning"
                                      size="lg"
                                      onClick={(e) =>
                                        sendMemo(idx, memo.receiverUsername)
                                      }
                                    >
                                      Send
                                    </Button>
                                  )}
                                </td>
                                <td>
                                  <Form.Control
                                    cols="80"
                                    defaultValue=""
                                    placeholder="메모를 남겨 보세요..."
                                    rows="2"
                                    as="textarea"
                                    ref={(el) => (memoRefs.current[idx] = el)}
                                  ></Form.Control>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      )}
                    </Card>
                  </Col>
                </Row>
              ))}
            {memos.length == 0 && (
              <Col md="12" style={{ textAlign: 'center' }}>
                <Alert className="alert-with-icon" variant="primary">
                  <span data-notify="icon" className="nc-icon nc-atom"></span>
                  <span>
                    {memoFlag == 'R'
                      ? '수신 메모함 데이타가 없습니다.'
                      : '발신 메모함 데이타가 없습니다.'}
                  </span>
                </Alert>
              </Col>
            )}
          </Container>
        </Card.Body>
        <Card.Footer style={footer}>
          <Pagination {...paginationConfig} />
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
          삭제 하시겠습니까 ?
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

export default Memo;
