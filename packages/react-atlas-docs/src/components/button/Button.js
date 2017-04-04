import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

console.log("Proptypes: ", Atlas.Button.p)
export default class Button extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Atlas.Button {...this.props}></Atlas.Button>
        )
    }
}
Button.propTypes = {
  /**
   * Define a mini button.
   *
   */
  "mini": PropTypes.bool,
  /**
   * Anything that can be in a button. Usually text, but could also be icons/glyphs.
   * @example 'Save', 'Cancel'
   */
  "children": PropTypes.node,
  /**
   * define a custom css class name
   * @example "btn", "btn-active"
   */
  "className": PropTypes.string,
  /**
   * define a custom css class name
   * @examples "btn", "btn-active"
   */
  "disabled": PropTypes.bool,
  /**
   * use outline styled button
   * @examples <Button outline>
   */
  "outline": PropTypes.bool,
  /**
   * define button href if anchor
   * @examples '#', 'http://some-website.com/'
   */
  "href": PropTypes.string,
  /**
   * set loading animation on button
   * @examples <Button loading>
   */
  "loading": PropTypes.bool,
  /**
   * use primary style button (button is set to this by default)
   * @examples <Button primary>
   */
  "primary": PropTypes.bool,
  "type": PropTypes.string,
  /**
   * use secondary style button
   * @examples <Button secondary>
   */
  "secondary": PropTypes.bool,
  /**
   * use success style button
   * @examples <Button success>
   */
  "success": PropTypes.bool,
  /**
   * use warning style button
   * @examples <Button warning>
   */
  "warning": PropTypes.bool,
  /**
   * use danger style button
   * @examples <Button danger>
   */
  "danger": PropTypes.bool,
  /**
   * use link style button
   * @examples <Button link>
   */
  "link": PropTypes.bool,
  /**
   * use large style button
   * @examples <Button large>
   */
  "large": PropTypes.bool,
  /**
   * use small style button
   * @examples <Button small>
   */
  "small": PropTypes.bool,
  /**
   * use block style button
   * @examples <Button block>
   */
  "block": PropTypes.bool
};