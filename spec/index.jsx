import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import a11y from 'react-a11y';

if (process.env.NODE_ENV === 'development') a11y(React);

ReactDOM.render(<Root />, document.getElementById('toolbox-test'));
