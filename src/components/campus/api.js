import axios from "axios";

axios.defaults.withCredentials = true;

if (import.meta?.env?.VITE_API_BASE) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
}

function toFormData(obj = {}) {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    fd.append(k, v);
  });
  return fd;
}

export function getHomeworklist() {
  return axios.get("/api/homework/list");
}
export function getStudent(memId) {
  return axios.get("/api/student", { params: { memId } });
}

/* === 로그인/세션/로그아웃 === */
export async function loginUser(id, pwd) {
  try {
    return await axios.post("/api/login/index", { id, pwd });
  } catch (e) {
    if (e?.response?.status !== 404) throw e;
  }
  const form = new URLSearchParams({ id, pwd });
  return axios.post("/login/index", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export async function checkSession() {
  try {
    return await axios.get("/api/login/check");
  } catch (e) {
    if (e?.response?.status !== 404) throw e;
  }
  return axios.get("/login/check");
}

export async function logoutUser() {
  try {
    return await axios.post("/api/login/logout", {});
  } catch (e) {
    if (e?.response?.status !== 404) throw e;
  }
  return axios.post("/login/logout", {});
}

export const getUserSession = () => {
  try {
    const raw = sessionStorage.getItem("user");
    const user = raw ? JSON.parse(raw) : null;
    if (!user) return { name: "", id: "", mem_id: "", mem_auth: "", pictureUrl: "" };
    return {
      ...user,
      pictureUrl: user.mem_id
        ? `http://localhost/campus/member/getPicture?id=${user.mem_id}`
        : "",
    };
  } catch (err) {
    console.error("세션에서 사용자 정보를 가져오는데 실패:", err);
    return { name: "", id: "", mem_id: "", mem_auth: "", pictureUrl: "/img/user1.png" };
  }
};

export function changeLecMajor(lec_id) {
  return axios.post("/api/lecnotice/changeMajor", null, { params: { lec_id } });
}

export function getLecNoticeList({
  memId,
  lecId,
  page = 1,
  perPage = 10,
  searchType = "",
  keyword = "",
}) {
  return axios.get("/api/lecnotice", {
    params: {
      memId,
      lecId,
      page,
      perPage,
      ...(searchType ? { searchType } : {}),
      ...(keyword ? { keyword } : {}),
    },
  });
}

export function getLecNoticeDetail(id, { increaseView = true } = {}) {
  return axios.get(`/api/lecnotice/${id}`, { params: { increaseView } });
}

export function createLecNoticeMultipart(formData) {
  return axios.post("/api/lecnotice", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function createLecNoticeJson(body) {
  return createLecNoticeMultipart(toFormData(body));
}
export function updateLecNoticeJson(id, body) {
  return axios.put(`/api/lecnotice/${id}`, toFormData(body), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function updateLecNoticeMultipart(id, formData) {
  return axios.put(`/api/lecnotice/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function deleteLecNotice(id) {
  return axios.delete(`/api/lecnotice/${id}`);
}

export function lecNoticeDownloadUrl(id, which = 1) {
  return `/campus/lecnotice/file?lecNoticeId=${id}&which=${which}`;
}
export async function downloadLecNoticeFile(id, which = 1) {
  const url = lecNoticeDownloadUrl(id, which);
  const res = await axios.get(url, { responseType: "blob" });
  return res.data;
}

export function changeBoardMajor(lec_id) {
  return axios.post("/api/board/changeMajor", null, { params: { lec_id } });
}

const SEARCH_MAP = { title: "t", writer: "w", content: "c", t: "t", w: "w", c: "c", "": "" };

export function getBoardList({
  page = 1,
  perPage = 10,
  searchType = "", 
  keyword = "",
  category = "",
  lecId = "",
}) {
  const st = SEARCH_MAP[searchType] ?? SEARCH_MAP[""];
  return axios.get("/api/board", {
    params: {
      page,
      perPage,
      ...(st ? { searchType: st } : {}),
      ...(keyword ? { keyword } : {}),
      ...(category ? { category } : {}),
      ...(lecId ? { lecId } : {}),
    },
  });
}

export function getBoardDetail(id, { increaseView = true } = {}) {
  return axios.get(`/api/board/${id}`, { params: { increaseView } });
}

export function createBoardJson(body) {
  return axios.post("/api/board", toFormData(body), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function createBoardMultipart(formData) {
  return axios.post("/api/board", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function updateBoardJson(id, body) {
  return axios.put(`/api/board/${id}`, toFormData(body), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function updateBoardMultipart(id, formData) {
  return axios.put(`/api/board/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function deleteBoard(id) {
  return axios.delete(`/api/board/${id}`);
}

export function boardDownloadUrl(id) {
  return `/campus/board/file?boardId=${encodeURIComponent(id)}`;
}
export async function downloadBoardFile(id) {
  const url = boardDownloadUrl(id);
  const res = await axios.get(url, { responseType: "blob" });
  return res.data;
}
