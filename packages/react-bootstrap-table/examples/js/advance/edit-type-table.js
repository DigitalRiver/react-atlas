/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const jobs = [];
// editable, select type also accept a string array
// it's most simple case for using select, but the text and value will all be the value in array
// const jobTypes = [ 'A', 'B', 'C', 'D' ];
//
// Following case will be more easy to control the text and value in select.
const jobTypes = [ {
  value: 'A',
  text: 'TYPE_A'
}, {
  value: 'B',
  text: 'TYPE_B'
}, {
  value: 'C',
  text: 'TYPE_C'
}, {
  value: 'D',
  text: 'TYPE_D'
} ];
// For above example, you can also use textKey and valueKey to change the hard code key for 'text' and 'value'
// for example, editable={ { type: 'select', options: { values: jobTypes, textKey: 'customTextKey , valueKey: 'customValueKey'} } }

function addJobs(quantity) {
  const startId = jobs.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    jobs.push({
      id: id,
      name: 'Item name ' + id,
      type: 'B',
      active: i % 2 === 0 ? 'Y' : 'N',
      datetime: '200' + i + '-12-28T14:57:00'
    });
  }
}

addJobs(5);

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

export default class EditTypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.formatType = this.formatType.bind(this);
  }

  formatType(cell) {
    return `TYPE_${cell}`;
  }

  render() {
    return (
      <BootstrapTable data={ jobs } cellEdit={ cellEditProp }>
        <TableHeaderColumn dataField='id' isKey={ true }>Job ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' editable={ { type: 'textarea' } }>Job Name</TableHeaderColumn>
        <TableHeaderColumn dataField='type' dataFormat={ this.formatType } editable={ { type: 'select', options: { values: jobTypes } } }>Job Type</TableHeaderColumn>
        <TableHeaderColumn dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeaderColumn>
        <TableHeaderColumn dataField='datetime' editable={ { type: 'datetime' } }>Date Time</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
