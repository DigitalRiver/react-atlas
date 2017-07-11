import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import { TableHeaderColumn as BTableHeader } from "react-bootstrap-table";

class TableHeader extends React.PureComponent {
  render() {
    const { className, children } = this.props;
    return (
      <BTableHeader className={cx(className)} tableHeaderClass={"row-hover"}>
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
