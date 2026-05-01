import React, { useEffect, useState } from "react";
import formsApi from "../../../../utility/forms.api";

const MyForms = () => {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    try {
      const resp = await formsApi.myforms();
      console.log(resp);
      setForms(resp); // or setForms(resp.data) depending on API response
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return <div>MyForms</div>;
};

export default MyForms;