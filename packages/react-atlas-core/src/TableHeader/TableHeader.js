import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { TableColumn } from "light-table/src";

class TableHeader extends React.PureComponent {
  render() {
    const {
      className,
      children,
      dataSort,
      isKey,
      searchable,
      style
    } = this.props;
    return (
      <TableColumn
        style={style}
        dataSort={dataSort}
        isKey={isKey}
        searchable={searchable}
        className={cx(className)}
        tableHeaderClass={"row-hover"}
      >
        {children}
      </TableColumn>
    );
  }
}

TableHeader.propTypes = {
  "dataField": PropTypes.string,
  "isKey": PropTypes.bool,
  "dataSort": PropTypes.bool,
  "searchable": PropTypes.bool,
  /* Pass inline styles here. */
  "style": PropTypes.node,
  /** An Object, array, or string of CSS classes to apply to TableHeader.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};

TableHeader.defaultProps = {
  "isKey": false,
  "dataSort": false,
  "searchable": true
};

export default TableHeader;
