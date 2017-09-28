import React from "react";
import PropTypes from 'prop-types';
import cx from "classnames";
import { LightTable } from "light-table/src";

class Table extends React.PureComponent {
  render() {
    const { className, children, data, options, maxHeight, search, pagination, style, sort, ...props } = this.props;

    return (
        <LightTable
          style={style}
          {...props}
          search={search}
          data={data}
          options={options}
          pagination={pagination}
          maxHeight={maxHeight}
          className={cx(className)}
          containerClass={"ra_table__react-bs-table-container"}
          tableContainerClass={"ra_table__react-bs-table"}
          headerContainerClass={"ra_table__react-bs-container-header"}
          bodyContainerClass={"ra_table__react-bs-container-body"}>
          {children}
        </LightTable>
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
  "className": PropTypes.string,
  "maxHeight": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  "style": PropTypes.node
};

Table.defaultProps = {
  "pagination": false,
  "options": {
    "defaultSortName": "",
    "defaultSortOrder": ""
  }
};

export default Table;
