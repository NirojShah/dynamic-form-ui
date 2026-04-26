import methods from "../api-instance/apiInstance";

const login = async ({ email, password }) => {
  try {
    const resp = await methods.post("/user/login", { email, password }, false);
    if (resp.status == "success") {
      localStorage.setItem()
      return resp.token;
    }
  } catch (err) {
    console.log(err);
  }
};

const userApis = {
  login,
};

export default userApis;
