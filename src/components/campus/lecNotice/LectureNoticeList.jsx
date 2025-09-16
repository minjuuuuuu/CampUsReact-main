import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  dropdownArrow, searchIcon, listArrow,
  pageArrow1, pageArrow2, pageArrow3, pageArrow4
} from "../img";
import {
  ListHeader, CatTitle, FlexDiv,
  SearchBar, SearchDrop, SearchText,
  DropHeader, DropList, DropOption,
  WHContainer, DateBox, Title, Button,
  PageNation, PageArrowButton, PageNumText, PageNumberButton, PageText
} from "../commons/WHComponent";
import { getLecNoticeList, getUserSession } from "../api.js";
import LectureNoticeRegist from "./LectureNoticeRegist";

function LectureNoticeList() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUserSession();
  const auth = user?.mem_auth || "";
  const isProfessor = auth.includes("ROLE02") || auth.includes("ROLE_ROLE02");

  const SEARCH_OPTIONS = [
    { label: "전체", value: "" },
    { label: "제목", value: "title" },
    { label: "내용", value: "content" },
    { label: "작성자", value: "writer" },
  ];

  const resolveIds = () => {
    const q = new URLSearchParams(location.search);

    const sessionUser = (() => {
      try { return JSON.parse(sessionStorage.getItem("user") || "null"); } catch { return null; }
    })();

    const mem =
      q.get("memId") ||
      user?.mem_id ||
      sessionStorage.getItem("memId") ||
      sessionUser?.mem_id ||
      "";

    const lec =
      q.get("lecId") ||
      q.get("lec_id") ||
      sessionStorage.getItem("lecId") ||
      sessionStorage.getItem("lec_id") ||
      localStorage.getItem("selectedLecId") ||
      "";

    return { memId: String(mem || ""), lecId: String(lec || "") };
  };

  const initial = resolveIds();
  const [memId, setMemId] = useState(initial.memId);
  const [lecId, setLecId] = useState(initial.lecId);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SEARCH_OPTIONS[0].label);
  const [searchType, setSearchType] = useState(SEARCH_OPTIONS[0].value);
  const [keyword, setKeyword] = useState("");

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showRegist, setShowRegist] = useState(false);

  useEffect(() => {
    if (!showRegist) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [showRegist]);

  const toggleOpen = () => setOpen(!open);

  const handleSelect = (label) => {
    setSelected(label);
    const opt = SEARCH_OPTIONS.find(o => o.label === label);
    const nextType = opt ? opt.value : "";
    setSearchType(nextType);
    doSearch(1, nextType, keyword);
    setOpen(false);
  };

  useEffect(() => {
    const r = resolveIds();
    if (r.memId !== memId) setMemId(r.memId);
    if (r.lecId !== lecId) { setLecId(r.lecId); setPage(1); }
  }, [location.search]);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    let changed = false;
    if (!q.get("memId") && memId) { q.set("memId", memId); changed = true; }
    if (!q.get("lecId") && lecId) { q.set("lecId", lecId); q.set("lec_id", lecId); changed = true; }
    if (changed) navigate({ search: `?${q.toString()}` }, { replace: true });
  }, [memId, lecId]);

  useEffect(() => {
    try {
      if (memId) sessionStorage.setItem("memId", String(memId));
      if (lecId) {
        sessionStorage.setItem("lecId", String(lecId));
        sessionStorage.setItem("lec_id", String(lecId));
        localStorage.setItem("selectedLecId", String(lecId));
      }
    } catch {}
  }, [memId, lecId]);

  const fmtDate = (v) => {
    try {
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
      const s = String(v);
      return s.length >= 10 ? s.slice(0, 10) : s;
    } catch { return ""; }
  };

  const load = async (nextPage = page, nextType = searchType, nextKeyword = keyword) => {
    if (!memId || !lecId) {
      setItems([]); setTotalPage(1);
      return;
    }
    setLoading(true);
    try {
      const { data } = await getLecNoticeList({
        memId, lecId,
        page: nextPage, perPage,
        searchType: nextType,
        keyword: nextKeyword.trim(),
      });
      setItems(data?.items || []);
      setTotalPage(data?.page?.totalPage || 1);
      setPage(nextPage);
    } catch (e) {
      console.error("공지 목록 로드 실패:", e);
      setItems([]); setTotalPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); /* eslint-disable-line */ }, [memId, lecId, perPage]);

  const onKeyDownSearch = (e) => { if (e.key === "Enter") doSearch(1); };
  const doSearch = (nextPage = 1, nextType = searchType, nextKeyword = keyword) => {
    load(nextPage, nextType, nextKeyword);
  };

  const goFirst = () => load(1);
  const goPrev  = () => load(Math.max(1, page - 1));
  const goNext  = () => load(Math.min(totalPage, page + 1));
  const goLast  = () => load(totalPage);

  const openDetail = (item) => {
    navigate(`${item.lecNoticeId}?memId=${encodeURIComponent(memId)}&lecId=${encodeURIComponent(lecId)}`, {
      state: { item, from: { page, searchType, keyword, memId, lecId } }
    });
  };

  const primeRegistContext = () => {
    const p = new URLSearchParams(location.search);
    p.set("memId", memId);
    p.set("lecId", lecId);
    p.set("lec_id", lecId);
    p.set("write", "1");
    navigate({ search: `?${p.toString()}` }, { replace: true });
    try {
      sessionStorage.setItem("memId", String(memId));
      sessionStorage.setItem("lecId", String(lecId));
      sessionStorage.setItem("lec_id", String(lecId));
      localStorage.setItem("selectedLecId", String(lecId));
    } catch {}
  };

  const handleRegistClick = () => {
    const r = resolveIds();
    if (!r.memId || !r.lecId) {
      alert("memId / lecId가 없어 글쓰기를 열 수 없습니다.");
      return;
    }
    if (r.memId !== memId) setMemId(r.memId);
    if (r.lecId !== lecId) setLecId(r.lecId);

    setOpen(false);
    primeRegistContext();
    setShowRegist(true);
    window.scrollTo(0, 0);
  };

  const handleCloseFromRegist = (didCreate) => {
    setShowRegist(false);
    const p = new URLSearchParams(location.search);
    if (p.get("write") === "1") {
      p.delete("write");
      navigate({ search: `?${p.toString()}` }, { replace: true });
    }
    if (didCreate) load(1);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
      <ListHeader>
        <FlexDiv>
          <CatTitle>공지사항</CatTitle>
          {isProfessor && (
            <Button onClick={handleRegistClick} style={{ position: "relative", zIndex: 3, cursor: "pointer" }}>
              글쓰기
            </Button>
          )}
        </FlexDiv>

        <FlexDiv>
          <SearchDrop>
            <DropHeader onClick={toggleOpen}>
              {selected}
              <img src={dropdownArrow} style={{ width: 13, height: 8, marginLeft: "auto", display: "block", marginTop: 8 }} alt="옵션" />
            </DropHeader>
            {open && (
              <DropList style={{ zIndex: 2 }}>
                {SEARCH_OPTIONS.map(opt => (
                  <DropOption key={opt.value} onClick={() => handleSelect(opt.label)}>
                    {opt.label}
                  </DropOption>
                ))}
              </DropList>
            )}
          </SearchDrop>

          <SearchBar>
            <img
              src={searchIcon}
              style={{ width: 15, height: 16, marginBottom: 8, cursor: "pointer" }}
              onClick={() => doSearch(1)}
              alt="search"
            />
            <SearchText
              placeholder="검색어를 입력해 주세요."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={onKeyDownSearch}
            />
          </SearchBar>
        </FlexDiv>
      </ListHeader>

      {loading ? (
        <div style={{ padding: 16 }}>불러오는 중…</div>
      ) : items.length === 0 ? (
        <div style={{ padding: 16, color: "#777" }}>
          {(!memId || !lecId) ? "memId / lecId가 없어 목록을 불러올 수 없습니다." : "등록된 공지사항이 없습니다."}
        </div>
      ) : (
        items.map((it) => (
          <WHContainer
            key={it.lecNoticeId}
            onClick={() => openDetail(it)}
            onKeyDown={(e) => (e.key === "Enter") && openDetail(it)}
            role="button" tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <div style={{ width: 350 }}>
              <DateBox>{fmtDate(it.lecNoticeDate)}</DateBox>
              <Title>{it.lecNoticeName}</Title>
            </div>
            <img src={listArrow} style={{ height: 20, marginTop: 6, pointerEvents: "none" }} alt="자세히" />
          </WHContainer>
        ))
      )}

      <nav>
        <PageNation>
          <PageArrowButton onClick={goFirst}><PageText href="#"><img src={pageArrow1} style={{ width: 13, height: 10, marginLeft: 6 }} alt="첫 페이지" /></PageText></PageArrowButton>
          <PageArrowButton onClick={goPrev}><PageText href="#"><img src={pageArrow2} style={{ width: 6, height: 10, marginLeft: 10 }} alt="이전" /></PageText></PageArrowButton>
          <PageNumberButton><PageNumText href="#">{page}</PageNumText></PageNumberButton>
          <PageArrowButton onClick={goNext}><PageText href="#"><img src={pageArrow3} style={{ width: 6, height: 10, marginLeft: 10 }} alt="다음" /></PageText></PageArrowButton>
          <PageArrowButton onClick={goLast}><PageText href="#"><img src={pageArrow4} style={{ width: 13, height: 10, marginLeft: 6 }} alt="마지막 페이지" /></PageText></PageArrowButton>
        </PageNation>
      </nav>

      {showRegist && (
        <div
          role="dialog"
          aria-modal="true"
          style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 2000, overflow: "auto" }}
        >
          <LectureNoticeRegist
            memId={memId}
            lecId={lecId}
            lec_id={lecId}
            onClose={handleCloseFromRegist}
          />
        </div>
      )}
    </div>
  );
}

export default LectureNoticeList;
