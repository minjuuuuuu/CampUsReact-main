import React from "react";
import styled from "styled-components";
import { clip } from "../img";

const MobileShell = styled.div`
  width: 100vw;
  padding: 12px 20px 24px;
  background: #fafbfc;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
`;
const PageTitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const CloseBtn = styled.button`
  width:28px;
  height:28px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border:none;
  background:transparent;
  cursor:pointer;
  font-size:22px;
  line-height:1;
  color:#6b7680;
  margin-bottom: 15px;
`;

const MintDivider = styled.div`
  height:2px;
  background:#2ec4b6;
  opacity:.6;
  border-radius:2px;
  margin-bottom:14px;
`;

const Card = styled.div`
  background:#fff;
  margin-bottom: 50px;
`;

const SubHeader = styled.div`
  display: flex;
  gap:10px;
  align-items:center;
  margin-left: 10px;
`;
const Avatar = styled.div`
  width:32px;
  height:32px;
  border-radius:50%;
  background:#f3f4f6;
  border:1px solid #e5e7eb;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:14px;
  color:#6b7680;
  overflow:hidden;
  
`;

const AvImg = styled.img`
width:100%;
height:100%;
object-fit:cover;
`;

const NameTimeRow = styled.div`
display:flex;
align-items:center;
gap:8px;
`;

const Name = styled.span`
font-size:13px;
font-weight:700;
color:#374151;
`;

const Time = styled.span`
font-size:12px;
color:#9ca3af;
`;

const FileLine = styled.div`
  display:flex;
  align-items:center;
  gap:8px;
  font-size:12px;
  color:#6b7280;
  border-bottom:1px solid #eceff1;
  margin-left: 10px;
`;

const FileLink = styled.button`
  border:0;
  background:transparent;
  padding:0;
  color:#707070;
  font-size:12px;
  cursor:pointer;
  align-items: center;
  margin-bottom: 15px;
`;

const BodyText = styled.p`
  font-size:13px;
  color:#6b7280;
  line-height:1.7;
  white-space:pre-line;
  margin:10px 10px 120px;
`;

const AttachmentIcon = styled.img`
  display: block;
  width: 14px;
  height: 14px;
  background: #fff;
  object-fit: contain;
`;

const CardFooterRight = styled.div`
display:flex;
justify-content:flex-end;
margin-top:12px;
`;

const CardHr = styled.div`
  width: 372px;
  height: 1px;
  background: #D9D9D9;
  border: 0;
  margin: 10px 0 15px;
`;

const GhostBtn = styled.button`
  height:30px;
  padding:0 14px;
  font-size:12px;
  border:1px solid #dfe5ea;
  background:#fff;
  color:#59636b;
  border-radius:8px;
  cursor:pointer;
  margin-right: 10px;
`;

const SectionHead = styled.div`
  display:flex;
  align-items:center;
  padding:18px 0 6px;
  margin-top:2px;
`;
const SectionTitle = styled.h4`
  margin:0;
  font-size:14px;
  font-weight:700;
  color:#707070;
  margin-left: 10px;
`;
const EditChip = styled.button`
  margin-left:auto;
  height:26px;
  padding:0 10px;
  font-size:12px;
  border:1px solid #2ec4b6;
  color:#1a998d;
  background:#fff;
  border-radius:5px;
  cursor:pointer;
  margin-right: 10px;
`;
const SectionDivider = styled.div`
  height:2px;
  background:#2ec4b6;
  opacity:.6;
  border-radius:2px;
  margin-bottom:10px;
`;

const FbCard = styled(Card)`
  background:#f9fafb;
  border-color:#e5e7eb;
`;

const FbHeader = styled.div`
  display:grid;
  grid-template-columns:36px 1fr;
  gap:10px;
  align-items:center;
  margin-left: 10px;
`;
const FbHeaderRight = styled.div`
  display:flex;
  align-items:center;
  gap:8px;
`;

const FbText = styled.div`
  margin-top:8px;
  font-size:13px;
  color:#6b7280;
  line-height:1.8;
  margin-left: 10px;
  margin-right: 10px;
`;

const Line = styled.div`
  width: 372px;
  height: 12px;
  color: #444444;
`

const Meta = styled.div`
  font-size: 12px;
  color: #98a1a8;
`;

export default function LectureHomeworkStuDetail() {
  const submission = {
    name: "권오규",
    time: "2025-08-29 21:49",
    filename: "자바프로그래밍 권오규 10주차.hwp",
    message:
      "교수님 안녕하세요! 20171339 권오규입니다!\n10주차 과제 제출하였습니다 확인 부탁드립니다.",
    avatar: "",
  };

  const feedback = {
    profName: "김형민",
    time: "2025-07-31 23:56",
    text:
      "조원 간 역할 분담이 비교적 명확하고, 논리적인 주장 구성도 인상적이었습니다. 다만, 반론 대응에서 다소 아쉬운 점이 보였습니다.\n다음에는 다양한 관점을 미리 대비해보는 전략도 고려해보면 좋겠습니다.",
    avatar: "",
  };


  return (

        <MobileShell>
          <CloseBtn aria-label="close">×</CloseBtn>
          <TopBar>
          <PageTitle>과제제출</PageTitle>
          </TopBar>          
          <MintDivider />

          <Card>
            <SubHeader>
              <Avatar>{submission.avatar ? <AvImg src={submission.avatar}/> : submission.name[0]}</Avatar>
              <NameTimeRow>
                <Name>{submission.name}</Name>
                <Meta>ㅣ</Meta>
                <Time>{submission.time}</Time>
              </NameTimeRow>
            </SubHeader>
            <CardHr />

            <BodyText>{submission.message}</BodyText>
            <FileLine>
              <AttachmentIcon src={clip}/>
              <FileLink>{submission.filename}</FileLink>
            </FileLine>
            <CardHr />
            <CardFooterRight>
              <GhostBtn>목록</GhostBtn>
            </CardFooterRight>
          </Card>
          <Line/>
          <SectionHead>
            <SectionTitle>피드백 작성</SectionTitle>
            <EditChip>수정</EditChip>
          </SectionHead>
          <SectionDivider />

          <FbCard>
            <FbHeader>
              <Avatar>{feedback.avatar ? <AvImg src={feedback.avatar}/> : feedback.profName[0]}</Avatar>
              <FbHeaderRight>
                <Name>{feedback.profName}</Name>
                <Meta>ㅣ</Meta>
                <Time>{feedback.time}</Time>
              </FbHeaderRight>
            </FbHeader>
            <FbText>{feedback.text}</FbText>
          </FbCard>
        </MobileShell>
  );
}
