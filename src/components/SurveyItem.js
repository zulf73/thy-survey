import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SurveyItem(props) {
    
  return (
        <div key="default-radio">
	  {props.name}
	  {["1", "2","3","4","5"].map(type => (
          <Form.Check
            type="radio"
            inline
            id=`b-${type}`
            label={type}
          />
        </div>
      ))}
    </>
  );
}

