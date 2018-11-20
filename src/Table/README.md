
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

	<Table pagination={true} data={[{id: 0, name: "Bear", price: "$100"}, {id: 1, name: "Corn", price: "$2"}, {id: 2, name: "Shark Banana", price: "$125"}, {id: 3, name: "Phone", price: "$35"}, {id: 4, name: "Toaster", price: "$4"}, {id: 5, name: "Wrench", price: "$62"}, {id: 6, name: "Rake", price: "$127"}, {id: 7, name: "Car", price: "$1520"}, {id: 8, name: "Fan", price: "$62"}, {id: 9, name: "Comb", price: "$3"}, {id: 10, name: "Keyboard", price: "$19"}, {id: 11, name: "Headphones", price: "$25"}]}>
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

###### Click to Edit Cell
    const jobTypes = [ 'A', 'B', 'C', 'D' ];
    const cellEditProp = {
      mode: 'click',
      blurToSave: true
    };

    <Table data={[{id: 0, name: "Bear", type: "A", active: "Y", datetime:"2018/01/02"}, {id: 1, name: "Bear", type: "C", active: "Y", datetime:"2018/01/03"}, {id: 2, name: "Bear", type: "D", active: "N", datetime:"2018/03/05"}, {id: 3, name: "Bear", type: "B", active: "N", datetime:"2018/06/15"}, {id: 4, name: "Bear", type: "E", active: "Y", datetime:"2018/12/06"}]} cellEdit={ cellEditProp }>
    <TableHeader width='70' dataField='id' isKey={ true }>Job ID</TableHeader>
    <TableHeader width='250' dataField='name' editable={ { type: 'input' } }>Job Name</TableHeader>
    <TableHeader width='150' dataField='type' editable={ { type: 'select', options: { values: jobTypes } } }>Job Type</TableHeader>
    <TableHeader width='150' dataField='active' editable={ { type: 'checkbox', options: { values: 'Y:N' } } }>Active</TableHeader>
    <TableHeader width='150' dataField='datetime' editable={ { type: 'datetime' } }>Date Time</TableHeader>
    </Table>
    
##### Default Sorting
    
    <Table data={[{id: 0, name: "Bear", type: "A", active: "Y", datetime:"2018/01/02"}, {id: 1, name: "Corn", type: "C", active: "Y", datetime:"2018/01/03"}, {id: 2, name: "Shark Banana", type: "D", active: "N", datetime:"2018/03/05"}, {id: 3, name: "Bear", type: "B", active: "N", datetime:"2018/06/15"}, {id: 4, name: "Corn", type: "E", active: "Y", datetime:"2018/12/06"}]}>
    <TableHeader width='70' dataField='id' isKey={ true } dataSort>Job ID</TableHeader>
    <TableHeader width='250' dataField='name' dataSort>Job Name</TableHeader>
    <TableHeader width='150' dataField='type' dataSort>Job Type</TableHeader>
    <TableHeader width='150' dataField='active' dataSort>Active</TableHeader>
    <TableHeader width='150' dataField='datetime' dataSort>Date Time</TableHeader>
    </Table>
    
##### Custom Sorting Function
    
    function getYear(a) {
        return parseInt(a.duration.substring(13, 17)) - parseInt(a.duration.substring(0, 4));
    }
    
    function getMonth(a) {
        return parseInt(a.duration.substring(18, 20)) - parseInt(a.duration.substring(5, 7));
    }
    
    function getDate(a) {
        return parseInt(a.duration.substring(21, 23)) - parseInt(a.duration.substring(8, 10));
    }
    
    function helper(a, b) {
        if (getYear(a) > getYear(b)) {
            return 1;
        }
        else if (getYear(a) < getYear(b)) {
            return -1;
        }
        else {
            if (getMonth(a) > getMonth(b)) {
                return 1;
            } 
            else if (getMonth(a) < getMonth(b)) {
                return -1;
            } 
            else {
                if (getDate(a) > getDate(b)) {
                    return 1;
                }
                else if (getDate(a) < getDate(b)) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }
    }
    
    function customDurationSort(a, b, order) {
        if (order == 'desc') {
            return helper(a, b);
        } else {
            return helper(b, a);
        }
    }
                 
    <Table data={[{id: 0, duration: "2017/04/13 - 2018/08/09"}, {id: 1, duration: "1998/12/18 - 2005/06/01"}, {id: 2, duration: "1987/02/28 - 1993/03/08"}, {id: 3, duration: "2002/07/30 - 2014/05/17"}]}>
        <TableHeader width='70' dataField='id' isKey= { true }>Project ID</TableHeader>
        <TableHeader width='250' dataField='duration' dataSort sortFunc={customDurationSort}>Duration</TableHeader>
    </Table>

##### Custom Sorting with External Data
    const qualityType = {
        0: 'good',
        1: 'bad',
        2: 'unkown'
    };
    
    const inStockStatus = {
        1: 'yes',
        2: 'no'
    };
    
    const enumFormatter = (cell, row, enumObject) => { return enumObject[cell]; }
    
    <Table data={[{id: 0, name: "0", price: "1"}, {id: 1, name: "1", price: "2"}, {id: 2, name: "2", price: "1"}, {id: 3, name: "1", price: "1"}]}>
        <TableHeader dataField="id" isKey>Product ID</TableHeader>
        <TableHeader dataField="name" dataSort dataFormat={enumFormatter} formatExtraData={qualityType}>Product Quality</TableHeader>
        <TableHeader dataField="price" dataSort dataFormat={enumFormatter} formatExtraData={inStockStatus}>Out of stock</TableHeader>
    </Table>
    