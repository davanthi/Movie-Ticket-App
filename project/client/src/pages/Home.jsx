import React from "react";
import { getCurrentUser } from "../Calls/authCalls.js";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function Home() {
  const fetchCurrentUser = async () => {
    const userData = await getCurrentUser();
    console.log(userData);
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div>
      <h1>This is Home Page</h1>
    </div>
  );
}

export default Home;
