import Hint from '../core/src/hint';
import style from './hint.css';
import createComponent from '../createComponent';

// An example of generated hash classes by either JSS, CSSModules or any other
// CSS libraries which generates classes.
const theme = {
  base: style.base
};

export default createComponent(Hint, theme);
