import React from "react";


export default function Alert(props) {
 
    return (
    props.alert && <div className="alert-container" >
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert">
        <strong>{props.alert.msg}</strong>
        {/* <a href="#"  class="close" data-bs-dismiss="alert" aria-label="close"></a> */}

        
      </div>
    </div>
  );
}
