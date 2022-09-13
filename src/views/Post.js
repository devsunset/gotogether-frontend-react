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

import PostService from '../services/post.service';

function Post() {
  const queryParams = new URLSearchParams(window.location.search);
  const categorySelect = useRef();

  const history = useHistory();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [roles, setRoles] = useState('');

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('TALK');
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState([]);

  const [paginationConfig, setPaginationConfig] = useState({
    totalPages: 1,
    currentPage: 0,
    showMax: 10,
    size: 'sm',
    threeDots: true,
    prevNext: true,
    onClick: function (page) {
      console.log(page);
    },
  });

  const rightalign = {
    float: 'right',
    margin: '10px',
    width: '340px',
  };

  const footer = {
    backgroundColor: 'rgba(0,0,0,.07)',
    float: 'center',
    padding: '15px',
  };

  const goPostNew = () => {
    alert('to-do');
    history.push(
      `/gotogether/postedit?category=` + categorySelect.current.value,
    );
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    getPostList('INIT');
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getPostList('INIT');
    }
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

    getPostList('INIT');
  }, []);

  const goPostDetail = (postId) => {
    alert('to-do');
    sessionStorage.setItem('post_page', page);
    sessionStorage.setItem('post_category', category);
    sessionStorage.setItem('post_keyword', keyword);
    history.push(`/gotogether/postedetail?postId=` + postId);
  };

  const getPostList = (flag) => {
    if (flag == 'INIT') {
      setPage(1);

      setPaginationConfig({
        totalPages: 1,
        currentPage: 0,
        showMax: 10,
        size: 'sm',
        threeDots: true,
        prevNext: true,
        onClick: function (page) {
          console.log(page);
        },
      });
    } else {
      setPage(flag);
      if (
        sessionStorage.getItem('post_back') == 'Y' &&
        sessionStorage.getItem('post_page') !== null &&
        sessionStorage.getItem('post_page') !== ''
      ) {
        setPage(sessionStorage.getItem('post_page'));
        setCategory(sessionStorage.getItem('post_category'));
        categorySelect.current.value = sessionStorage.getItem('post_category');
        setKeyword(sessionStorage.getItem('post_keyword'));
      }
      sessionStorage.setItem('post_back', 'N');
      sessionStorage.setItem('post_page', '');
      sessionStorage.setItem('post_category', '');
      sessionStorage.setItem('post_keyword', '');
    }

    setLoading(true);
    PostService.getPostList(page - 1, 10, {
      category: categorySelect.current.value,
      keyword: keyword,
    }).then(
      (response) => {
        setLoading(false);
        if (response.data.data != null) {
          setPosts(response.data.data.content);

          setPaginationConfig({
            totalPages: response.data.data.number + 1,
            currentPage: response.data.data.totalPages,
            showMax: 10,
            size: 'sm',
            threeDots: true,
            prevNext: true,
            onClick: function (page) {
              getPostList(page);
            },
          });
        }
      },
      (error) => {
        setLoading(false);

        setPage(1);

        setPosts([]);

        setPaginationConfig({
          totalPages: 1,
          currentPage: 0,
          showMax: 10,
          size: 'sm',
          threeDots: true,
          prevNext: true,
          onClick: function (page) {
            console.log(page);
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
              <Card.Header>
                {currentUser && (
                  <Button
                    variant="success"
                    size="sm"
                    style={{ marginTop: '15px' }}
                    onClick={goPostNew}
                  >
                    New
                  </Button>
                )}
                <span style={rightalign}>
                  <InputGroup>
                    <Form.Select
                      aria-label="select category"
                      variant="warning"
                      style={{ width: '100px' }}
                      ref={categorySelect}
                      onChange={handleCategoryChange}
                    >
                      <option value="TALK">Talk</option>
                      <option value="QA">Q&A</option>
                    </Form.Select>
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
                      onClick={(e) => getPostList('INIT')}
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
                >
                  <thead>
                    <tr>
                      <th className="border-0" width="60%">
                        <b>{category == 'TALK' ? 'Talk' : 'Q&A'}</b>
                      </th>
                      <th className="border-0">
                        <b>Reply</b>
                      </th>
                      <th className="border-0">
                        <b>View</b>
                      </th>
                      <th className="border-0">
                        <b>Nickname</b>
                      </th>
                      <th className="border-0">
                        <b>Date</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length == 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                          No Data.
                        </td>
                      </tr>
                    )}
                    {posts.map((data) => (
                      <tr
                        key={data.postId}
                        data-item={data.postId}
                        onClick={(e) => goPostDetail(data.postId)}
                      >
                        <td className="ellipsisMobile">{data.title}</td>
                        <td className="desktop">{data.comment_count}</td>
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

export default Post;
