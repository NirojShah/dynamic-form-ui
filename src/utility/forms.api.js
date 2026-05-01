import methods from "../api-instance/apiInstance";

const myforms = async () => {
  try {
    const resp = await methods.get("/form/forms");
    if (resp.status == "success") {
      return {
        status: true,
        data: resp.data,
      };
    }
    return {
      message: resp.message,
    };
  } catch (err) {
    console.log(err);
  }
};

const formsApi = {
  myforms,
};

export default formsApi;
