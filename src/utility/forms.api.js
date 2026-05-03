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

const createForm = async ({ fields, title, desc }) => {
  try {
    // console.log(fields);
    const resp = await methods.post("/form/form-fields", {
      fields,
      title,
      desc,
    });
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

const formsApi = {
  myforms,
  createForm,
};

export default formsApi;
