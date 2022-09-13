// {/* <template>
// <!-- Content Header (Page header) -->
// <div class="content-header">
//     <div class="container-fluid">
//         <div class="row mb-2">
//             <div class="col-sm-6">
//                 <h1 class="m-0">Together Detail</h1>
//             </div>
//             <!-- /.col -->

//             <!-- /.col -->
//         </div>
//         <!-- /.row -->
//     </div>
//     <!-- /.container-fluid -->
// </div>
// <!-- /.content-header -->

// <!-- Main content -->
// <section class="content">
//     <div class="container-fluid">
//         <div>
//                        <!-- ////////////////////////////////////////////////// -->
//                         <div class="card card-primary card-outline">
//                         <div class="card-header">
//                         <h3 class="card-title"><i class="nav-icon fas fa-user"></i> &nbsp;{{writerNickname}}<br><i class="nav-icon fas fa-edit"></i>&nbsp;{{modifiedDate}}</h3>
//                         <div style="float:right">
//                         <i class="fas fa-eye fa-fw" style="color: var(--fa-navy);"></i>&nbsp;{{hit}} <br> <i class="fas fa-comment-dots fa-fw" style="color: var(--fa-navy);"></i>&nbsp;{{comment_count}}
//                         </div>
//                         </div>

//                         <div class="card-body">
//                         <div class="form-group">
//                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 제목
//                         <input class="form-control" placeholder="Title" v-model="title" disabled>
//                         </div>
//                         <div class="form-group">
//                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 목적
//                                 <select class="form-control" v-model="category" disabled>
//                                       <option value="STUDY">함께 공부해요</option>
//                                       <option value="PORTFOLIO">포트폴리오 구축</option>
//                                       <option value="HACKATHON">해커톤 참가</option>
//                                       <option value="CONTEST">공모전 참가</option>
//                                       <option value="TOY_PROJECT">토이 프로젝트 구축</option>
//                                       <option value="PROJECT">프로젝트 구축</option>
//                                       <option value="ETC">기타</option>
//                                   </select>
//                         </div>
//                         <div class="form-group">
//                              <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;최대 모집 인원
//                             <select class="form-control" v-model="maxMember" disabled>
//                                 <option :value="data+1"  :key="index" v-for="(data,index) in 9">{{data+1}}</option>
//                             </select>
//                         </div>
//                          <div class="form-group">
//                              <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp;현재 참여 인원
//                             <select class="form-control" v-model="currentMember" disabled>
//                                 <option :value="data"  :key="index" v-for="(data,index) in 10">{{data}}</option>
//                             </select>
//                         </div>
//                         <div class="form-group" v-if="openKakaoChat">
//                              <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Kakao Open Chat Link
//                               <a :href="openKakaoChat" target="_blank"> {{openKakaoChat}}</a>
//                         </div>
//                         <div class="form-group">
//                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 상세 설명
//                             <div class="col-md" style="padding:0px">
//                             <div class="card card-info">
//                             <div class="card-header" style="height:40px">
//                             <span class="card-title"></span>
//                             <div class="card-tools">
//                             </div>
//                             </div>
//                             <div class="card-body" style="display: block;">
//                                     <p v-html="content" style="min-height:200px"></p>
//                             </div>
//                             </div>
//                             </div>
//                         </div>
//                         <div class="form-group">
//                          <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; Skill
//                          <div class="card card-info" style="margin:0px">
//                             <div class="card-header">
//                             <h3 class="card-title">Skill -
//                             <span class="badge bg-success"  style="margin-right:3px">기본 학습</span>
//                             <span class="badge bg-danger"  style="margin-right:3px">업무 사용</span>
//                             <span class="badge bg-warning"  style="margin-right:3px">관심 있음</span>
//                             <span class="badge bg-primary"  style="margin-right:3px">Toy Pjt.</span>
//                             </h3>
//                             </div>
//                             <div class="card-body">
//                                     <span :key="idx" v-for="(data,idx) in ((skill !== null && skill !== undefined) ? skill.split('|') : [])">
//                                             <span v-if="data.split('^')[1] === 'BASIC'" class="badge bg-success"  style="margin-right:3px">
//                                                 {{data.split('^')[0]}}
//                                             </span>
//                                             <span v-else-if="data.split('^')[1] === 'JOB'" class="badge bg-danger"  style="margin-right:3px">
//                                                 {{data.split('^')[0]}}
//                                             </span>
//                                             <span v-else-if="data.split('^')[1] === 'TOY_PROJECT'" class="badge bg-primary"  style="margin-right:3px">
//                                                 {{data.split('^')[0]}}
//                                             </span>
//                                             <span v-else class="badge bg-warning"  style="margin-right:3px">
//                                                 {{data.split('^')[0]}}
//                                             </span>
//                                     </span>
//                             </div>
//                         </div>
//                         <p/>
//                         </div>
//                         <div class="form-group">
//                             <i class="nav-icon far fa-plus-square"></i>&nbsp;&nbsp;&nbsp; 참여 방식
//                                 <select class="form-control" v-model="involveType" disabled>
//                                     <option value="ONLINE">ON LINE 참여</option>
//                                      <option value="OFFLINE">OFF LINE 참여</option>
//                                      <option value="ONOFFLINE">ON/OFF LINE 참여</option>
//                                   </select>
//                         </div>
//                         <div class="form-group" v-show="involveType !='ONLINE'">
//                                <div id="map" class="map" style="margin-top:20px"></div>
//                         </div>
//                         </div>
//                         <div class="card-footer">
//                         <div class="float-right">
//                         <button v-if="userid == writerUsername || roles == 'ROLE_ADMIN'" type="submit" class="btn btn-danger" style="margin-left: 15px;" @click="setDelete">Delete</button>
//                         <button v-if="userid == writerUsername || roles == 'ROLE_ADMIN'" type="submit" class="btn btn-primary" style="margin-left: 15px;" @click="goEdit">Edit</button>
//                         <button type="submit" class="btn btn-info" style="margin-left: 15px;" @click="goTogether">List</button>
//                         </div>
//                         </div>

