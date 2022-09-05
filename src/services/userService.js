import axios from "axios";

const handleLoginApi = (email, password) => {
  return axios.post("http://localhost:8081/api/login", {
    email,
    password,
  }).then(function ({data}) {
    return data;
  })
      .catch(function ({response}) {
        return response.data
      });
};

export { handleLoginApi };
