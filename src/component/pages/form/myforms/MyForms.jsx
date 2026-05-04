import React, { useEffect, useState } from "react";
import formsApi from "../../../../utility/forms.api";
import FormCard from "../../../common/FormCards";

const MyForms = () => {
  const [forms, setForms] = useState([]);


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const resp = await formsApi.myforms();
        setForms(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchForms();
  }, []);

  const handleClick = (title, organization) => {
    console.log("i am clicked...", { title, organization });

  }

  return (
    <div className="flex flex-row gap-[8px]">
      {forms.map((val) => {
        return (
          <FormCard
            description={val.description}
            organization={val.organizationName}
            title={val.name}
            onClick={handleClick}
            key={val._id}
          />
        );
      })}
    </div>
  );
};

export default MyForms;
