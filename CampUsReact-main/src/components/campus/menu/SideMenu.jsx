import React, { useState } from 'react'
import styled from 'styled-components'
import { user1, home, homehv, lecture, lecturehv, project, projecthv,
        post, posthv, mypage
} from '../img'
import { useMypageModalStore, useSideMenuStore } from '../commons/modalStore'

export const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 900;
`


const Container = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  font-family: 'Noto Sans KR', sans-serif;
  color: #212121;
  display: block;
  transition: margin-left .3s ease-in-out,width .3s ease-in-out;
  width: 80%;
  height: 100vh;
  overflow-y: hidden;
  z-index: 1038;
  overflow-x: hidden;
  box-sizing: border-box;
  bottom: 0;
  float: none;
  left: 0;
  position: fixed;
  top: 0;
  border: 1px solid #dedede;
  background-color: #ffffff;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
`

const UserImage = styled.img`
  margin-left: 30px;
  margin-top: 5px;
  width: 59px;
  height: 59px;
  object-fit: cover;
`

const Profile = styled.div`
  width: 70%;
  height: 18%;
`

const Text = styled.span`
  font-size: 18px;
  font-weight: bold;
`

const Button = styled.button`
  width: 66px;
  height: 26px;
  border-radius: 5px;
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  background-color: #ffffff;
`

export const Hr = styled.hr`
  background-color: #2ec4b6;
  height: 2px;
`

const Select = styled.select`
  border: 2px solid #2ec4b6;

  &:focus {
    border-color: #2ec4b6;
  }
`

// 아이콘 컴포넌트
const Icon = styled.i`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url(${props => props.hover ? props.hoverImg : props.defaultImg});
  background-size: contain;
  background-repeat: no-repeat;
  transition: background-image 0.3s;
  transform: translateY(${props => props.translateY || '0px'});
`

const P = styled.p`
  color: ${props => props.hover ? '#2ec4b6' : '#212121'};
  font-weight: bold;
  margin: 0;
  transition: color 0.3s;
`
const MypageIcon = styled.i`
  display: inline-block; 
  width: 12px; /* 이미지 크기 조절 */ 
  height: 12px; 
  background-image: url(${mypage}); 
  background-size: contain;
  background-repeat: no-repeat; 
`
export const Nonebutton = styled.button`
  border: none;
  background: none;
`
function SideMenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [homeHover, setHomeHover] = useState(false)
  const [lectureHover, setLectureHover] = useState(false)
  const [projectHover, setProjectHover] = useState(false)
  const [postHover, setPostHover] = useState(false)
  const { showModal } = useMypageModalStore();
  const { isOpen, closeMenu } = useSideMenuStore();
  
  return (
    <>
    <Overlay isOpen={isOpen} onClick={closeMenu} />
    <Container  $isOpen={isOpen}>
      <div style={{ display: 'flex' }}>
        <Profile>
          <div style={{ width: "100%", height: "25px" }}></div>
          <UserImage src={user1} className="img-circle img-md" alt="User Image" />
          <div style={{ marginTop: "10px", display: "flex" }}>
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;김민준&nbsp;&nbsp;</Text>
            <Nonebutton onClick={showModal}>
            <MypageIcon style={{marginTop:'8px'}}></MypageIcon>
            </Nonebutton>
          </div>
          <Text style={{ fontSize: "15px", color: "#909090", fontWeight: "500" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20220001
          </Text>
        </Profile>
        <Button style={{ marginTop: '47px', fontSize: "13px" }}>로그아웃</Button>
      </div>

      <Hr style={{ width: '290px', marginTop:'22px' }} />

      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="true">

        {/* HOME */}
        <li className="nav-item" style={{ display: "flex", alignItems: "center", padding: '5px 15px' }}
          onMouseEnter={() => setHomeHover(true)}
          onMouseLeave={() => setHomeHover(false)}
          onClick={() => setActiveMenu("home")}
        >
          <Icon defaultImg={home} hoverImg={homehv} hover={homeHover || activeMenu === "home"} style={{ marginLeft: '20px', marginRight: "10px" }} />
          <P hover={homeHover || activeMenu === "home"}>&nbsp;&nbsp;HOME</P>
        </li>

        {/* 강의실 */}
        <li className="nav-item"
         style={{marginTop: '15px'}}>
          <a href="#" className="nav-link" style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => setLectureHover(true)}
            onMouseLeave={() => setLectureHover(false)}
            onClick={() => setActiveMenu("lecture")}
          >
            <Icon defaultImg={lecture} hoverImg={lecturehv} hover={lectureHover || activeMenu === "lecture"}  style={{ marginLeft: '20px', marginRight: "10px", marginTop: '5px' }} />
            <P hover={lectureHover || activeMenu === "lecture"}>&nbsp;&nbsp;강의실 <i className="right fas fa-angle-left" style={{marginRight:'15px'}}></i></P>
          </a>
          <ul className="nav nav-treeview">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-9">
                <div className="form-group">
                  <Select className="custom-select my-border" style={{ marginLeft: '70px', width: '70%' }}>
                    <option value="">전공을 선택하세요.</option>
                  </Select>
                </div>
              </div>
            </div>

            <li className="nav-item"><p style={{ marginLeft: '80px' }}>강의계획서</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>공지사항</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>실시간 강의</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>온라인 강의</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>출결</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>자료실</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px' }}>과제제출</p></li>
          </ul>
        </li>

        {/* 프로젝트 */}
        <li className="nav-item" style={{marginTop: '10px'}}>
          <a href="#" className="nav-link" style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => setProjectHover(true)}
            onMouseLeave={() => setProjectHover(false)}
            onClick={() => setActiveMenu("project")} 
          >
            <Icon defaultImg={project} hoverImg={projecthv} hover={projectHover || activeMenu === "project"} style={{ marginLeft: '20px', marginRight: "10px", transform: "translateY(5px)" }} />
            <P hover={projectHover || activeMenu === "project"}>&nbsp;&nbsp;프로젝트 <i className="right fas fa-angle-left" style={{marginRight:'15px'}}></i></P>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item"><p style={{ marginLeft: '80px', marginTop: '15px'}}>팀 목록</p></li>
            <li className="nav-item"><p style={{ marginLeft: '80px', marginTop: '15px'}}>결과물</p></li>
          </ul>
        </li>

        {/* 게시판 */}
        <li className="nav-item" style={{marginTop: '10px'}}>
          <a href="#" className="nav-link" style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => setPostHover(true)}
            onMouseLeave={() => setPostHover(false)}
            onClick={() => setActiveMenu("post")}
          >
            <Icon defaultImg={post} hoverImg={posthv} hover={postHover || activeMenu === "post"}  style={{ marginLeft: '20px', marginRight: "10px" }} />
            <P hover={postHover || activeMenu === "post"}>&nbsp;&nbsp;게시판</P>
          </a>
        </li>
      </ul>
    </Container>
    </>
  )
}

export default SideMenu