Basic Nav component:
    <Nav activeIndex={0}>
        <NavItem navKey={0}>Home</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <NavItem navKey={3}>Administration</NavItem>
        <NavItem navKey={4}>Support</NavItem>
    </Nav>

Nav with sub-NavItems:
    <Nav activeIndex={0}>
        <NavItem navKey={0}>Home</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav>
            <NavItem navKey={3}>Reports</NavItem>
            <NavItem navKey={3.1}>Create a Report</NavItem>
            <NavItem navKey={3.2}>Edit a Report</NavItem>
            <NavItem navKey={3.3}>Delete a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Administration</NavItem>
        <NavItem navKey={5}>Support</NavItem>
    </Nav>

Nav with collapsed NavItems:
    <Nav activeIndex={1}>
        <NavItem navKey={0}>Home</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav collapsed>
            <NavItem navKey={3}>Reports</NavItem>
            <NavItem navKey={3.1}>Create a Report</NavItem>
            <NavItem navKey={3.2}>Edit a Report</NavItem>
            <NavItem navKey={3.3}>Delete a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Administration</NavItem>
        <NavItem navKey={5}>Support</NavItem>
    </Nav>

Nav with disabled NavItem:
    <Nav activeIndex={0}>
            <NavItem navKey={0}>Home</NavItem>
            <NavItem navKey={1}>Catalog</NavItem>
            <NavItem navKey={2} disabled>Customer Service</NavItem>
            <Nav>
                <NavItem navKey={3}>Reports</NavItem>
                <NavItem navKey={3.1} disabled>Create a Report</NavItem>
            </Nav>
            <NavItem navKey={4}>Administration</NavItem>
            <NavItem navKey={5} disabled>Support</NavItem>
        </Nav>

Specify Nav container's width:
    <Nav activeIndex={1} style={{width:"500px"}}>
        <NavItem navKey={0}>Home</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav collapsed>
            <NavItem navKey={3}>Reports</NavItem>
            <NavItem navKey={3.1}>Create a Report</NavItem>
            <NavItem navKey={3.2}>Edit a Report</NavItem>
            <NavItem navKey={3.3}>Delete a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Administration</NavItem>
        <NavItem navKey={5}>Support</NavItem>
    </Nav>

Nav component onClick callback:

    _handleClick = (selectedIndex) => console.log('Item ' + selectedIndex + ' has been selected.');

    <Nav activeIndex={1} onClick={_handleClick}>
            <NavItem navKey={0}>Home</NavItem>
            <NavItem navKey={1}>Catalog</NavItem>
            <NavItem navKey={2}>Customer Service</NavItem>
            <Nav collapsed>
                <NavItem navKey={3}>Reports</NavItem>
                <NavItem navKey={3.1}>Create a Report</NavItem>
                <NavItem navKey={3.2}>Edit a Report</NavItem>
                <NavItem navKey={3.3}>Delete a Report</NavItem>
            </Nav>
            <NavItem navKey={4}>Administration</NavItem>
            <NavItem navKey={5}>Support</NavItem>
        </Nav>

Build Nav Menu via data attribute:

    const data = [
       {
         "navKey": 0,
         "title": "Home"
       },
       {
         "navKey": 1,
         "title": "Catalog"
       },
       {
         "navKey": 2,
         "title": "Customer Service"
       },
       {
         "navKey": 3,
         "title": "Reports",
         "collapsed": true,
         "subNav": [
           {
             "navKey": 3.1,
             "title": "Create a Report"
           },
           {
             "navKey": 3.2,
             "title": "Remove Report"
           }
         ]
       },
       {
         "navKey": 4,
         "title": "Administration"
       }
     ];

    _handleClick = (selectedIndex) => console.log('Item ' + selectedIndex + ' has been selected.');
    <Nav activeIndex={1} data={data} onClick={_handleClick} />

Nav component with a routing library. Use the `as` property to define the component name (e.g. `Link` from react-router) and pass any router specific props to your NavItem component:
    
    <HashRouter hashType="noslash">
        <Nav activeIndex={0}>
            <Nav>
                <NavItem navKey={0}>Form Components</NavItem>
                <NavItem as={NavLink} to="button" navKey={0.1}>Button</NavItem>
                <NavItem as={NavLink} to="checkbox" navKey={0.2}>Checkbox</NavItem>
                <NavItem as={NavLink} to="dropdown" navKey={0.3}>Dropdown</NavItem>
                <NavItem as={NavLink} to="radio" navKey={0.4}>Radio</NavItem>
                <NavItem as={NavLink} to="switch" navKey={0.5}>Switch</NavItem>
                <NavItem as={NavLink} to="textarea" navKey={0.6}>TextArea</NavItem>
                <NavItem as={NavLink} to="textfield" navKey={0.7}>TextField</NavItem>
            </Nav>
        </Nav>
    </HashRouter>

Nav component with React-Router using data instead of children:

    const data = [
       {
         "navKey": 0,
         "title": "Form Components",
         "collapsed": true,
         "subNav": [
           {
             "navKey": 0.1,
             "to": "button",
             "title": "Button",
             "as": NavLink
           },
           {
             "navKey": 0.2,
             "to": "checkbox",
             "title": "Checkbox",
             "as": NavLink
           },
           {
             "navKey": 0.3,
             "to": "dropdown",
             "title": "Dropdown",
             "as": NavLink
           },
           {
             "navKey": 0.4,
             "to": "radio",
             "title": "Radio",
             "as": NavLink
           },
           {
             "navKey": 0.5,
             "to": "switch",
             "title": "Switch",
             "as": NavLink
           },
           {
             "navKey": 0.6,
             "to": "textarea",
             "title": "TextArea",
             "as": NavLink
           },
           {
             "navKey": 0.7,
             "to": "textfield",
             "title": "TextField",
             "as": NavLink
           }
         ]
       }
     ];

    <HashRouter hashType="noslash">
        <Nav activeIndex={0} data={data} />
    </HashRouter>
