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

const getPublicLink = async (name, orgName) => {
  try {
    const resp = await methods.post("/form/get-public-link", {
      name: name,
      orgName: orgName,
    });

    return resp.data.url;
  } catch (err) {
    console.log(err);
  }
};

const getPublicFormFields = async (key) => {
  const resp = await methods.get(`/public/form/${key}`);
  return resp;
};

const formsApi = {
  myforms,
  createForm,
  getPublicLink,
  getPublicFormFields,
};

export default formsApi;
