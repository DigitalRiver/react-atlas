
# React-atlas testing
-----------------------------------------------------

## Examples

### Setup tests for component
To setup testing for a component create a folder called `__tests__` inside the components folder. Jest automatically searches for folders named `__tests__` and runs test files found with in. Test files should be named after the component with `.test.js` appended to the end. For example the dialog components test file would be named `dialog.test.js`.

### Imports/Dependencies
To test a react-atlas component or any react component you will need to import `React`, `mount` and/or `shallow` from enzyme and the component you want to test, in this case the dialog component. Below is an example of the imports needed for testing the dialog component.
```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import Dialog from '../../dialog'
```

### Setup test boilerplate
Next use `describe()` to declare your test suite for this component. Inside `describe()` use `it()` to declare each individual test. Both `describe()` and `it()` take a string for their first argument. The string describes what the test suite or indvidual test is doing. `describe()` and `it()` also take a function as their second argument. Inside this function is where the test code goes. To add a new test just create another `it()` function as shown below.
```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import Dialog from '../../dialog'

describe('Test dialog component example', () => {
  /* First unit test. */
  it('Test default props', function() {
    /* Unit test code here */
  });

  /* Second unit test. */
  it('Test click event handler', function() {
    /* Unit test code here */

  });
});
```

### Writing tests

React Atlas uses chai for the assertion library. More info about chai can be found here: http://chaijs.com/ Using chai allows us to use three different styles of assertions, more info about the different styles can be found here: http://chaijs.com/guide/styles/

### Running tests
To run all tests use `npm test`. If you want a coverage report generated use `npm run coverage` instead. The report will be in a newly created folder called coverage. Inside coverage is a folder called lcov-report, open that folder and you will see a file called index.html. Open index.html with a browser to see the coverage report.

### Test Component props
To test the props that a component has, `mount` it and call `.props().nameOfVariable` on the component that is returned. Replace `nameOfVariable` with the actual name of the variable you want to test. Below is an example of testing a prop variable with the name `active`.
```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import Dialog from '../../dialog'

describe('Check props example', () => {
  it('Test default props', function() {
    const result = mount(<Dialog></Dialog>);
    expect(result.props().active).toBe(false);
  });
});
```
### Test Component State
To test the state that a component has, `mount` it and call `.state().nameOfVariable` on the component that is returned. Replace `nameOfVariable` with the actual name of the variable you want to test. Below is an example of testing a state variable with the name `active`.
```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import Dialog from '../../dialog'

describe('Check props example', () => {
  it('Test default props', function() {
    const result = mount(<Dialog></Dialog>);
    expect(result.state().active).toBe(false);
  });
});
```

### Testing Styles
Often you want to make sure the correct css is being set. Enzyme gives you a round about way of checking styles that have been set. First use `.find()` to search for the top level element being returned from the componet under test. In the example we are searching for a div because that's what gridcol returns. Then call `.first().props('style').style` followed by the name of the style you want to check for. So in the example below we are checking the value of the style flex.

```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import GridCol from '../../grid_col'

describe('Check props example', () => {
  it('Test default props', function() {
    const result = mount(<Dialog></Dialog>);
    expect(result.find('div').first().props('style').style.flex).toBe("1 0 " + basis);
  });
});

```

### Testing Click Events
To test click events, use `shallow` to render the component.
Use `sinon` to gain access to the click handler. Now you can call `.simulate('.click');` on the component that was returned from `shallow`. Now you can use `sinon` to assert wether the function was called, threw an exception and much more: http://sinonjs.org/docs/  

```javascript
import React from 'react'
import { shallow } from 'enzyme';
import { Dropdown } from '../../dropdown';
import sinon from 'sinon';

describe('Click event example', () => {
  it('Test click event', function() {
    const stub = sinon.spy(Dropdown.prototype, 'onWindowClick');
    const result = shallow(<Dropdown></Dropdown>);
    result.simulate('click');
    sinon.assert.calledOnce(stub);
  });
});
```

### Testing Image Error Handlers
Sometimes you will need to simulate an image failing to load. To do that `mount` the component and use `.find()` to search for the img tag. Then call `.simulate('error')`on the object returned from `.find()`. Below is an example of simulating an image error.

```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import Avatar from '../../avatar'

let image = "picture.jpg";

describe('Image error handler test example', function() {
  it('If image is set but fails to load fall back on the default image.', function() {
    const result = mount(<Avatar image={"incorrect.jpg"} defaultImage={image} />);
    var img = result.find('img');
    img.simulate('error');
    expect(result.state().image).toBe(image);
  });
});
```

### Testing Unmount Handlers
To test unmount event handlers set everything up like normal except also import `sinon`. We will use `sinon` to get access to
the unmount event handler. Use the assertions inside `sinon` to test the event handler.
```javascript
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Dialog from '../../overlay'

describe('Click event example', () => {
  it('Test click event', function() {
    const willUnmount = sinon.spy(Overlay.prototype, 'componentWillUnmount');
    const result = mount(<Overlay></Overlay>);
    result.unmount();
    sinon.assert.calledOnce(willUnmount);
  });
});

```


## Design Choices
React Atlas is currently using Jest and Enzyme for testing. This section will go over why these technologies were chosen instead of alternatives.

### Jest
Jest was chosen for the simple fact that it works. Orginally karma was chosen as the test runner. However karma is "too" configurable, meaning documentation about using karma for testing react is fragmented because there are several ways of doing things. With jest there is the "one" way of doing things which lowers the learning curve. Jest is also much simpler to configure than karma. The jest config is a couple lines long and lives in package.json. karma required a seperate config file that was about a hundred lines long to achieve the same goal.

### Enzyme
In the react testing world it seems most people are either using jest's test utils, or they are using enzyme for there testing. Enzyme is a wrapper around jest's test utils and provides an easier to use API. Enzyme is also well documented between the official documentation and the hundreds of blog posts.
