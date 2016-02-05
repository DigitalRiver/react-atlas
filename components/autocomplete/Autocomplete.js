/** Our Autocomplete component is a simple wrapper around react-autosuggest.
 * Copyright © 2016 Misha Moroshko
 * Read https://github.com/moroshko/react-autosuggest for documentation
 */

import React from 'react';
import Autosuggest from 'react-autosuggest';
import style from './autocomplete.css';

const Autocomplete = ({theme, ...props}) => {
	const styles = {...style, ...theme};
	return <Autosuggest {...props} theme={styles} />
};

export default Autocomplete;