import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
//commenting out react a11y for now. put back in later when we need it. could have npm2 vs npm3 issues.
//import a11y from 'react-a11y';

//if (process.env.NODE_ENV === 'development') a11y(React);

ReactDOM.render(<Root />, document.getElementById('toolbox-test'));
