import React, { Component, PropTypes } from "react";
import cx from "classNames";
import { TableHeaderColumn as BTableHeader } from "react-bootstrap-table";

class TableHeader extends Component {
  render() {
    const { className, children, ...props } = this.props;
    return (
      <BTableHeader {...props} className={cx(className)}>
        {children}
      </BTableHeader>
    );
  }
}

TableHeader.propTypes = {
  dataField: PropTypes.string,
  isKey: PropTypes.bool,
  dataSort: PropTypes.bool
};

TableHeader.defaultProps = {
  isKey: false,
  dataSort: false
};

export default TableHeader;
