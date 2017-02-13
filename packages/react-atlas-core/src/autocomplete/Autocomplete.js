/** Our Autocomplete component is a simple wrapper around react-autosuggest.
 * Copyright � 2016 Misha Moroshko
 * Read https://github.com/moroshko/react-autosuggest for documentation
 */

import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import style from './autocomplete.css';

/**
 * Auto Complete component is a very simple wrapper around the [React-Autosuggest](https://github.com/moroshko/react-autosuggest) component.
 * Read there for more comprehensive documentation.
 */
const Autocomplete = ({theme, ...props}) => {
	const styles = {...style, ...theme};
	return <Autosuggest {...props} theme={styles} />
};

Autocomplete.propTypes = {
  /**
   * For a plain list of suggestions, every item in suggestions should be a single suggestion.
   * It's up to you what shape every suggestion takes.
   * @examples const suggestions = [
   *   {
   *     text: 'Apple'
   *   },
   *   {
   *     text: 'Banana'
   *   },
   *   {
   *     text: 'Cherry'
   *   },
   *   {
   *     text: 'Grapefruit'
   *   },
   *   {
   *     text: 'Lemon'
   *   }
   * ];
   */
    suggestions: PropTypes.array.isRequired,
	/**
   * Normally, you would want to update suggestions as user types.
   * You might also want to update suggestions when user selects a suggestion or the input loses focus (so that, next time the input gets focus, suggestions will be up to date).
   */
    onSuggestionsUpdateRequested: PropTypes.func,
	/**
   * When user navigates the suggestions using the Up and Down keys, the input should display the highlighted suggestion.
   * You design how suggestion is modelled. Therefore, it's your responsibility to tell Autosuggest how to map suggestions to input values.
   *
   * This function gets:
   *
   * suggestion - The suggestion in question
   * It should return a string.:
   *
   * @examples function getSuggestionValue(suggestion) {
   * return suggestion.text;
   * }
   */
    getSuggestionValue: PropTypes.func.isRequired,
	/**
   *
   *
   * Use your imagination to define how suggestions are rendered.
   * `renderSuggestion` has the following signature:
   *
   * function renderSuggestion(suggestion, { value, valueBeforeUpDown })
   * where:
   *
   * suggestion - The suggestion to render
   * value - The current value of the input
   * valueBeforeUpDown - The value of the input prior to Up/Down interactions.
   * If user didn't interact with Up/Down yet, it will be null.
   * It is useful if you want to highlight input's value in the suggestion (a.k.a the match), for example.
   * It should return a ReactElement.
   *
   * @examples function renderSuggestion(suggestion) {
   *  return (
   *    <span>{suggestion.text}</span>
   *  );
   * }
   */
  renderSuggestion: PropTypes.func.isRequired,
	/**
   * Autosuggest is a controlled component.
   * Therefore, you should pass at least a value and an onChange callback to the input field. You can pass additional props as well.
   *
   * @examples const inputProps = {
   *   value: inputValue,  // `inputValue` usually comes from application state
   *   onChange: onChange, // called when input value changes
   *   type: 'search',
   *   placeholder: 'Enter city or postcode'
   * };
   */
    inputProps: (props, propName) => {
      const inputProps = props[propName];

      if (!inputProps.hasOwnProperty('value')) {
        throw new Error("Value must be set inside inputProps");
      }

      if (!inputProps.hasOwnProperty('onChange')) {
        throw new Error('\'inputProps\' must have \'onChange\'.');
      }
    },
    shouldRenderSuggestions: PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    multiSection: PropTypes.bool,
    renderSectionTitle: PropTypes.func,
    getSectionSuggestions: PropTypes.func,
    focusInputOnSuggestionClick: PropTypes.bool,
    theme: PropTypes.object,
    id: PropTypes.string
};

Autocomplete.defaultProps = {
    onSuggestionsUpdateRequested: function () {},
    shouldRenderSuggestions: value => value.trim().length > 0,
    onSuggestionSelected: function () {},
    multiSection: false,
    renderSectionTitle() {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionSuggestions() {
      throw new Error('`getSectionSuggestions` must be provided');
    },
    focusInputOnSuggestionClick: true,
    id: '1',
		theme: {
			value: true
		}
};

Autocomplete.styleguide = {
  category: 'Form Components',
  index: '3.1',
  wrappedExample: true,
  example: `
// languages {
var languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  }
];
// }
// internal component methods {
var AutoCompleteExample = React.createClass({

  getInitialState: function() {
    return ({
      value: '',
      suggestions: this.getSuggestions('')
    });
  },

  escapeRegexCharacters: function(str) {
    return str.replace(/[.*+?^{}()|[\]\\]/g, "\\$&");
  },

  getSuggestions: function (value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
  },

  getSuggestionValue: function(suggestion) {
    return suggestion.name;
  },

  renderSuggestion: function(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  },

  onChange: function(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  },

  onSuggestionsUpdateRequested: function({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  },
// }
  render() {
    var inputProps = {
      placeholder: "Type 'c'",
      value: this.state.value,
      onChange: this.onChange
    };
      return (
      <section>
        <h5>Autocomplete</h5>
        <p>You can have a multiple or simple autocomplete.</p>

        <Autocomplete suggestions={this.state.suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps} />

      </section>
      );
    }
// Mount component {
})

ReactDOM.render(<AutoCompleteExample />, mountNode);
// }
`
};

export default Autocomplete;
