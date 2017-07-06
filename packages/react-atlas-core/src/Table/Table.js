import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import { BootstrapTable } from "react-bootstrap-table";

class Table extends React.PureComponent {
  render() {
    const { className, children, ...props } = this.props;

    return (
      <BootstrapTable
        {...props}
        className={cx(className)}
        containerClass={"ra_table__react-bs-table-container"}
        tableContainerClass={"ra_table__react-bs-table"}
        headerContainerClass={"ra_table__react-bs-container-header"}
        bodyContainerClass={"ra_table__react-bs-container-body"}
      >
        {children}
      </BootstrapTable>
    );
  }
}

Table.propTypes = {
  "children": PropTypes.any,
  "data": PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  "pagination": PropTypes.bool,
  "options": PropTypes.shape({
    "defaultSortName": PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    "defaultSortOrder": PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }),
  "className": PropTypes.string
};

Table.defaultProps = {
  "pagination": false,
  "options": {
    "defaultSortName": "",
    "defaultSortOrder": ""
  }
};

export default Table;