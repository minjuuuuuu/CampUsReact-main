// src/components/campus/menu/SideMenu.jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { user1, home, homehv, lecture, lecturehv, project, projecthv, post, posthv, mypage } from '../img'
import { useAuthStore, useMypageModalStore, useSideMenuStore } from '../commons/modalStore'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Toast from '../commons/Toast'
import { getStudent, getUserSession, logoutUser, changeLecMajor } from '../api'

// === styled ===
export const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.3); z-index: 900;
`

const Container = styled.div`
  font-size: 1rem; font-weight: 400; line-height: 1.5; text-align: left;
  font-family: 'Noto Sans KR', sans-serif; color: #212121;
  width: 80%; height: 100vh; overflow-y: auto; box-sizing: border-box;
  position: fixed; left: 0; top: 0; background-color: #fff; border: 1px solid #dedede;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out; z-index: 1000;
`

const UserImage = styled.img`margin-left:30px;margin-top:5px;width:59px;height:59px;object-fit:cover;`
const Profile = styled.div`width:70%;height:18%;`
const Text = styled.span`font-size:18px;font-weight:bold;`
const Button = styled.button`
  width:66px;height:26px;border-radius:5px;color:#aaa;border:1px solid #aaa;background:#fff;
`
export const Hr = styled.hr`background:#2ec4b6;height:2px;`
const Select = styled.select`border:2px solid #2ec4b6;&:focus{border-color:#2ec4b6;}`
const Icon = styled.i`
  display:inline-block;width:25px;height:25px;
  background-image:url(${p => (p.hover ? p.hoverImg : p.defaultImg)});
  background-size:contain;background-repeat:no-repeat;transition:background-image .3s;
`
const P = styled.p`color:${p=>p.hover?'#2ec4b6':'#212121'};font-weight:bold;margin:0;transition:color .3s;`
const MypageIcon = styled.i`
  display:inline-block;width:12px;height:12px;background-image:url(${mypage});
  background-size:contain;background-repeat:no-repeat;
`
export const Nonebutton = styled.button`border:none;background:none;`
export const StyledLink = styled(Link)`text-decoration:none;color:#212121;`
export const Submenu = styled.ul`
  max-height:${({ open }) => (open ? '500px' : '0')}; overflow:hidden; transition:max-height .3s ease;
`

