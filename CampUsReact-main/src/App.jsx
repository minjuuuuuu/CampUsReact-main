import { createGlobalStyle } from 'styled-components'
import CampusMain from './components/campus/CampusMain'
import BoardDetail from './components/campus/board/BoardDetail'
import TopNav from './components/campus/topNav/TopNav'
import LectureAttendenceModify from './components/campus/lecAtten/LectureAttendanceModify'
import LectureHomeworkDetail from './components/campus/lecHomework/LectureHomeworkDetail'
import LectureAttendanceChange from './components/campus/lecAtten/LectureAttendanceChange'
import LectureHomeworkRegist from './components/campus/lecHomework/LectureHomeworkRegist'
import LecturePdsRegist from './components/campus/lecPds/LecturePdsRegist'
import ProjectTeamModify from './components/campus/proTeam/ProjectTeamModify'
import ProjectTeamRegist from './components/campus/proTeam/ProjectTeamRegist'
import ProjectObjectRegist from './components/campus/proObject/ProjectObjectRegist'
import LectureNoticeRegist from './components/campus/lecNotice/LectureNoticeRegist'
import ProjectTeamModifyCheck from './components/campus/proTeam/ProjectTeamModifyCheck'
import MailWrite from './components/campus/mail/MailWrite'
import LecturePlanRegist from './components/campus/lecPlan/LecturePlanRegist'
import LecturePlanModify from './components/campus/lecPlan/LecturePlanModify'

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;

  }
  body{
    font-family: 'pretendard'
  }
`

function App() {

  return (
    <>
      <GlobalStyle/>
      {/* <TopNav/> */}
      <LecturePlanModify/>
    </>
  )
}

export default App
