import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { BootstrapTable } from "react-bootstrap-table";

class Table extends React.PureComponent {
  render() {
    const {
      className,
      children,
      data,
      options,
      maxHeight,
      search,
      pagination,
      style,
      ...props
    } = this.props;

    return (
      <BootstrapTable
        style={style}
        {...props}
        search={search}
        data={data}
        options={options}
        pagination={pagination}
        maxHeight={maxHeight}
        className={cx(className)}
        containerClass={"ra_Table__react-bs-table-container"}
        tableContainerClass={"ra_Table__react-bs-table"}
        headerContainerClass={"ra_Table__react-bs-container-header"}
        bodyContainerClass={"ra_Table__react-bs-container-body"}
      >
        {children}
      </BootstrapTable>
    );
  }
}

Table.propTypes = {
  "search": PropTypes.bool,
  "children": PropTypes.any,
  "data": PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  "pagination": PropTypes.bool,
  "options": PropTypes.shape({
    "defaultSortName": PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    "defaultSortOrder": PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }),
  /** An Object, array, or string of CSS classes to apply to Table.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  "maxHeight": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object
};

Table.defaultProps = {
  "pagination": false,
  "options": {
    "defaultSortName": "",
    "defaultSortOrder": ""
  }
};

export default Table;
