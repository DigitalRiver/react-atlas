import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./fileupload.css";

export class FileUpload extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onDropHandler = files => {
    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(files);
    }
  };

  render() {
    const { className, text, accept, style, inputRef } = this.props;
    let textClass = cx({
      "text": true
    });
    return (
      <Dropzone
        style={style}
        className={cx(className)}
        accept={accept}
        onDrop={this.onDropHandler}
        ref={inputRef}
      >
        <div styleName={textClass}>{text}</div>
      </Dropzone>
    );
  }
}

FileUpload.propTypes = {
  /**
   * The MIME type of files that are accepted. */
  "accept": PropTypes.string,

  /** An object, array, or string of CSS classes to apply to FileUpload.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /** Function that will be called when a file is uploaded.
   * Returns an array of uploaded files. */
  "onChange": PropTypes.func,

  /**
   * Text that will be displayed on the FileUpload component.
   */
  "text": PropTypes.string,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Ref for Dropzone element
   */
  "inputRef": PropTypes.func
};

export default CSSModules(FileUpload, styles, { "allowMultiple": true });