//                         </div>
//                         <!-- ////////////////////////////////////////////////// -->
//                             <div class="col-12"  :key="index" v-for="(comment,index) in togetherComments">
//                                 <div class="card">
//                                 <div class="card-header">
//                                 <h3 class="card-title"><i class="nav-icon fas fa-user"></i> &nbsp;{{comment.nickname}}<br/><i class="nav-icon fas fa-edit"></i>&nbsp;{{comment.modifiedDate}}</h3>
//                                 <div class="card-tools">
//                                 <button  v-if="userid == comment.username || roles == 'ROLE_ADMIN'"  type="button" class="btn btn-tool" data-card-widget="remove" title="Remove" @click="deleteComment(comment.togetherCommentId)">
//                                 <i class="fas fa-times"></i>
//                                 </button>
//                                 </div>
//                                 </div>
//                                 <div class="card-body">
//                                     <div style="white-space:pre-wrap;word-break:break-all">{{comment.content}}</div>
//                                 </div>
//                                 </div>
//                             </div>
//                         <!-- ////////////////////////////////////////////////// -->

//                     <div v-if="currentUser" class="card card-success" style="margin:15px">
//                             <div class="card-header">
//                             <h3 class="card-title">Reply</h3>
//                             </div>
//                             <div class="card-body">
//                                     <textarea rows="5" class="form-control"  placeholder="Comment를 남겨 보세요." maxlength="1000" v-model="comment" ref="comment"></textarea>
//                                     <br>
//                                     <div style="float:right"><button  type="submit" class="btn btn-danger" style="margin-left: 15px;" @click="setComment">Submit</button></div>
//                             </div>
//                     </div>

