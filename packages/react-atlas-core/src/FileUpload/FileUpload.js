import React from "react";
import PropTypes from "prop-types";
import Dropzone from 'react-dropzone';
import cx from "classnames";

class FileUpload extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onDropHandler = (files) => {
    if(typeof this.props.onChange !== 'undefined') {
      this.props.onChange(files);
    }
  }

  render() {
    const {
      className,
      text,
      accept,
      style
    } = this.props;

    return (
      <Dropzone
        style={style}
        className={cx(className)}
        accept={accept}
        onDrop={this.onDropHandler}>
        {text}
      </Dropzone>
    );
  }
}

FileUpload.propTypes = {
  /** An Object, array, or string of CSS classes to apply to form.*/
  "className": PropTypes.node,

  /* The text to be displayed on the fileupload component. */
  "text": PropTypes.string,

  "onChange": PropTypes.func,

  "accept": PropTypes.string,

  "style": PropTypes.string

}


export default FileUpload;
