import React from "react";
import { mount } from "enzyme";
import { Form } from "../index";
import { TextField } from "../../TextField/index";
import { Hint } from "../../Hint/index";
import { Label } from "../../Label/index";
import { Dropdown } from "../../Dropdown/index";
import { Option } from "../../Option/index";
import { Switch } from "../../Switch/index";
import { TextArea } from "../../TextArea/index";
import { CheckboxGroup } from "../../CheckboxGroup/index";
import { Checkbox } from "../../Checkbox/index";
import { RadioGroup } from "../../RadioGroup/index";
import { Radio } from "../../Radio/index";
import { Button } from "../../Button/index";
import renderer from "react-test-renderer";

describe("Test Hint component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Form
          action="/"
          onSubmit={submitObject => {
            console.log(submitObject);
          }}
        >
          <div
            style={{
              width: "250px",
              paddingRight: "10px",
              display: "inline-block"
            }}
          >
            <TextField
              name="firstName"
              style={{ width: "200px" }}
              label="First Name: "
              required
            />
            <TextField
              name="phoneNumber"
              style={{ width: "200px" }}
              label="Phone Number: "
              placeholder="(___) ___-____"
              mask="(111) 111-1111"
            />
            <TextField
              name="address1"
              style={{ width: "200px" }}
              label="Address Line 1: "
              required
            />
            <TextField
              name="address2"
              disabled="true"
              style={{ width: "200px" }}
              label="Address Line 2: "
            />
            <Hint>
              Disabled inputs will not be included in the submitObject
            </Hint>
            <TextField
              name="zipCode"
              style={{ width: "200px" }}
              label="Zip Code: "
              required
            />
            <Label htmlFor="htmlInput" label="HTML Input" />
            <input type="text" name="htmlInput" id="htmlInput" />
          </div>
          <div
            style={{
              width: "250px",
              paddingRight: "10px",
              display: "inline-block",
              verticalAlign: "top"
            }}
          >
            <TextField
              name="lastName"
              style={{ width: "200px" }}
              label="Last Name: "
              required
            />
            <TextField
              name="city"
              style={{ width: "200px" }}
              label="City: "
              required
            />
            <Dropdown
              name="state"
              id="state"
              label="State"
              style={{ width: "200px" }}
              autocomplete="new-password"
              filter
              required
            >
              <Option value="AL" text="Alabama" />
              <Option value="AK" text="Alaska" />
              <Option value="AS" text="American Samoa" />
              <Option value="AZ" text="Arizona" />
              <Option value="AR" text="Arkansas" />
              <Option value="CA" text="California" />
              <Option value="CO" text="Colorado" />
              <Option value="CT" text="Connecticut" />
              <Option value="DE" text="Delaware" />
              <Option value="DC" text="District Of Columbia" />
              <Option value="FM" text="Federated States Of Micronesia" />
              <Option value="FL" text="Florida" />
              <Option value="GA" text="Georgia" />
              <Option value="GU" text="Guam" />
              <Option value="HI" text="Hawaii" />
              <Option value="ID" text="Idaho" />
              <Option value="IL" text="Illinois" />
              <Option value="IN" text="Indiana" />
              <Option value="IA" text="Iowa" />
              <Option value="KS" text="Kansas" />
              <Option value="KY" text="Kentucky" />
              <Option value="LA" text="Louisiana" />
              <Option value="ME" text="Maine" />
              <Option value="MH" text="Marshall Islands" />
              <Option value="MD" text="Maryland" />
              <Option value="MA" text="Massachusetts" />
              <Option value="MI" text="Michigan" />
              <Option value="MN" text="Minnesota" />
              <Option value="MS" text="Mississippi" />
              <Option value="MO" text="Missouri" />
              <Option value="MT" text="Montana" />
              <Option value="NE" text="Nebraska" />
              <Option value="NV" text="Nevada" />
              <Option value="NH" text="New Hampshire" />
              <Option value="NJ" text="New Jersey" />
              <Option value="NM" text="New Mexico" />
              <Option value="NY" text="New York" />
              <Option value="NC" text="North Carolina" />
              <Option value="ND" text="North Dakota" />
              <Option value="MP" text="Northern Mariana Islands" />
              <Option value="OH" text="Ohio" />
              <Option value="OK" text="Oklahoma" />
              <Option value="OR" text="Oregon" />
              <Option value="PW" text="Palau" />
              <Option value="PA" text="Pennsylvania" />
              <Option value="PR" text="Puerto Rico" />
              <Option value="RI" text="Rhode Island" />
              <Option value="SC" text="South Carolina" />
              <Option value="SD" text="South Dakota" />
              <Option value="TN" text="Tennessee" />
              <Option value="TX" text="Texas" />
              <Option value="UT" text="Utah" />
              <Option value="VT" text="Vermont" />
              <Option value="VI" text="Virgin Islands" />
              <Option value="VA" text="Virginia" />
              <Option value="WA" text="Washington" />
              <Option value="WV" text="West Virginia" />
              <Option value="WI" text="Wisconsin" />
              <Option value="WY" text="Wyoming" />
            </Dropdown>
            <br />
            <Switch
              leftLabel
              name="gift"
              id="gift"
              value="gift"
              label="Gift Purchase:"
            />
            <TextArea
              style={{ width: "200px" }}
              name="comment"
              required
              label="Comments:"
            />
          </div>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <CheckboxGroup
              title="Shipping"
              min={1}
              limitMessage="Select at least {0}."
            >
              <Checkbox
                label="Standard"
                name="deliveryMethod"
                value="standard"
                required
              />
              <Checkbox label="2-Day" name="deliveryMethod" value="2-Day" />
              <Checkbox label="1-Day" name="deliveryMethod" value="1-Day" />
            </CheckboxGroup>
            <RadioGroup title="Address Type" selectedIndex={0}>
              <Radio name="homeBusiness" label="Home" value="home" />
              <Radio name="homeBusiness" label="Business" value="business" />
            </RadioGroup>
            <Label htmlFor="carType" label="Car Type" />
            <select name="carType" id="carType">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div style={{ padding: "10px 0" }}>
            <TextField
              name="captcha"
              value=""
              style={{ width: "200px" }}
              label="Confirm you are not a robot: "
              valid={(event, value) => {
                if (value === "shark banana") {
                  return true;
                } else {
                  return {
                    status: "error",
                    message: "Please enter the correct value"
                  };
                }
              }}
            />
            <br />
            <Hint>Enter the words: shark banana</Hint>
            <br />
            <Checkbox
              name="tsandcs"
              label="I have read and agree to the terms and conditions."
              value="tsandcs"
              required
            />
            <br />
            <Button primary type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders alert when errors are not hidden and errors are present", function() {
    const errorList = [
      {
        name: "Generic Error",
        message: "Something went wrong"
      }
    ];
    const form = mount(
      <Form>
        <TextField
          name="firstName"
          style={{ width: "200px" }}
          label="First Name: "
          required
        />
      </Form>
    );
    form.setState({ errorList: errorList });
    expect(form.find("Alert").exists()).toBe(true);
    expect(form.html()).toContain(errorList[0].name);
    expect(form.html()).toContain(errorList[0].message);
  });

  it("does not render alert when hideErrors is true", function() {
    const errorList = [
      {
        name: "Generic Error",
        message: "Something went wrong"
      }
    ];
    const form = mount(
      <Form hideErrors={true}>
        <TextField
          name="firstName"
          style={{ width: "200px" }}
          label="First Name: "
          required
        />
      </Form>
    );
    form.setState({ errorList: errorList });
    expect(form.find("Alert").exists()).toBe(false);
    expect(form.html()).not.toContain(errorList[0].name);
    expect(form.html()).not.toContain(errorList[0].message);
  });

  it("_validateAndSubmit checks for errors, prevents default, does not call onSubmit when errors exist", function() {
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmit = jest.fn();
    const form = mount(
      <Form id="myForm" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          style={{ width: "200px" }}
          required
          title="First Name"
        />
        <CheckboxGroup
          title="Shipping"
          min={1}
          limitMessage="Select at least {0}."
        >
          <Checkbox
            label="Standard"
            name="deliveryMethod"
            value="standard"
            required
          />
          <Checkbox label="2-Day" name="deliveryMethod" value="2-Day" />
          <Checkbox label="1-Day" name="deliveryMethod" value="1-Day" />
        </CheckboxGroup>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    form.find("form").simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(form.state().errorList.length).toBe(3);
    expect(form.find("Alert").exists()).toBe(true);
    expect(form.find("Alert").html()).toContain("First Name:");
    expect(form.find("Alert").html()).toContain("Shipping:");
    expect(form.find("Alert").html()).toContain("Standard:");
    expect(handleSubmit).not.toBeCalled();
    console.log(form.instance());
  });

  it("_validateAndSubmit validates, prevents default, calls onSubmit when no errors are found", function() {
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmit = jest.fn();
    const form = mount(
      <Form id="myForm" onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          style={{ width: "200px" }}
          label="First Name: "
          required
          value="John"
        />
        <input type="text" name="htmlInput" />
        <Checkbox
          label="Standard"
          name="deliveryMethod"
          value="standard"
          required
          checked
        />
        <RadioGroup title="Address Type" selectedIndex={0}>
          <Radio name="homeBusiness" label="Home" value="home" />
          <Radio name="homeBusiness" label="Business" value="business" />
        </RadioGroup>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    form.find("form").simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(form.state().errorList.length).toBe(0);
    expect(form.find("Alert").exists()).toBe(false);
    expect(handleSubmit).toBeCalledWith({
      firstName: "John",
      htmlInput: "",
      deliveryMethod: "standard",
      homeBusiness: "home"
    });
  });

  it("_validateAndSubmit does not call onSubmit if onSubmit prop does not exist", function() {
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmit = jest.fn();
    const form = mount(
      <Form id="myForm">
        <TextField
          name="firstName"
          style={{ width: "200px" }}
          label="First Name: "
          required
          value="John"
        />
        <input type="text" name="htmlInput" />
        <Checkbox
          label="Standard"
          name="deliveryMethod"
          value="standard"
          required
          checked
        />
        <RadioGroup title="Address Type" selectedIndex={0}>
          <Radio name="homeBusiness" label="Home" value="home" />
          <Radio name="homeBusiness" label="Business" value="business" />
        </RadioGroup>
        <Button primary type="submit">
          Submit
        </Button>
      </Form>
    );
    form.find("form").simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
    expect(form.state().errorList.length).toBe(0);
    expect(form.find("Alert").exists()).toBe(false);
    expect(handleSubmit).not.toBeCalled();
  });
});
