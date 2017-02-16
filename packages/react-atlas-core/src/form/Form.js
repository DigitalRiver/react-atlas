import React, { PropTypes } from "react";

/**
 * A simple wrapper around the regular HTML `<form>` element.
 */
const Form = ({ children, ...props }) => {
  return (
    <form {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  "children": PropTypes.node
};

Form.styleguide = {
  "category": "Form Components",
  "index": "3.3",
  "wrappedExample": true,
  "example": 
    `
class FormExample extends React.Component {
  handleEvent = (type, event) => {
    console.log('handleEvent triggered: ', event);
  };

  render () {
    return (
      <section>
        <h5>Form</h5>
        <p>Some text in a form</p>

        <Form
          onChange={this.handleEvent.bind(this,'change')}
          onSubmit={this.handleEvent.bind(this,'submit')}>
            <Input
              type="text"
              label="First Label"
              maxLength={12}
              placeholder="Some Input placeholder"
            />
            <Checkbox label="Some Checkbox" />
            <Button type="submit">Some Submit Button</Button>
        </Form>
      </section>
    );
  }
}
ReactDOM.render(<FormExample/>, mountNode); 
`
  
};

export default Form;