//                     <div v-else-if="!currentUser" class="callout callout-info" style="margin:10px">
//                     <h5><i class="fas fa-info"></i> Notice</h5>
//                         <p style="text-align:center">로그인을 하시면 댓글 작성이 가능합니다.</p>
//                     </div>

//         </div>
//     </div>
//     <!-- /.container-fluid -->
// </section>

// <!-- /.content -->
// </template>

// <script>
// import TogetherService from "../services/together.service";

// export default {
//   name: "togetherdetail",
//         data() {
//             return {
//                 title : '',
//                 category : '',
//                 content : '',
//                 involveType : '',
//                 openKakaoChat : '',
//                 latitude : '',
//                 longitude : '',
//                 maxMember : 2,
//                 currentMember : 1,
//                 skill : '',
//                 items : [ ] ,
//                 togethers : [ ],
//                 hit : 0,
//                 comment_count: 0,
//                 comment : '' ,
//                 writerNickname : "",
//                 writerUsername : "",
//                 modifiedDate : "",
//                 togetherComments : [],
//             };
//         },
//         created() {
//                     TogetherService.getTogether(this.$route.query.togetherId).then(
//                             (response) => {
//                                 if(response.data.result == 'S'){
//                                     this.category = response.data.data.category;
//                                     this.title = response.data.data.title;
//                                     this.content = response.data.data.content;
//                                     this.involveType = response.data.data.involveType;
//                                     this.openKakaoChat = response.data.data.openKakaoChat;
//                                     this.latitude = response.data.data.latitude;
//                                     this.longitude = response.data.data.longitude;
//                                     this.maxMember = response.data.data.maxMember;
//                                     this.currentMember  = response.data.data.currentMember ;
//                                     this.hit = response.data.data.hit;
//                                     this.writerNickname = response.data.data.nickname;
//                                     this.writerUsername = response.data.data.username;
//                                     this.modifiedDate = response.data.data.modifiedDate;
//                                     this.skill = response.data.data.skill;

//                                     if(this.involveType !='ONLINE' && this.latitude !== undefined && this.latitude !=''){
//                                            window.kakao && window.kakao.maps
//                                             ? this.initMap()
//                                             : this.addKakaoMapScript();
//                                             window.addEventListener('resize', this.handleResize);
//                                     }
//                                 }else{
//                                     this.$toast.error(`Fail.`);
//                                 }
//                             },
//                             (error) => {
//                                 this.$toast.error(`Fail.`);
//                                 console.log(
//                                 (error.response &&
//                                     error.response.data &&
//                                     error.response.data.message) ||
//                                 error.message ||
//                                 error.toString());
//                             }
//                     );

//             this.getTogetherCommentList();
//         },
//         computed: {
//             currentUser() {
//                 return this.$store.state.auth.user;
//             }
//         },
//         beforeUnmout() {
//             window.removeEventListener('resize', this.handleResize);
//         },
//         mounted(){
//             if(this.currentUser){
//                 const user = JSON.parse(localStorage.getItem('user'));
//                  this.userid = user.username;
//                  this.nickname = user.nickname;
//                  this.email = user.email;
//                  this.roles= user.roles[0];
//             }
//         },
//           methods: {
//             goTogether() {
//                 sessionStorage.setItem('together_back', "Y");
//                 this.$router.push({
//                     name: "Together",
//                     query: { category: this.category },
//                 });
//             },
//             goEdit() {
//                 this.$router.push({
//                     name: "TogetherEdit",
//                     query: { category: this.category, togetherId: this.$route.query.togetherId },
//                 });
//             },
//              setDelete() {
//                     this.$confirm("삭제 하시겠습니까?").then(() => {
//                             TogetherService.deleteTogether(this.$route.query.togetherId).then(
//                                 (response) => {
//                                     if(response.data.result == 'S'){
//                                         this.$toast.success(`Success.`);
//                                         this.$router.push({
//                                             name: "Together",
//                                             query: { category: this.category },
//                                         });
//                                     }else{
//                                             this.$toast.error(`Fail.`);
//                                     }
//                                 },
//                                 (error) => {
//                                     this.$toast.error(`Fail.`);
//                                     console.log(
//                                     (error.response &&
//                                         error.response.data &&
//                                         error.response.data.message) ||
//                                     error.message ||
//                                     error.toString());
//                                 }
//                         );

