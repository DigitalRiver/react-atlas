# Conventions
## Table of Contents
  1. [What are Conventions](#what-are-conventions)
  1. [React Components](#react-components)
    1. [React-Atlas React/JSX Style Guide](https://github.com/DigitalRiver/react-atlas/blob/master/wiki/React-Atlas-React-JSX-Style-Guide)
    1. [Sample Component](#sample-component)
  1. [CSS](https://github.com/DigitalRiver/react-atlas/blob/master/wiki/Conventions#css)
    1. [Composes Order](https://github.com/DigitalRiver/react-atlas/blob/master/wiki/Conventions#composes-order)
  
## What are Conventions?
Conventions are patterns and styles of coding that we can not enforce via eslint/istanbul/some other tool. They could also be called 'best practices', though that is somewhat of a loaded term and changes from month-to-month in the Javscript world. The React-Atlas conventions are agree upon coding styles that we, the maintainers, will try our best to keep.

There are many benefits to following specific conventions. For one, it helps the codebase look and feel the same through. This allows us to easily grok any given file and ascertain the structure and purpose of any given function/class/method/component/etc. For this reason it also helps with debugging and future maintenance/refactoring.

Some of these conventions are in place for the reasons described above, and some are to prevent known issues that might arise when not following the specified convention. For instance, a build might break if you import something in the wrong order, thus we will define our importing convention in this section of the Wiki for reference.

## React Components
Please look at [our fork](https://github.com/DigitalRiver/react-atlas/blob/master/wiki/React-Atlas-React-JSX-Style-Guide) of the [AirBnB React Style Guide](https://github.com/airbnb/javascript/tree/master/react):
https://github.com/DigitalRiver/react-atlas/blob/master/wiki/React-Atlas-React-JSX-Style-Guide

Here is a sample Component for quick reference of a general component.

### Sample Components
#### Boilerplate Class Component
```javascript
//import React but also destructure Component and PropType out
//so we can use those without 'React.' prefix
import React, { Component, PropTypes } from 'react';

//propTypes and defaultProps are defined outside and appended later at the bottom
const propTypes = {
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

class someComponentName extends Component {
    //Set default state with constructor
    constructor(props) {
        super(props);
        this.state = {
            // Default state here.
        }
    }

    //Static Methods
    static someStaticMethod () {},

    //Lifecycle methods
    getChildContext () {},
    componentWillMount () {},
    componentDidMount () {},
    componentWillReceiveProps () {},
    shouldComponentUpdate () {},
    componentWillUpdate () {},
    componentDidUpdate () {},
    componentWillUnmount () {},

    //Custom Methods (Note _ prefix, this is opposite AirBnB style)

    //Custom Event/Click/Etc Methods
    //Arrow functions if you don't want to do .bind(this) in JSX
    _someClickHandler = () => {},
    _someEventHandler () {},

    //Custom Getter/Math/Utility/Etc methods
    _someGetMethod () {},

    //Custom Render methods (Usually maps)
    _renderSomething () {},

    //main Render method at bottom
    render () {
        return (
            <div onClick={this._someClickHandler} onChange={this._someEventHandler.bind(this)}>
                {this.props.text}
            </div>
        )
    }
}

//Attach propTypes/defaultProps to component.
someComponentName.propTypes;
someComponentName.defaultProps;
```

#### Boilerplate Function Component
```javascript
//import React but also destructure Component and PropType out
//so we can use those without 'React.' prefix
import React, { Component, PropTypes } from 'react';

//propTypes and defaultProps are defined outside and appended later at the bottom
const propTypes = {
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

const someComponentName = (props) => {
    //Function components have no lifecycle methods to access
    //Function components should contain no state
    //Function components should just contain what would be in render()
    return (
        <div onClick={props.onClick} onChange={props.onChange}>
            {props.text}
        </div>
    )
}

//Attach propTypes/defaultProps to component.
someComponentName.propTypes;
someComponentName.defaultProps;
```
## CSS
Here we define some of our CSS conventions

### Using Composes
We use CSS Modules for our CSS, this allows us a unique 'composes' feature. Composes lets us bring in classes from other files to help craft a 'css module'. This is similar to SASS Extend, except that its not adding styles to any given class, it actually allows for full REUSE of a class. This pairs very well with atomic css concepts and libraries such as [Basscss](http://www.basscss.com/), [Expressive CSS](http://johnpolacek.github.io/expressive-css/), [Tachyons](http://tachyons.io/), [Minions.css](https://github.com/chantastic/minions.css), etc.

#### Import from styles.css
You'll notice that there is a ```/styles/``` directory in the app. **do not compose from files in the styles directory**. Instead compose directly from the ```styles.css``` file. 
```css
.someClass {
  composes: something from '../styles.css';
}
```
The ```styles.css``` file has the proper imports in it that relate to each style file in the ```/styles/``` directory. This is important because when using ```composes``` the order that the css files are imported matters. By always composing from the ```styles.css``` file, we no longer have to worry about the order we compose in our style classes.

#### Can't compose in pseudo selectors
One important note about the ```composes``` functionality, is that it can not be used inside a pseudo selector
```diff
.someClass {
+  composes: blue from '../styles.css';
}

.someClass:hover {
-  composes: purple from '../styles.css';
+  color: purple;
}