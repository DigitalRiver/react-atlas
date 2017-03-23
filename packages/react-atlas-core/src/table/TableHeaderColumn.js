import React, { PropTypes } from "react";
import { TableHeaderColumn as BTableHeaderColumn } from "react-bootstrap-table";

const TableHeaderColumn = ({ children, ...props }) => {
    return (
        <BTableHeaderColumn {...props}>
            {children}
        </BTableHeaderColumn>
    )
};
TableHeaderColumn.propTypes = {
    dataField: PropTypes.string,
    isKey: PropTypes.bool,
    dataSort: PropTypes.bool
};

TableHeaderColumn.defaultProps = {
    isKey: false,
    dataSort: false
};

TableHeaderColumn.styleguide = {
    "category": "Form Components",
    "index": "3.11",
    "wrappedExample": true,
    "example":
        `
// internal component methods {
var TableHeaderColumnExample = React.createClass({
  render() {
      return (
      <div></div>
      );
    }
// Mount component {
})
ReactDOM.render(<TableHeaderColumnExample />, mountNode);
// }
`
    
};

export default TableHeaderColumn;