//                   }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
//             },
//             getTogetherCommentList(){
//                 TogetherService.getTogetherCommentList(this.$route.query.togetherId).then(
//                     (response) => {
//                         if(response.data.result == 'S'){
//                              this.togetherComments = response.data.data;
//                              this.comment_count= this.togetherComments.length;
//                         }else{
//                              this.togetherComments = [];
//                              this.comment_count= 0;
//                              this.$toast.error(`Fail.`);
//                         }
//                     },
//                     (error) => {
//                          this.comment_count= 0;
//                         this.togetherComments = [] ;
//                         this.$toast.error(`Fail.`);
//                         console.log(
//                         (error.response &&
//                             error.response.data &&
//                             error.response.data.message) ||
//                         error.message ||
//                         error.toString());
//                     }
//                );
//             },
//             deleteComment(togetherCommentId) {
//                     this.$confirm("삭제 하시겠습니까?").then(() => {
//                             TogetherService.deleteTogetherComment(togetherCommentId).then(
//                                 (response) => {
//                                     if(response.data.result == 'S'){
//                                         this.getTogetherCommentList();
//                                         this.$toast.success(`Success.`);
//                                     }else{
//                                         this.$toast.error(`Fail.`);
//                                     }
//                                 },
//                                 (error) => {
//                                     this.$toast.error(`Fail.`);
//                                     console.log(
//                                     (error.response &&
//                                         error.response.data &&
//                                         error.response.data.message) ||
//                                     error.message ||
//                                     error.toString());
//                                 }
//                         );

//                   }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
//             },
//             setComment() {
//                  if( this.comment.trim() == ''){
//                     this.$toast.warning(`Comment 내용을 입력해 주세요.`);
//                     this.$refs.comment.focus();
//                     return;
//                 }

//                     this.$confirm("저장 하시겠습니까?").then(() => {
//                             TogetherService.setTogetherComment({togetherId : this.$route.query.togetherId, content : this.comment}).then(
//                                 (response) => {
//                                     this.comment = '';
//                                     if(response.data.result == 'S'){
//                                         this.getTogetherCommentList();
//                                         this.$toast.success(`Success.`);
//                                     }else{
//                                         this.$toast.error(`Fail.`);
//                                     }
//                                 },
//                                 (error) => {
//                                     this.comment = '';
//                                     this.$toast.error(`Fail.`);
//                                     console.log(
//                                     (error.response &&
//                                         error.response.data &&
//                                         error.response.data.message) ||
//                                     error.message ||
//                                     error.toString());
//                                 }
//                         );

//                   }).catch((e) => e !== undefined ?  this.$toast.error(`Fail. ->`+e) : console.log('no selected =>'+e));
//             },
//             addKakaoMapScript() {
//             const script = document.createElement("script");
//             script.onload = () => kakao.maps.load(this.initMap);
//             script.src =
//                 "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e0071736a9e3ccef3fa87fc5abacba";
//             document.head.appendChild(script);
//             },
//             handleResize() {
//                 this.width = window.innerWidth;
//                 this.height = window.innerHeight;
//                 var mapContainer = document.getElementById('map');
//                 try {
//                  mapContainer.style.height = (this.height-200)+'px';
//                 } catch (err) {
//                    mapContainer.style.height = 300+'px';
//                 }
//             },
//             initMap() {
//                 var container = document.getElementById("map");

//                 this.width = window.innerWidth;
//                 this.height = window.innerHeight;

//                 try {
//                     container.style.height = (this.height-200)+'px';
//                 } catch (err) {
//                     container.style.height = 300+'px';
//                 }

