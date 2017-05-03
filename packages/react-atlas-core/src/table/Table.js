import React, { PropTypes } from "react";
import cx from "classNames";
import { BootstrapTable } from "react-bootstrap-table";

class Table extends React.PureComponent {
  render() {
    const { className, children, styles, ...props } = this.props;

    return (
      <BootstrapTable
        {...props}
        className={cx(className)}
        containerClass={styles["react-bs-table-container"]}
        tableContainerClass={styles["react-bs-table"]}
        headerContainerClass={styles["react-bs-container-header"]}
        bodyContainerClass={styles["react-bs-container-body"]}
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
  "pagination": true,
  "options": {
    "defaultSortName": "",
    "defaultSortOrder": ""
  }
};

export default Table;
