import React from "react";
import Notes from "../components/Notes"

function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
}

export default Home;