function SideMenu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [homeHover, setHomeHover] = useState(false)
  const [lectureHover, setLectureHover] = useState(false)
  const [projectHover, setProjectHover] = useState(false)
  const [postHover, setPostHover] = useState(false)
  const { showModal } = useMypageModalStore();
  const { isOpen, closeMenu } = useSideMenuStore();
  const logout = useAuthStore(state => state.logout);
  const [toastMsg, setToastMsg] = useState("");
  const user = getUserSession();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const memId = query.get('memId') || user?.mem_id || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (memId) getStudentData(memId);
  }, [memId]);

  async function getStudentData(memId) {
    try {
      const res = await getStudent(memId);
      setStudentData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      sessionStorage.removeItem('user');
      setToastMsg('로그아웃 완료!');
    } catch (err) {
      console.error(err);
      setToastMsg('로그아웃 실패');
    }
  };

  // ✅ 전공 선택 시 세션에 major 세팅 + 목록 라우트로 이동
  const handleLectureChange = async (e) => {
    const lecId = e.target.value;
    if (!lecId) return;
    try {
      await changeLecMajor(lecId);                       // 서버 세션에 major 설정
      localStorage.setItem('selectedLecId', lecId);      // 클라에도 저장
      sessionStorage.setItem('lecId', lecId);
      sessionStorage.setItem('lec_id', lecId);

      navigate(`/notice?memId=${encodeURIComponent(memId)}&lecId=${encodeURIComponent(lecId)}`);
      closeMenu();
    } catch (err) {
      console.error(err);
      alert('전공을 설정하지 못했습니다.');
    }
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={closeMenu} />
      <Container $isOpen={isOpen}>
        <div style={{ display: 'flex' }}>
          <Profile>
            <div style={{ width: "100%", height: "25px" }} />
            <UserImage src={user.pictureUrl || user1} className="img-circle img-md" alt="User" />
            <div style={{ marginTop: 10, display: "flex" }}>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;{user.mem_name}&nbsp;&nbsp;</Text>
              <Nonebutton onClick={showModal}><MypageIcon style={{marginTop:8}}/></Nonebutton>
            </div>
            <Text style={{ fontSize: 15, color: "#909090", fontWeight: 500 }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.mem_id}
            </Text>
          </Profile>
          <Button style={{ marginTop: 47, fontSize: 13 }} onClick={() => {handleLogout(); closeMenu();}}>로그아웃</Button>
        </div>

        <Hr style={{ width: 290, marginTop: 22 }} />

        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">

          {/* HOME */}
          <StyledLink to='/' onClick={closeMenu}>
            <li className="nav-item" style={{ display: "flex", alignItems: "center", padding: '5px 15px' }}
              onClick={() => {setActiveMenu("home"); setHomeHover(false);}}>
              <Icon defaultImg={home} hoverImg={homehv} hover={homeHover || activeMenu === "home"} style={{ marginLeft: 20, marginRight: 10 }} />
              <P hover={homeHover || activeMenu === "home"}>&nbsp;&nbsp;HOME</P>
            </li>
          </StyledLink>

          {/* 강의실 */}
          <li className="nav-item" style={{ marginTop: 15 }}>
            <div className="nav-link" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => {setActiveMenu(activeMenu === "lecture" ? null : "lecture"); setLectureHover(false);}}>
              <Icon defaultImg={lecture} hoverImg={lecturehv} hover={lectureHover || activeMenu === "lecture"}
                    style={{ marginLeft: 20, marginRight: 10, marginTop: 5 }}/>
              <P hover={lectureHover || activeMenu === "lecture"}>
                &nbsp;&nbsp;강의실{" "}
                <i className={`right fas fa-angle-${activeMenu === "lecture" ? "down" : "left"}`} style={{ marginRight: 15 }}/>
              </P>
            </div>

            <Submenu open={activeMenu === "lecture"}>
              <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-9">
                  <div className="form-group">
                    <Select className="custom-select my-border" style={{ marginLeft: 70, width: '70%' }} onChange={handleLectureChange}>
                      <option value="">전공을 선택하세요.</option>
                      {!loading && (
                        user.mem_auth === 'ROLE01'
                          ? (studentData?.stulectureList || []).map(lec => (
                              <option key={lec.lec_id} value={lec.lec_id}>{lec.lec_name}</option>
                            ))
                          : (studentData?.prolectureList || []).map(lec => (
                              <option key={lec.lec_id} value={lec.lec_id}>{lec.lec_name}</option>
                            ))
                      )}
                    </Select>
                  </div>
                </div>
              </div>

              <StyledLink to='/JAVA101/plan' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>강의계획서</p></li></StyledLink>
              <StyledLink
                to={`/notice?memId=${encodeURIComponent(memId)}&lecId=${encodeURIComponent(localStorage.getItem('selectedLecId') || '')}`}
                onClick={closeMenu}
              >
                <li className="nav-item"><p style={{ marginLeft: 80 }}>공지사항</p></li>
              </StyledLink>

              <StyledLink to='/JAVA101/online' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>실시간 강의</p></li></StyledLink>
              <StyledLink to='/JAVA101/atten' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>온라인 강의</p></li></StyledLink>
              <StyledLink to='/JAVA101/atten' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>출결</p></li></StyledLink>
              <StyledLink to='/JAVA101/homework' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>과제제출</p></li></StyledLink>
              <StyledLink to='/JAVA101/pds' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80 }}>자료실</p></li></StyledLink>
            </Submenu>
          </li>

          {/* 프로젝트 */}
          <li className="nav-item" style={{ marginTop: 10 }}>
            <div className="nav-link" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => setActiveMenu(activeMenu === "project" ? null : "project")}>
              <Icon defaultImg={project} hoverImg={projecthv} hover={projectHover || activeMenu === "project"}
                    style={{ marginLeft: 20, marginRight: 10, transform: "translateY(5px)" }}/>
              <P hover={projectHover || activeMenu === "project"}>
                &nbsp;&nbsp;프로젝트{" "}
                <i className={`right fas fa-angle-${activeMenu === "project" ? "down" : "left"}`} style={{ marginRight: 15 }}/>
              </P>
            </div>
            <Submenu open={activeMenu === "project"}>
              <StyledLink to='/project/team' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80, marginTop: 15}}>팀 목록</p></li></StyledLink>
              <StyledLink to='/project/object' onClick={closeMenu}><li className="nav-item"><p style={{ marginLeft: 80, marginTop: 15}}>결과물</p></li></StyledLink>
            </Submenu>
          </li>

          {/* 게시판 */}
          <li className="nav-item" style={{ marginTop: 10 }}>
  <StyledLink
    to="/board"
    onClick={() => { setActiveMenu("post"); closeMenu(); }}
  >
    <div className="nav-link" style={{ display: "flex", alignItems: "center" }}>
      <Icon defaultImg={post} hoverImg={posthv} hover={postHover || activeMenu === "post"} style={{ marginLeft: 20, marginRight: 10 }} />
      <P hover={postHover || activeMenu === "post"}>&nbsp;&nbsp;게시판</P>
    </div>
  </StyledLink>
</li>
        </ul>
      </Container>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </>
  )
}

export default SideMenu