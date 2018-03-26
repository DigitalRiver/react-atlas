###### Default List component:

    <List>
        <ListItem>
            <Button link>Littlefoot</Button>
        </ListItem>
        <ListItem>
            <Button link>Blue</Button>
        </ListItem>
        <ListItem>
            <Button link>Yoshi</Button>
        </ListItem>
        <ListItem>
            <Button link>Earl Sinclair</Button>
        </ListItem>
        <ListItem>
            <Button link>Barney</Button>
        </ListItem>
    </List>

###### List with a border:

    <List border>
        <ListItem>
            <Button link>Littlefoot</Button>
        </ListItem>
        <ListItem>
            <Button link>Blue</Button>
        </ListItem>
        <ListItem>
            <Button link>Yoshi</Button>
        </ListItem>
        <ListItem>
            <Button link>Earl Sinclair</Button>
        </ListItem>
        <ListItem>
            <Button link>Barney</Button>
        </ListItem>
    </List>

###### List with multiple children in each ListItem:

    <List border>
        <ListItem>
            <Avatar image="https://www.universalkids.com/preschool/sites/sprout/files/LBT_Avatar.png" />
            <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Littlefoot</Button>
            <Switch inline />
        </ListItem>
        <ListItem>
            <Avatar image="http://www.figures.com/wordpress/wp-content/gallery-bank/gallery-uploads/o_1b3qg9es31eed1d0i1ips5lh14kuv.jpg" />
            <Button link style={{verticalAlign: "top", marginTop: "5px"}}>Blue</Button>
            <Switch inline />
        </ListItem>
        <ListItem>
            <Avatar image="http://cdn.smosh.com/sites/default/files/styles/large/public/ftpuploads/bloguploads/pop-culture-dinosaurs-thumb_97.jpg?itok=J7-KeOZf" />
            <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Yoshi</Button>
            <Switch inline />
        </ListItem>
    </List>

###### List with Grouped ListItems:

    <List border>
        <ListGroup title="Dinosaurs For Kids">
            <ListItem>
                <Avatar image="https://www.universalkids.com/preschool/sites/sprout/files/LBT_Avatar.png" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Littlefoot</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="https://fthmb.tqn.com/ctEcdM2FiDGOUTn_0QVnYfBgr50=/768x0/filters:no_upscale()/barney-56a2563b5f9b58b7d0c92a8e.jpg" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}}>Barney</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="http://cdn.smosh.com/sites/default/files/styles/large/public/ftpuploads/bloguploads/pop-culture-dinosaurs-thumb_97.jpg?itok=J7-KeOZf" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Yoshi</Button>
                <Switch inline />
            </ListItem>
        </ListGroup>
        <ListGroup title="Dinosaurs For Adults" divider={false}>
            <ListItem>
                <Avatar image="http://www.figures.com/wordpress/wp-content/gallery-bank/gallery-uploads/o_1b3qg9es31eed1d0i1ips5lh14kuv.jpg" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}}>Blue</Button>
                <Switch inline />
            </ListItem>
            <ListItem>
                <Avatar image="https://vignette.wikia.nocookie.net/muppet/images/9/95/Dinosaurs-EarlSinclair.jpg/revision/latest?cb=20141129001953" />
                <Button link style={{verticalAlign: "top", marginTop: "5px"}} >Earl Sinclair</Button>
                <Switch inline />
            </ListItem>
        </ListGroup>
    </List>

###### ListItems using leftItem and rightItem properties instead of children:

    <List border style={{width: "300px"}}>
        <ListItem leftItem={<Avatar image="http://www.figures.com/wordpress/wp-content/gallery-bank/gallery-uploads/o_1b3qg9es31eed1d0i1ips5lh14kuv.jpg" />} rightItem={<Switch />}>
            <Button link>Blue</Button>
        </ListItem>
        <ListItem leftItem={<Avatar image="https://vignette.wikia.nocookie.net/muppet/images/9/95/Dinosaurs-EarlSinclair.jpg/revision/latest?cb=20141129001953" />} rightItem={<Switch />}>
            <Button link>Earl Sinclair</Button>
        </ListItem>
    </List>