//                 var options = {
//                     center: new kakao.maps.LatLng(this.latitude, this.longitude),
//                     level: 4
//                 };
//                 var map = new kakao.maps.Map(container, options);

//                 // 마커가 표시될 위치입니다
//                 var markerPosition  = new kakao.maps.LatLng(this.latitude, this.longitude);

//                 // 지도를 클릭한 위치에 표출할 마커입니다
//                 var marker = new kakao.maps.Marker({
//                     // 지도 중심좌표에 마커를 생성합니다
//                     position : markerPosition
//                 });

//                 // 지도에 마커를 표시합니다
//                 marker.setMap(map);

//                /*
//                ### (삭제 금지 - Custom Maker 생성  example) ###
//                     var positions = [
//                     {
//                         id: 1,
//                         together: 'OFF LINE 모임 장소',
//                         location: '',
//                         latlng: new kakao.maps.LatLng(this.latitude, this.longitude),
//                     },
//                     ]

//                     var imageSrc = require('@/assets/img/marker.png'),
//                     imageSize = new kakao.maps.Size(24, 35),
//                     imageOption = { offset: new kakao.maps.Point(20, 35) };

//                     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

//                     //for문이 아닌 forEach를 이용하여 dom에 직접 접근해야한다.
//                     positions.forEach(function(pos) {
//                             // 마커를 생성합니다
//                             var marker = new kakao.maps.Marker({
//                                 map: map,             // 마커를 표시할 지도
//                                 position: pos.latlng, // 마커의 위치
//                                 image: markerImage,
//                             });

//                             var customOverlay = new kakao.maps.CustomOverlay({
//                                 position: pos.latlng,
//                                 xAnchor: 0.5,
//                                 yAnchor: 1.05,
//                             });

//                             //  아래 테그를 동적으로 생성 해서 Marker 정보 표시 (example)
//                             // <div class="info-box shadow-sm">
//                             //     <span class="info-box-icon bg-success"><i class="far fa-comments"></i></span>
//                             //     <div class="info-box-content">
//                             //       <span class="info-box-text">Shadows</span>
//                             //       <span class="info-box-number">Small</span>
//                             //       <span><button class='btn btn-block btn-primary btn-sm'>Close</button></span>
//                             //     </div>
//                             // </div>

//                             var content = document.createElement('div');
//                             content.className = 'info-box shadow-sm';

//                             var spanicon = document.createElement('span');
//                             spanicon.className = 'info-box-icon bg-success';

//                             var itag = document.createElement('i');
//                             itag.className = 'far fa-comments';
//                             spanicon.appendChild(itag);

//                             var contentSub = document.createElement('div');
//                             contentSub.className = 'info-box-content';

//                             var spanTitle = document.createElement('span');
//                             spanTitle.className = 'info-box-number';
//                             spanTitle.appendChild(document.createTextNode(pos.together));
//                             contentSub.appendChild(spanTitle);

//                             var spanLocation = document.createElement('span');
//                             spanLocation.className = 'info-box-text';
//                             spanLocation.appendChild(document.createTextNode(pos.location));
//                             contentSub.appendChild(spanLocation);

//                             var buttonContainer = document.createElement('span');
//                             var closeBtn = document.createElement('button');
//                             closeBtn.className = 'btn btn-block btn-primary btn-sm';
//                             closeBtn.appendChild(document.createTextNode('Close'));
//                             closeBtn.onclick = function() {
//                                 customOverlay.setMap(null);
//                             };

//                             buttonContainer.appendChild(closeBtn);
//                             contentSub.appendChild(buttonContainer);

//                             content.appendChild(spanicon);
//                             content.appendChild(contentSub);

//                             customOverlay.setContent(content);

//                             kakao.maps.event.addListener(marker, 'click', function() {
//                                 customOverlay.setMap(map);
//                             });

//                     });
//                     */
//             }
//         },
// };
// </script>

// <style>
// .map {
//   width: 100%;
//   height: 700px;
// }
// </style> */}
