import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cx from "classnames";

class FileUpload extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onDropHandler = files => {
    if (typeof this.props.onChange !== "undefined") {
      this.props.onChange(files);
    }
  };

  render() {
    const { className, text, accept, style } = this.props;

    return (
      <Dropzone
        style={style}
        className={cx(className)}
        accept={accept}
        onDrop={this.onDropHandler}
      >
        {text}
      </Dropzone>
    );
  }
}

FileUpload.propTypes = {
  /** An Object, array, or string of CSS classes to apply to fileupload.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /* The text to be displayed on the fileupload component. */
  "text": PropTypes.string,

  /* Function that gets called when a file is uploaded.
   * Returns an array of uploaded files. */
  "onChange": PropTypes.func,

  /* The MIME type of files that are accepted. */
  "accept": PropTypes.string,

  /* Pass inline styling here. */
  "style": PropTypes.object
}

export default FileUpload;
