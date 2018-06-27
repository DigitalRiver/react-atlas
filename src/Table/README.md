
###### Basic Table:

	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Search Table:

	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]} search={true}>
      <TableHeader dataField='id' searchable={true} isKey={true}>Product ID</TableHeader>
      <TableHeader dataField='name' searchable={true}>Product Name</TableHeader>
      <TableHeader dataField='price' searchable={true}>Product Price</TableHeader>
    </Table>

###### Pagination Table:

	<Table pagination={true} data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Custom Text for Empty Data:

	<Table  options={ { noDataText: 'This is custom text for empty data' } }>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Scroll Table
	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]} height='120' scrollTop={ 'Bottom' }>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Column Format with Extra Data
    const qualityType = {
      0: 'good',
      1: 'bad',
      2: 'unknown'
    };
    const inStockStatus = {
      1: 'yes',
      2: 'no'
    };

    function enumFormatter(cell, row, enumObject) {
      return enumObject[cell];
    }
    <Table data={[{id: 0, name: "0", price: "1"}, {id: 1, name: "1", price: "2"}, {id: 2, name: "2", price: "1"}, , {id: 3, name: "1", price: "1"}]} >
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name' dataFormat={ enumFormatter } formatExtraData={ qualityType }>Product Quality</TableHeader>
      <TableHeader dataField='price' dataFormat={ enumFormatter } formatExtraData={ inStockStatus }>Out of stock</TableHeader>
    </Table>

###### Column Format with React
    class ActiveFormatter extends React.Component {
      render() {
        return (
          <input type='checkbox' checked={ this.props.active }/>
        );
      }
    }

    function activeFormatter(cell, row) {
      return (
        <ActiveFormatter active={ cell } />
      );
    }

	<Table data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: ""}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price' dataFormat={ activeFormatter }>Active</TableHeader>
    </Table>

###### Single Selection
    const selectRowProp = {
      mode: 'radio'
    };

	<Table selectRow={ selectRowProp } data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Multi Selection
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true
    };

	<Table selectRow={ selectRowProp } data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}]}>
      <TableHeader dataField='id' isKey={ true }>Product ID</TableHeader>
      <TableHeader dataField='name'>Product Name</TableHeader>
      <TableHeader dataField='price'>Product Price</TableHeader>
    </Table>

###### Cell Editing Type
    const jobTypes = [ 'A', 'B', 'C', 'D' ];
    const cellEditProp = {
      mode: 'click',
      blurToSave: true
    };

    <Table data={[{id: 0, name: "Bear", type: "A", active: "Y", datetime:"2018/01/02"}, {id: 1, name: "Bear", type: "C", active: "Y", datetime:"2018/01/03"}, {id: 2, name: "Bear", type: "D", active: "N", datetime:"2018/03/05"}, {id: 3, name: "Bear", type: "B", active: "N", datetime:"2018/06/15"}, {id: 4, name: "Bear", type: "E", active: "Y", datetime:"2018/12/06"}]} cellEdit={ cellEditProp }>
    <TableHeader width='50'  dataField='id' isKey={ true }>Job ID</TableHeader>
    <TableHeader width='250' dataField='name' editable={ { type: 'input' } }>Job Name</TableHeader>
    <TableHeader width='150' dataField='type' editable={ { type: 'select', options: { values: jobTypes } } }>Job Type</TableHeader>
    <TableHeader width='150' dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeader>
    <TableHeader width='150' dataField='datetime' editable={ { type: 'datetime' } }>Date Time</TableHeader>
    </Table>