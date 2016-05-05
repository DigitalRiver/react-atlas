import Hint from '../../atlas-core/hint';
import style from './hint.css';
import createComponent from '../createComponent';

// An example of generated hashclasses by either JSS, CSSModules or any other
// CSS libraries which generates classes.
const theme = {
  base: style.base
};

export default createComponent(Hint, theme);
