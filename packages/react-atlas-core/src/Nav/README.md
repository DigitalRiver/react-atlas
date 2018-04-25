Basic Nav component:
    <Nav activeIndex={0}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <NavItem navKey={3}>Administration</NavItem>
        <NavItem navKey={4}>Support</NavItem>
    </Nav>

Nav with sub-NavItems:
    <Nav activeIndex={0}>
        <NavItem navKey={0}>HOME</NavItem>
        <NavItem navKey={1}>Catalog</NavItem>
        <NavItem navKey={2}>Customer Service</NavItem>
        <Nav>
            <NavItem navKey={3}>Reports</NavItem>
            <NavItem navKey={3.1}>Create a Report</NavItem>
        </Nav>
        <NavItem navKey={4}>Administration</NavItem>
        <Nav>
            <NavItem navKey={5}>Support</NavItem>
            <NavItem navKey={5.1}>Help</NavItem>
        </Nav>
    </Nav>

Nav with collapsed NavItems:
    <Nav activeIndex={1}>
        <NavItem navKey={0}>HOME</NavItem>
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
            <NavItem navKey={0}>HOME</NavItem>
            <NavItem navKey={1}>Catalog</NavItem>
            <NavItem navKey={2} disabled>Customer Service</NavItem>
            <Nav>
                <NavItem navKey={3}>Reports</NavItem>
                <NavItem navKey={3.1} disabled>Create a Report</NavItem>
            </Nav>
            <NavItem navKey={4}>Administration</NavItem>
            <Nav>
                <NavItem navKey={5} disabled>Support</NavItem>
                <NavItem navKey={5.1}>Help</NavItem>
            </Nav>
        </Nav>

Specify Nav container's width:
    <Nav activeIndex={1} style={{width:"500px"}}>
        <NavItem navKey={0}>HOME</NavItem>
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

    _handleClick = (selectedIndex) => console.log('Item: ' + selectedIndex + ' been selected.');

    <Nav activeIndex={1} onClick={_handleClick}>
            <NavItem navKey={0}>HOME</NavItem>
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