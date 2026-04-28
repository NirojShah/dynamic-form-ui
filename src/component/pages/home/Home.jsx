import React from "react";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return <div>
    <Button onClick={() => {
      navigate("/sample")
    }}>
      sample
    </Button>
  </div>;
};

export default Home;
