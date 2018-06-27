###### Default List component:

    <List>
        <ListItem>
            <Button link>Option 1</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 2</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 3</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 4</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 5</Button>
        </ListItem>
    </List>

###### List with a border:

    <List border>
        <ListItem>
            <Button link>Option 1</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 2</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 3</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 4</Button>
        </ListItem>
        <ListItem>
            <Button link>Option 5</Button>
        </ListItem>
    </List>

###### List with multiple children in each ListItem:

    <List border>
        <ListItem>
            <Button link style={{verticalAlign: "top"}} >Option 1</Button>
            <Switch inline />
        </ListItem>
        <ListItem>
            <Button link style={{verticalAlign: "top"}}>Option 2</Button>
            <Switch inline />
        </ListItem>
        <ListItem>
            <Button link style={{verticalAlign: "top"}} >Option 3</Button>
            <Switch inline />
        </ListItem>
    </List>

###### List with Grouped ListItems:

    <List border>
        <ListGroup title="Vegetarian Pizza Toppings">
            <ListItem>
                <Avatar image="http://cdn.pizzapizza.ca/o33/static/PPLNEWWEB/PRODLX/Marketing/wpf/wp-content/files_mf/romatomato.jpg" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Tomato</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="https://www.kumandgo.com/content/uploads/kg-ingredients-greenpeppers.png" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}}>Green Pepper</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="https://media1.popsugar-assets.com/files/thumbor/5EBZY1xS2iXmyTCVT3FuIYnlZAs/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2010/10/42/3/192/1922729/0d7eeafad9a602d0_onions/i/Oh-My-Onions.jpg" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Onion</Button>
                <Switch inline />
            </ListItem>
        </ListGroup>
        <ListGroup title="Meat pizza toppings" divider={false}>
            <ListItem>
                <Avatar image="https://www.kumandgo.com/content/uploads/kg-ingredients-sausage.png" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}}>Sausage</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="http://static1.squarespace.com/static/5693ecf7c647adfb1e239c1c/590a1f9286e6c07b8dfa10c9/590b99ec5016e1ca29d8a41b/1494004313118/?format=1000w" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Pepperoni</Button>
                <Switch inline />
            </ListItem>
        </ListGroup>
    </List>

###### ListItems using leftItem and rightItem properties instead of children:

    <List border style={{width: "300px"}}>
        <ListItem leftItem={<Avatar image="https://www.kumandgo.com/content/uploads/kg-ingredients-sausage.png" />} rightItem={<Switch />}>
            <Button link>Sausage</Button>
        </ListItem>
        <ListItem leftItem={<Avatar image="http://static1.squarespace.com/static/5693ecf7c647adfb1e239c1c/590a1f9286e6c07b8dfa10c9/590b99ec5016e1ca29d8a41b/1494004313118/?format=1000w" />} rightItem={<Switch />}>
            <Button link>Pepperoni</Button>
        </ListItem>
    </List>