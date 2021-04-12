import axios from "@/request"

export default {
  getUser() {
    return axios.get("/user")
  },
}
