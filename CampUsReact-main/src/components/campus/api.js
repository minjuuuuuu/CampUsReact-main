import axios from "axios";

export function getHomeworklist() {
  return axios.get('/api/homework/list');
}