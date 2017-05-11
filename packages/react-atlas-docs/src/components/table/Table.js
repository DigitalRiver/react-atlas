import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Table extends React.Component {
  constructor(props){
    super(props);
  }
	
  render() {
    let {children, ...props} = this.props;
    
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };
    return (
      <Atlas.Table {...props} >
        {children}
      </Atlas.Table>
    )
  }
}

Table.propTypes = {
  /**
   * use TableHeader to specify your data field and header
   * @example <TableHeader dataField='name' dataSort={ true }>Product Name</TableHeader>
   */
  children: PropTypes.node,
  /**
   * data array of objects for data row, key should may with dataField attribute of TableHeader
   * @example [{id: 1, name: 'Item name 1' + id, price: 2100}, {id: 2, name: 'Item name 2' + id, price: 2200}]
   */
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * pagination or not
   * @example <Table pagination>
   */
  pagination: PropTypes.bool,
  /**
   * set options
   * @example <Table options>
   */
  options: PropTypes.shape({
    /**
     * set sort name, mapped to data key
     * @example 'name'
     */
    defaultSortName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    /**
     * set sort order
     * @example 'desc'
     */
    defaultSortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }),
  /**
   * define a custom css class name
   * @example "custom-table"
   */
  className: PropTypes.string
};