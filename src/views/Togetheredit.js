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
