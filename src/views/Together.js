import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import { Spinner } from 'react-spinners-css';
import ProgressBar from 'react-bootstrap/ProgressBar';

import TogetherService from '../services/together.service';

function Together() {
  let pageArg = 1;
  const history = useHistory();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [togethers, setTogethers] = useState([]);

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

  const rightalign = {
    float: 'right',
    marginRight: '0px',
    marginTop: '10px',
    marginLeft: '20px',
    marginBottom: '10px',
    width: '100%',
  };

  const header = {
    backgroundColor: '#343a40',
    color: '#ffffff',
  };

  const footer = {
    backgroundColor: '#343a40',
    color: '#ffffff',
    float: 'center',
    padding: '15px',
  };

  const goTogetherNew = () => {
    alert('to-do');
    history.push(`/gotogether/togetheredit`);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getTogetherList('INIT');
    }
  };

  useEffect(() => {
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUsername(user.username);
      setNickname(user.nickname);
      setRoles(user.roles[0]);
    }

    getTogetherList('INIT');
  }, []);

  const goTogetherDetail = (togetherId) => {
    alert('to-do');
    sessionStorage.setItem('together_page', pageArg);
    sessionStorage.setItem('together_keyword', keyword);
    history.push(`/gotogether/togetherdetial?togetherId=` + togetherId);
  };

  const getTogetherList = (flag) => {
    if (flag == 'INIT') {
      pageArg = 1;
      setPaginationConfig({
        totalPages: 1,
        currentPage: 0,
        showMax: 10,
        size: 'sm',
        threeDots: true,
        prevNext: true,
        onClick: function (pageNumber) {
          console.log(pageNumber);
        },
      });
    } else {
      pageArg = flag;
      if (
        sessionStorage.getItem('together_back') == 'Y' &&
        sessionStorage.getItem('together_page') !== null &&
        sessionStorage.getItem('together_page') !== ''
      ) {
        pageArg = sessionStorage.getItem('together_page');
        setKeyword(sessionStorage.getItem('together_keyword'));
      }
      sessionStorage.setItem('together_back', 'N');
      sessionStorage.setItem('together_page', '');
      sessionStorage.setItem('together_keyword', '');
    }

    setLoading(true);
    TogetherService.getTogetherList(pageArg - 1, 5, {
      category: '',
      keyword: keyword,
    }).then(
      (response) => {
        setLoading(false);
        if (response.data.data != null) {
          setTogethers(response.data.data.content);

          setPaginationConfig({
            totalPages: response.data.data.totalPages,
            currentPage: response.data.data.number + 1,
            showMax: 5,
            size: 'sm',
            threeDots: true,
            prevNext: true,
            onClick: function (pageNumber) {
              getTogetherList(pageNumber);
            },
          });
        }
      },
      (error) => {
        setLoading(false);

        setTogethers([]);

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

        console.log(
          (error.response && error.response.data) ||
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
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header style={header}>
                <span style={rightalign}>
                  <InputGroup>
                    {currentUser && (
                      <Button
                        variant="success"
                        size="sm"
                        style={{ marginRight: '10px' }}
                        onClick={goTogetherNew}
                      >
                        New
                      </Button>
                    )}
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
                      onClick={(e) => getTogetherList('INIT')}
                    >
                      <i className="nc-icon nc-zoom-split" />
                    </Button>
                    <p />
                  </InputGroup>
                </span>
                <p />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table
                  className="table-hover table-striped borded"
                  variant="dark"
                  style={{ marginTop: '3px' }}
                >
                  <thead>
                    <tr>
                      <th className="border-0" width="60%">
                        <b>Together</b>
                      </th>
                      <th className="desktop">
                        <b>Progress</b>
                      </th>
                      <th className="desktop">
                        <b>Reply</b>
                      </th>
                      <th className="desktop">
                        <b>View</b>
                      </th>
                      <th className="desktop">
                        <b>Nickname</b>
                      </th>
                      <th className="desktop">
                        <b>Date</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {togethers.length == 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          No Data.
                        </td>
                      </tr>
                    )}
                    {togethers.map((data) => (
                      <tr
                        key={data.togetherId}
                        data-item={data.togetherId}
                        onClick={(e) => goTogetherDetail(data.togetherId)}
                      >
                        <td className="ellipsisMobile">{data.title}</td>
                        <td>
                          {data.progressLegend == 'danger' && (
                            <ProgressBar
                              variant="danger"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'warning' && (
                            <ProgressBar
                              variant="warning"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'primary' && (
                            <ProgressBar
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}

                          {data.progressLegend == 'success' && (
                            <ProgressBar
                              variant="success"
                              now={data.progress}
                              label={`${data.progress}%`}
                            />
                          )}
                        </td>
                        <td className="desktop">
                          {data.togetherComment_count}
                        </td>
                        <td className="desktop">{data.hit}</td>
                        <td className="desktop">{data.nickname}</td>
                        <td className="desktop">
                          {data.createdDate.substring(2, 16)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer style={footer}>
                <Pagination {...paginationConfig} />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Together;
