import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getBoardDetail, deleteBoard, boardDownloadUrl } from "../api";
import { clip } from "../img";

/* ===== 스타일 ===== */
const MobileShell = styled.div`width: 100vw; background: #f7f7f7;`;
const TopBar = styled.div`display: flex; align-items: center; margin: 6px 0 10px;`;
const PageTitle = styled.div`font-size: 18px; font-weight: 700; margin-left: 10px;`;
const TopActions = styled.div`margin-left: auto; display: flex; gap: 8px; margin-right: 10px;`;
const DeleteBtn = styled.button`
  width: 50px; height: 26px; padding: 0 12px; font-size: 12px;
  border: none; background: #BEBEBE; color: #fff; border-radius: 5px; cursor: pointer;
`;
const ModifyBtn = styled.button`
  width: 50px; height: 26px; padding: 0 12px; font-size: 12px;
  border: none; background: #2EC4B6; color: #fff; border-radius: 5px; cursor: pointer;
`;
const PageDivider = styled.div`height: 2px; background: #2EC4B6; margin-bottom: 13px;`;
const Card = styled.div`background: #fff;`;
const CardHead = styled.h3`
  font-size: 16px; font-weight: 700; margin: 0 0 8px; line-height: 1.4; margin-left: 10px;
`;
const Meta = styled.div`font-size: 12px; color: #98a1a8; margin: 0 0 12px 10px;`;
const BodyText = styled.div`
  font-size: 14px; color: #6b7680; line-height: 1.7; white-space: pre-line;
  margin: 0 0 100px 10px;
`;
const Attachment = styled.div`
  display: flex; align-items: center; gap: 10px; border-radius: 12px; margin-left: 10px;
`;
const AttachmentIcon = styled.img`display: block; width: 14px; height: 14px; object-fit: contain;`;
const AttachmentName = styled.a`
  font-size: 13px; color: #444; text-decoration: none;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  &:hover { text-decoration: underline; }
`;
const CardFooter = styled.div`display: flex; justify-content: flex-end;`;
const Button = styled.button`
  width: 50px; height: 26px; padding: 0 12px; font-size: 12px; cursor: pointer;
  border: 1px solid #aaa; background: #fff; color: #aaa; border-radius: 5px; margin: 0 10px 10px 0;
`;
const CardHr = styled.div`width: 372px; height: 1px; background: #D9D9D9; border: 0; margin: 15px 0;`;

/* ===== 유틸 ===== */
const fmtDate = (v) => {
  if (!v) return "";
  try {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      return `${y}-${m}-${dd}${hh + mm !== "0000" ? ` ${hh}:${mm}` : ""}`;
    }
    const s = String(v);
    return s.length >= 10 ? s.slice(0, 10) : s;
  } catch {
    return "";
  }
};

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await getBoardDetail(id, { increaseView: true });
        if (!mounted) return;
        setItem(data?.item ?? data ?? null);
      } catch (e) {
        console.error("게시글 상세 로드 실패:", e);
        setItem(null);
      } finally {
        mounted = false;
        setLoading(false);
      }
    })();
  }, [id]);

  const goList = () => {
    const from = location.state?.from;
    if (from) navigate("/board", { state: from, replace: true });
    else navigate("/board");
  };

  const onDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBoard(id);
      alert("삭제되었습니다.");
      goList();
    } catch (e) {
      console.error(e);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) return <div style={{ padding: 16 }}>불러오는 중…</div>;

  if (!item) {
    return (
      <MobileShell>
        <div style={{ padding: 16 }}>게시글을 찾을 수 없습니다.</div>
        <div style={{ padding: 16 }}>
          <Button onClick={goList}>목록</Button>
        </div>
      </MobileShell>
    );
  }

  const category = item.category || "일반";
  const title = item.boardName || "";
  const writer = item.memName || item.writer || item.memId || "-";
  const date = fmtDate(item.boardDate);
  const content = item.boardContent ?? item.boardDesc ?? "";
  const hasFile = item.pfileName && item.pfileName !== "none.pdf";
  const fileLabel = item.pfileDetail || item.pfileName;
  const fileHref = boardDownloadUrl(item.boardId || id);

  return (
    <MobileShell>
      <div style={{ padding: "5px 20px 24px", backgroundColor: "#fff" }}>
        <TopBar>
          <PageTitle>게시판</PageTitle>
          <TopActions>
            <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
            <ModifyBtn
              onClick={() =>
                navigate(`/board/modify/${id}`, {
                  state: { from: location.state?.from || null },
                })
              }
            >
              수정
            </ModifyBtn>
          </TopActions>
        </TopBar>
        <PageDivider />

        <Card>
          <CardHead>[{category}] {title}</CardHead>
          <Meta>
            {writer} ｜ {date}
          </Meta>
          <CardHr />
          <BodyText>{content}</BodyText>

          {hasFile && (
            <>
              <CardHr />
              <Attachment>
                <AttachmentIcon src={clip} alt="clip" />
                <AttachmentName href={fileHref} target="_blank" rel="noreferrer">
                  {fileLabel}
                </AttachmentName>
              </Attachment>
            </>
          )}

          <CardFooter>
            <Button onClick={goList}>목록</Button>
          </CardFooter>
        </Card>
      </div>

      {/* 댓글 섹션은 API 확정되면 이어서 구현 */}
    </MobileShell>
  );
}
