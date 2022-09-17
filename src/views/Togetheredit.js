import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Notify from 'react-notification-alert';
import { Redirect, useHistory } from 'react-router-dom';

import { Spinner } from 'react-spinners-css';

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

import TogetherService from '../services/together.service';

function Togetheredit() {
  const { quill, quillRef } = useQuill();

  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

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

  const [togetherId, setTogetherId] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleList = () => {
    sessionStorage.setItem('together_back', 'Y');
    history.push(
      `/gotogether/together?category=` + categorySelect.current.value,
    );
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

    setTogetherId(queryParams.get('togetherId'));

    if (
      queryParams.get('togetherId') !== undefined &&
      queryParams.get('togetherId') != '' &&
      queryParams.get('togetherId') != null
    ) {
      TogetherService.getTogether(queryParams.get('togetherId')).then(
        (response) => {
          if (response.data.result == 'S') {
            setTitle(response.data.data.title);
            setCategory(response.data.data.category);
            if (quill) {
              quill.clipboard.dangerouslyPasteHTML(response.data.data.content);
            }
          } else {
            notiRef.current.notificationAlert(failOption);
          }
        },
        (error) => {
          notiRef.current.notificationAlert(failOption);
          console.log(error.response || error.message || error.toString());
        },
      );
    }
  }, [quill]);

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('Text change!');
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const handleShow = () => {
    if (title.trim() == '') {
      notiRef.current.notificationAlert({
        place: 'br',
        message: (
          <div>
            <div>제목을 입력해 주세요.</div>
          </div>
        ),
        type: 'warning',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: 2,
      });
      return;
    }
    if (quill.getText().trim() == '') {
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
    }

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleYesClose = () => {
    setShow(false);

    // console.log(quill.getText()); // Get text only
    // console.log(quill.root.innerHTML); // Get innerHTML using quill

    setLoading(true);
    if (togetherId) {
      TogetherService.putTogether(togetherId, {
        category: category,
        title: title,
        content: quill.root.innerHTML,
      }).then(
        (response) => {
          setLoading(false);
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            history.push("/gotogether/together'");
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
      TogetherService.setTogether({
        category: category,
        title: title,
        content: quill.root.innerHTML,
      }).then(
        (response) => {
          setLoading(false);
          if (response.data.result == 'S') {
            notiRef.current.notificationAlert(successOption);
            history.push("/gotogether/together'");
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
            <Card>
              <Card.Header style={header}>
                <Card.Title as="h4" style={{ color: '#ffffff' }}>
                  Together {togetherId ? 'Edit' : 'New'}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>제목</b>
                        </label>
                        <Form.Control
                          placeholder="Together 제목을 입력 하세요"
                          defaultValue={title}
                          onChange={handleTitleChange}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>
                          <b>목적</b>
                        </label>
                        <br />
                        <Form.Select
                          aria-label="select category"
                          variant="warning"
                          ref={categorySelect}
                          style={{ width: '100%' }}
                          onChange={handleCategoryChange}
                        >
                          <option value="STUDY">함께 공부해요</option>
                          <option value="PORTFOLIO">포트폴리오 구축</option>
                          <option value="HACKATHON">해커톤 참가</option>
                          <option value="CONTEST">공모전 참가</option>
                          <option value="TOY_PROJECT">
                            토이 프로젝트 구축
                          </option>
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
                          <b>최대 모집 인원</b>
                        </label>
                        <br />
                        <Form.Select
                          aria-label="select category"
                          variant="warning"
                          ref={categorySelect}
                          style={{ width: '100%' }}
                          defaultValue={4}
                          onChange={handleCategoryChange}
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
                          <b>현재 참여 인원</b>
                        </label>
                        <br />
                        <Form.Select
                          aria-label="select category"
                          variant="warning"
                          ref={categorySelect}
                          style={{ width: '100%' }}
                          onChange={handleCategoryChange}
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
                          <b> Kakao Open Chat Link </b>
                        </label>
                        <Form.Control
                          placeholder=" Kakao Open Chat Link (옵션)"
                          defaultValue={title}
                          onChange={handleTitleChange}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <label>
                        <b>상세 설명</b>
                      </label>
                      <div
                        style={{
                          width: '100%',
                          minHeight: '100px',
                        }}
                      >
                        <div ref={quillRef} />
                      </div>
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
                <Button
                  className="pull-right"
                  type="button"
                  variant="danger"
                  style={{ float: 'right', marginRight: '10px' }}
                  onClick={handleSubmit}
                  className="btn-fill"
                >
                  Submit
                </Button>
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

export default Togetheredit;

{
  /* <template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Together Edit</h1>
            </div>
            <!-- /.col -->
           
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div>
                       <!-- ////////////////////////////////////////////////// -->
                        <div class="card card-primary card-outline">
                        <div class="card-header">
                        <h3 class="card-title" v-if="this.$route.query.togetherId">Edit Together</h3>
                         <h3 class="card-title" v-else>New Together</h3>
                        </div>
                        <div class="card-body">
                        <div class="form-group">
                         <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 제목 
                        <input class="form-control" placeholder="Together 제목을 입력 하세요" v-model="title" ref="title" maxlength="120">
                        </div>
                        <div class="form-group">
                        <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 목적
                                <select class="form-control" v-model="category"> 
                                      <option value="STUDY">함께 공부해요</option>
                                      <option value="PORTFOLIO">포트폴리오 구축</option> 
                                      <option value="HACKATHON">해커톤 참가</option> 
                                      <option value="CONTEST">공모전 참가</option> 
                                      <option value="TOY_PROJECT">토이 프로젝트 구축</option> 
                                      <option value="PROJECT">프로젝트 구축</option> 
                                      <option value="ETC">기타</option> 
                                  </select>
                        </div>
                         <div class="form-group">
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;최대 모집 인원
                            <select class="form-control" v-model="maxMember"> 
                                <option :value="data+1"  :key="index" v-for="(data,index) in 9">{{data+1}}</option>
                            </select>
                        </div>
                         <div class="form-group">
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;현재 참여 인원
                            <select class="form-control" v-model="currentMember"> 
                                <option :value="data"  :key="index" v-for="(data,index) in 10">{{data}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Kakao Open Chat Link
                        <input class="form-control" placeholder="Open Kakao Chat Link를  입력 하세요 (옵션)" v-model="openKakaoChat" ref="openKakaoChat" maxlength="120">
                        </div>
                        <div class="form-group"> 
                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 상세 설명
                            <QuillEditor theme="snow" toolbar="full"  content-type="html" v-model:content="content" ref="myEditor"/> 
                        </div>
                        <div class="form-group"> 
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Skill
                                            <div class="card">
                                            <div class="card-header">
                                            <h3 class="card-title">필요한 Skill 항목을 추가해 보세요.</h3>
                                            </div>
                                            <div class="card-body p-0">
                                            <table class="table table-striped">
                                            <thead>
                                            <tr>
                                            <th>Item</th>
                                            <th>Level</th>
                                            <th style="width: 40px"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr :key="index" v-for="(item,index) in items">
                                                    <td><input type="text" name="skill_item" class="form-control" @change='checkvalue' placeholder="skill을 입력해주세요" v-model="item.item" maxlength="100"></td>
                                                    <td>
                                                         <select class="form-control" v-model="item.level" name="skill_level"> 
                                                            <option value="INTEREST">관심 있음</option>
                                                            <option value="BASIC">기본 학습</option>
                                                            <option value="TOY_PROJECT">Toy Pjt.</option> 
                                                            <option value="JOB">업무 사용</option>
                                                        </select>
                                                    </td>
                                                    <td><button type="button" @click="setMinusSkill(index)" class="btn btn-block btn-success btn-sm" v-if="index != items.length - 1">-</button><button type="button" @click="setAddSkill()" class="btn btn-block btn-warning btn-sm" v-if="index == items.length - 1">+</button></td>
                                                </tr>
                                            </tbody>
                                            </table>
                                            </div>
                                        </div>
                                 </div>
                        <div class="form-group">
                            <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 참여 방식
                                <select class="form-control" v-model="involveType"> 
                                    <option value="ONOFFLINE">ON/OFF LINE </option> 
                                    <option value="OFFLINE">OFF LINE </option> 
                                    <option value="ONLINE">ON LINE </option>
                                </select> 
                        </div>
                        <div class="form-group"  v-show="involveType !='ONLINE'">
                                 ( 모임장소를 클릭 하여 선택해 보세요 )
                               <div id="map" class="map" style="margin-top:20px;height:300px"></div>
                        </div>
                        </div>

                        <div class="card-footer">
                        <div class="float-right">
                        <button type="submit" class="btn btn-danger" style="margin-left: 45px;" @click="setTogether">Submit</button>
                        <button type="submit" class="btn btn-info" style="margin-left: 15px;" @click="goTogether">List</button>
                        </div>
                        </div>
                        </div>
                        <!-- ////////////////////////////////////////////////// -->
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->
</template>

<script>
import TogetherService from "../services/together.service";

export default {
  name: "togetheredit",
        data() {
            return {
                title : '',
                category : 'STUDY',
                content : '',
                involveType : 'ONOFFLINE',
                openKakaoChat : '',
                latitude : '',
                longitude : '', 
                maxMember : 4, 
                currentMember : 1, 
                skill : '', 
                items : [ ] ,
                togethers : [ ], 
                keyword : "",
            };
        },
        created() {
            if(this.$route.query.togetherId !== undefined && this.$route.query.togetherId !=""){
                 TogetherService.getTogether(this.$route.query.togetherId).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                    this.category = response.data.data.category;
                                    this.title = response.data.data.title;
                                    this.content = response.data.data.content;
                                    this.$refs.myEditor.setHTML(this.content);
                                    this.involveType = response.data.data.involveType;
                                    this.openKakaoChat = response.data.data.openKakaoChat;
                                    this.latitude = response.data.data.latitude;
                                    this.longitude = response.data.data.longitude;
                                    this.maxMember = response.data.data.maxMember;
                                    this.currentMember  = response.data.data.currentMember ;

                                    window.kakao && window.kakao.maps
                                    ? this.initMap()
                                    : this.addKakaoMapScript();
                                    window.addEventListener('resize', this.handleResize);

                                    if(response.data.data.skill === undefined || response.data.data.skill == null || response.data.data.skill === ""){
                                        this.items = [
                                            {"item" : "", "level" : "INTEREST"}
                                        ] ;
                                    }else{
                                        this.items = [] ;
                                        var data = response.data.data.skill.split("|");
                                        var skills = [] ;
                                        data.forEach(function(d){
                                            var datasub = d.split('^');
                                            skills.push({ item:datasub[0], level:datasub[1] });
                                        })
                                        this.items = skills; 
                                    }
                                }else{
                                    this.items = [
                                        {"item" : "", "level" : "INTEREST"}
                                    ] ;
                                    this.$toast.error(`Fail.`);
                                }
                            },
                            (error) => {
                                 this.items = [
                                        {"item" : "", "level" : "INTEREST"}
                                    ] ;
                                this.$toast.error(`Fail.`);
                                console.log(
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString());
                            }
                    );
            }else{
                  this.items = [
                        {"item" : "", "level" : "INTEREST"}
                    ] ;
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        beforeUnmout() {
            window.removeEventListener('resize', this.handleResize);
        },
        mounted(){
            if(this.currentUser){
                const user = JSON.parse(localStorage.getItem('user'));
                 this.userid = user.username;
                 this.nickname = user.nickname;
                 this.email = user.email;
                 this.roles= user.roles[0];
            }

            if(this.$route.query.togetherId == undefined || this.$route.query.togetherId ==""){
                    window.kakao && window.kakao.maps
                    ? this.initMap()
                    : this.addKakaoMapScript();
                    window.addEventListener('resize', this.handleResize);
            }
        },
          methods: {
            goTogether() {
                sessionStorage.setItem('together_back', 'Y');
                this.$router.push({
                    name: "Together",
                });
            },
            setTogether() {
                if( this.title.trim() == ''){
                    this.$toast.warning(`제목을 입력해 주세요.`);
                    this.$refs.title.focus();
                    return;
                }

                if(this.$refs.myEditor.getText().trim()== ''){
                    this.$toast.warning(`내용을 입력해 주세요.`);
                    return;
                }

                var skillitem = "";
                this.items.forEach(function(d){
                    let tmp = d.item.trim().replace(/\|/g,'').replace(/\^/g,'');
                    if(tmp !='' ){
                        skillitem +=tmp+'^'+d.level+"|";
                    } 
                })

                if(skillitem !=''){
                    skillitem  = skillitem.substring(0,skillitem.length -1);
                }
                this.skill = skillitem;

                if( this.skill.trim() == ''){
                    this.$toast.warning(`필요한 Skill 항목을 입력해 주세요.`);
                    return;
                }

                if(this.involveType !='ONLINE'){
                    if(this.latitude == undefined || this.latitude == ''){
                         this.$toast.warning('모임 장소를 지도에서 클릭해 선택해 주세요.');
                         return;
                    }
                }

                this.$confirm("저장 하시겠습니까?").then(() => {
                    var reqData = {}

                     if(this.involveType =='ONLINE'){
                         reqData = {
                            title : this.title,
                            category : this.category,
                            content : this.content,
                            involveType : this.involveType,
                            openKakaoChat : this.openKakaoChat,
                            latitude : '',
                            longitude : '', 
                            maxMember : this.maxMember, 
                            currentMember : this.currentMember, 
                            skill : this.skill, 
                        }
                     }else{
                         reqData = {
                            title : this.title,
                            category : this.category,
                            content : this.content,
                            involveType : this.involveType,
                            openKakaoChat : this.openKakaoChat,
                            latitude : this.latitude,
                            longitude : this.longitude, 
                            maxMember : this.maxMember, 
                            currentMember : this.currentMember, 
                            skill : this.skill, 
                        }
                     }


                    if(this.$route.query.togetherId){
                            TogetherService.putTogether(this.$route.query.togetherId,reqData).then(
                                (response) => {
                                    if(response.data.result == 'S'){
                                        this.$toast.success(`Success.`);
                                        this.$router.push({
                                            name: "Together",
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
                    }else{
                        TogetherService.setTogether(reqData).then(
                            (response) => {
                                if(response.data.result == 'S'){
                                    this.$toast.success(`Success.`);
                                    this.$router.push({
                                        name: "Together",
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
                    }
                 }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
            },
             setAddSkill() {
                this.items.push({ item:"", level:"INTEREST"});
             },
             setMinusSkill(idx) {
                  this.items.splice(idx, 1);
             },
             addKakaoMapScript() {
                const script = document.createElement("script");
                script.onload = () => kakao.maps.load(this.initMap);
                script.src =
                    "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e0071736a9e3ccef3fa87fc5abacba";
                document.head.appendChild(script);
            },
            handleResize() {
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                var mapContainer = document.getElementById('map');
                 try {
                   mapContainer.style.height = (this.height-200)+'px'; 
                } catch (err) {
                    mapContainer.style.height = 300+'px'; 
                }
            },
            initMap() {
                            var container = document.getElementById("map"); 
                            this.width = window.innerWidth; 
                            this.height = window.innerHeight;
                            try {
                                container.style.height = (this.height-200)+'px';  
                            } catch (err) { 
                                container.style.height = 300+'px'; 
                            }

                            // Default Location (서울 시청)
                            var defaultlatitude = 37.56683319828021;
                            var defaultlongitude = 126.97857302284947;

                            // Get Geolocation 
                            // this.$getLocation()
                            // .then((coordinates) => {
                            //     console.log(coordinates);
                            //     defaultlatitude = coordinates.lat;
                            //     defaultlongitude = coordinates.lng;

                            //     var options = {
                            //         center: new kakao.maps.LatLng(defaultlatitude, defaultlongitude), 
                            //         level: 9
                            //     };
                                 

                            //     if(this.$route.query.togetherId == undefined || this.$route.query.togetherId =="" || this.latitude == undefined || this.latitude ==""){
                            //         options = {
                            //             center: new kakao.maps.LatLng(defaultlatitude, defaultlongitude), 
                            //             level: 9
                            //         };
                            //         this.latitude = defaultlatitude;
                            //         this.longitude = defaultlongitude;
                            //     }else{
                            //         options = {
                            //             center: new kakao.maps.LatLng(this.latitude, this.longitude), 
                            //             level: 4
                            //         };
                            //     }

                            //     var map = new kakao.maps.Map(container, options); 

                            //     // 마커가 표시될 위치입니다 
                            //     var markerPosition;
                            //     if(this.$route.query.togetherId == undefined || this.$route.query.togetherId =="" || this.latitude == undefined || this.latitude ==""){
                            //             markerPosition  = map.getCenter();  
                            //     }else{
                            //             markerPosition  = new kakao.maps.LatLng(this.latitude, this.longitude); 
                            //     }

                            //     // 지도를 클릭한 위치에 표출할 마커입니다
                            //     var marker = new kakao.maps.Marker({ 
                            //         // 지도 중심좌표에 마커를 생성합니다 
                            //         position : markerPosition
                            //     }); 

                            //     // 지도에 마커를 표시합니다
                            //     marker.setMap(map);

                            //     // 지도에 클릭 이벤트를 등록합니다
                            //     // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

                            //     var self = this;

                            //     kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                            //         // 클릭한 위도, 경도 정보를 가져옵니다 
                            //         var latlng = mouseEvent.latLng; 
                            //         // 마커 위치를 클릭한 위치로 옮깁니다
                            //         marker.setPosition(latlng);
                                    
                            //         var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                            //         message += '경도는 ' + latlng.getLng() + ' 입니다';
                            //         console.log(message)

                            //         self.latitude =  latlng.getLat();
                            //         self.longitude =  latlng.getLng();
                            //     });
                                
                            // })
                            // .catch((error) => {
                            //     console.log(error);
                                var options = {
                                    center: new kakao.maps.LatLng(defaultlatitude, defaultlongitude), 
                                    level: 9
                                };

                                if(this.$route.query.togetherId == undefined || this.$route.query.togetherId =="" || this.latitude == undefined || this.latitude ==""){
                                    options = {
                                        center: new kakao.maps.LatLng(defaultlatitude, defaultlongitude), 
                                        level: 9
                                    };
                                    this.latitude = defaultlatitude;
                                    this.longitude = defaultlongitude;
                                }else{
                                    options = {
                                        center: new kakao.maps.LatLng(this.latitude, this.longitude), 
                                        level: 4
                                    };
                                }

                                var map = new kakao.maps.Map(container, options); 

                                // 마커가 표시될 위치입니다 
                                var markerPosition;
                                if(this.$route.query.togetherId == undefined || this.$route.query.togetherId =="" || this.latitude == undefined || this.latitude ==""){
                                        markerPosition  = map.getCenter();  
                                }else{
                                        markerPosition  = new kakao.maps.LatLng(this.latitude, this.longitude); 
                                }

                                // 지도를 클릭한 위치에 표출할 마커입니다
                                var marker = new kakao.maps.Marker({ 
                                    // 지도 중심좌표에 마커를 생성합니다 
                                    position : markerPosition
                                }); 

                                // 지도에 마커를 표시합니다
                                marker.setMap(map);

                                // 지도에 클릭 이벤트를 등록합니다
                                // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다

                                var self = this;

                                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                                    // 클릭한 위도, 경도 정보를 가져옵니다 
                                    var latlng = mouseEvent.latLng; 
                                    // 마커 위치를 클릭한 위치로 옮깁니다
                                    marker.setPosition(latlng);
                                    
                                    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                                    message += '경도는 ' + latlng.getLng() + ' 입니다';
                                    console.log(message);

                                    self.latitude =  latlng.getLat();
                                    self.longitude =  latlng.getLng();
                                });
                            // });

            }
        },
};
</script>

<style>
.ql-editor{
    min-height:200px;
}

.ql-script{
   display: none  !important;
}

.ql-clean{
      display: none  !important;
}
</style> */
}
