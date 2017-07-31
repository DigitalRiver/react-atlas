import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import { TableColumn } from "light-table/src";

class TableHeader extends React.PureComponent {
  render() {
    const { className, children, dataSort, isKey, searchable } = this.props;
    return (
      <TableColumn dataSort={dataSort} isKey={isKey} searchable={searchable} className={cx(className)} tableHeaderClass={"row-hover"}>
        {children}
      </TableColumn>
    );
  }
}

TableHeader.propTypes = {
  dataField: PropTypes.string,
  isKey: PropTypes.bool,
  dataSort: PropTypes.bool,
  searchable: PropTypes.bool
};

TableHeader.defaultProps = {
  isKey: false,
  dataSort: false,
  searchable: true
};

export default TableHeader;
