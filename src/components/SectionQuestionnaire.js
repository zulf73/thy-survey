import React from "react";
import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { Radio } from "final-form-material-ui";

import PersonalityQuestion from "./PersonalityQuestion.js";
/*
<FormControl component="fieldset">
  <FormLabel component="legend">Gender</FormLabel>
  <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
    <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
    <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
    <FormControlLabel value="other" control={<StyledRadio />} label="Other" />
    <FormControlLabel
      value="disabled"
      disabled
      control={<StyledRadio />}
      label="(Disabled option)"
    />
  </RadioGroup>
</FormControl>
*/
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = values => {
  alert("Pressed submit");
  console.log(JSON.stringify(values));
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

export default class SectionQuestinnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Q1: "3",
      Q2: "3",
      Q3: "3",
      Q4: "3",
      Q5: "3",
      Q6: "3",
      Q7: "3",
      Q8: "3",
      Q9: "3",
      Q10: "3",
      Q11: "3",
      Q12: "3",
      Q13: "3",
      Q14: "3",
      Q15: "3",
      Q16: "3",
      Q17: "3",
      Q18: "3",
      Q19: "3",
      Q20: "3",
      Q21: "3",
      Q22: "3",
      Q23: "3",
      Q24: "3",
      Q25: "3",
      Q26: "3",
      Q27: "3",
      Q28: "3",
      Q29: "3",
      Q30: "3",
      Q31: "3",
      Q32: "3",
      Q33: "3",
      Q34: "3",
      Q35: "3",
      Q36: "3",
      Q37: "3",
      Q38: "3",
      Q39: "3",
      Q40: "3",
      Q41: "3",
      Q42: "3",
      Q43: "3",
      Q44: "3",
      Q45: "3",
      Q46: "3",
      Q47: "3",
      Q48: "3",
      Q49: "3",
      Q50: "3",
      Q51: "3",
      Q52: "3",
      Q53: "3",
      Q54: "3",
      Q55: "3",
      Q56: "3",
      Q57: "3",
      Q58: "3",
      Q59: "3",
      Q60: "3",
      Q61: "3"
    };

    this.handleChanged = this.handleChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("I was triggered during componentDidMount");
  }

  handleChanged = type => ev => {
    this.setState({ [type]: ev.target.value });
    console.log("Selection of " + type + " changed to " + ev.target.value);
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submit Pressed");
    alert(JSON.stringify(this.state));
    console.log(JSON.stringify(this.state));
  }

  render() {
    console.log("Triggered during render");
    var g = require(__dirname + "/questions.js");
    //const q = fs.readFileSync(__dirname + "/questions.json");
    const q = g.getQuestions();
    let json = q;
    var arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });

    /*
    return (
      <ul>
        {arr.map(item => (
          <li>
            <PersonalityQuestion name={item.title} value="3" />
          </li>
        ))}
      </ul>
    );
    */

    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={this.state}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Personality Questionnaire
              </FormLabel>
              {arr.map(item => (
                <RadioGroup row key={item.name}>
                  <FormLabel component="legend">{item.title}</FormLabel>
                  <FormControlLabel
                    label="1"
                    control={
                      <Field
                        name={item.name}
                        component={Radio}
                        type="radio"
                        value="1"
                      />
                    }
                  />

                  <FormControlLabel
                    label="2"
                    control={
                      <Field
                        name={item.name}
                        component={Radio}
                        type="radio"
                        value="2"
                      />
                    }
                  />
                  <FormControlLabel
                    label="3"
                    control={
                      <Field
                        name={item.name}
                        component={Radio}
                        type="radio"
                        value="3"
                      />
                    }
                  />
                  <FormControlLabel
                    label="4"
                    control={
                      <Field
                        name={item.name}
                        component={Radio}
                        type="radio"
                        value="4"
                      />
                    }
                  />
                  <FormControlLabel
                    label="5"
                    control={
                      <Field
                        name={item.name}
                        component={Radio}
                        type="radio"
                        value="5"
                      />
                    }
                  />
                </RadioGroup>
              ))}
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitting}
            >
              Submit
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }

  /*
  return <p>Hello</p>;
  */
}
