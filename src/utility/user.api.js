import methods from "../api-instance/apiInstance";

const login = async ({ email, password }) => {
  try {
    const resp = await methods.post("/user/login", { email, password }, false);
    if (resp.status == "success") {
      localStorage.setItem("token", resp.token);
      return {
        success: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const signUp = async ({ name, email, password, organizationId }) => {
  try {
    const resp = methods.post("/user/signup", {
      name,
      email,
      password,
      organizationId,
    });
    if (resp.data.status == "success") {
      console.log("signup successfully.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getMe = async () => {
  try {
    const resp = await methods.get("/user/me");    
    return resp;
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const userApis = {
  login,
  signUp,
  getMe,
};

export default userApis;
