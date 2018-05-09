import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { TableHeaderColumn } from "react-bootstrap-table";

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
      <TableHeaderColumn
        style={style}
        dataSort={dataSort}
        isKey={isKey}
        searchable={searchable}
        className={cx(className)}
        tableHeaderClass={"row-hover"}
      >
        {children}
      </TableHeaderColumn>
    );
  }
}

TableHeader.propTypes = {
  "dataField": PropTypes.string,
  "isKey": PropTypes.bool,
  "dataSort": PropTypes.bool,
  "searchable": PropTypes.bool,
  /** Pass inline styling here. */
  "style": PropTypes.object,
  /** An Object, array, or string of CSS classes to apply to TableHeader.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  "children": PropTypes.any
};

TableHeader.defaultProps = {
  "isKey": false,
  "dataSort": false,
  "searchable": true
};

export default TableHeader;
