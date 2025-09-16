// src/components/campus/board/BoardModify.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Cancle } from "../img";
import {
  getBoardDetail,
  updateBoardJson,
  updateBoardMultipart,
} from "../api";

/* ===== Summernote (jQuery) ===== */
import $ from "jquery";
window.$ = window.jQuery = $;
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";

/* ===== 전체 화면 오버레이 ===== */
const Fullscreen = styled.div`
  position: fixed; inset: 0; background:#f7f7f7; z-index:2000; overflow:auto;
`;
const Phone = styled.div` width:412px; min-height:100vh; margin:0 auto; background:#fff; `;
const TopBar = styled.div` height:56px; display:flex; align-items:center; padding:0 16px; `;
const CloseBtn = styled.button`
  width:28px;height:28px;padding:0;border:none;background:url(${Cancle}) center/24px 24px no-repeat;
  cursor:pointer;margin-top:25px;font-size:0;color:transparent;
`;
const Spacer = styled.div`flex:1;`;
const SubmitBtn = styled.button`
  width:48px;height:26px;background:#2EC4B6;color:#fff;border:0;border-radius:5px;font-weight:700;
  cursor:pointer;margin-top:20px;
`;
const Body = styled.div` padding:16px; `;
const TitleInput = styled.input`
  width:100%; border:0; border-bottom:1px solid #dcdcdc; padding:10px 2px; font-size:14px; outline:none;
  ::placeholder{ color:#BDBDBD; }
`;
const EditorWrap = styled.div`
  margin-top:16px;
  .note-editor.note-frame{ border:0; box-shadow:none; font-family:'Noto Sans KR','Noto Sans',sans-serif; }
  .note-toolbar{ border:0; padding:6px 0; }
  .note-statusbar{ display:none; }
  .note-editable{ min-height:305px; font-size:14px; line-height:1.5; }
`;
const Row = styled.div` margin-top:16px; padding-top:14px; border-top:1px solid #e5e5e5; `;
const HiddenFile = styled.input.attrs({ type:"file", id:"boardFile" })` display:none; `;
const FileLabel = styled.label`
  width:74px;height:25px;display:inline-block;text-align:center;align-content:center;
  border:1px solid #bdbdbd;border-radius:5px;font-size:12px;background:#f4f4f4;cursor:pointer;margin-right:10px;
`;
const FileText = styled.span` font-size:12px;color:#707070; `;
const Checkbox = styled.label` margin-left:10px;font-size:12px;color:#707070; input{ margin-right:6px; }`;

export default function BoardModify(){
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editorRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [initHtml, setInitHtml] = useState("");

  const [existingFileName, setExistingFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [removeFile, setRemoveFile] = useState(false);

  // 배경 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // 상세 로드
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await getBoardDetail(id, { increaseView:false });
        const item = data?.item ?? data ?? null;
        if(!item) throw new Error("not found");

        setTitle(item.boardName || "");
        const html = item.boardContent ?? item.boardDesc ?? "";
        setInitHtml(html);

        const have = item.pfileName && item.pfileName !== "none.pdf";
        setExistingFileName(have ? (item.pfileDetail || item.pfileName) : "");
      } catch(e){
        console.error(e);
        alert("게시글 정보를 가져오지 못했습니다.");
        navigate(-1);
      } finally { setLoading(false); }
    })();
  }, [id, navigate]);

  // Summernote 안전 초기화 (로드 확인 및 지연 초기화)
  useEffect(() => {
    const el = editorRef.current;
    if(!el) return;

    const init = () => {
      try{
        const $el = window.$(el);
        if(!$el || !$el.summernote){
          // 아직 로드 전이면 한 번 더 시도
          setTimeout(init, 50);
          return;
        }
        // 이미 초기화되어 있으면 건너뜀
        if ($el.next(".note-editor").length) return;

        $el.summernote({
          placeholder: "내용을 입력해주세요.",
          height: 305,
          minHeight: 305,
          toolbar: [
            ["style", ["bold", "underline", "clear"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["insert", ["picture", "link"]],
            ["view", ["codeview"]],
          ],
        });

        // 초기 내용 주입
        if (initHtml) {
          try { $el.summernote("code", initHtml); } catch(_) {}
        }
      }catch(e){ console.error("Summernote init fail:", e); }
    };

    // DOM 붙고 스타일 적용된 다음 tick에서 초기화
    const t = setTimeout(init, 0);
    return () => {
      clearTimeout(t);
      try { window.$(el).summernote("destroy"); } catch(_) {}
    };
  }, [initHtml]);

  const goBack = () => {
    const from = location.state?.from;
    if (from) navigate("/board", { state: from, replace:true });
    else navigate(`/board/detail/${id}`);
  };

  const onPickFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    setSelectedFile(f);
    if (f) setRemoveFile(false);
  };

  const onSubmit = async () => {
    if (!title.trim()) { alert("제목을 입력해주세요."); return; }

    let html = "";
    try { html = window.$(editorRef.current).summernote("code"); } catch(_){}

    try{
      if (selectedFile || removeFile){
        const form = new FormData();
        form.append("boardName", title);
        form.append("boardContent", html);
        form.append("boardDesc", html);
        if (removeFile) form.append("removeFile", "on");
        if (selectedFile) form.append("files", selectedFile);
        await updateBoardMultipart(id, form);
      }else{
        await updateBoardJson(id, { boardName:title, boardContent:html, boardDesc:html });
      }
      alert("수정되었습니다.");
      navigate(`/board/detail/${id}`, { replace:true });
    }catch(e){
      console.error(e);
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <div style={{padding:16}}>불러오는 중…</div>;

  return (
    <Fullscreen>
      <Phone>
        <TopBar>
          <CloseBtn aria-label="닫기" onClick={goBack} />
          <Spacer />
          <SubmitBtn onClick={onSubmit}>등록</SubmitBtn>
        </TopBar>

        <Body>
          <TitleInput
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          />

          <EditorWrap>
            <div ref={editorRef} />
          </EditorWrap>

          <Row>
            <HiddenFile onChange={onPickFile} />
            <FileLabel htmlFor="boardFile">파일선택</FileLabel>

            {!selectedFile && existingFileName && (
              <>
                <FileText>기존: {existingFileName}</FileText>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={removeFile}
                    onChange={(e) => setRemoveFile(e.target.checked)}
                  />
                  첨부 삭제
                </Checkbox>
              </>
            )}
            {selectedFile && <FileText>선택됨: {selectedFile.name}</FileText>}
            {!existingFileName && !selectedFile && (<FileText>선택된 파일이 없습니다.</FileText>)}
          </Row>
        </Body>
      </Phone>
    </Fullscreen>
  );
}
