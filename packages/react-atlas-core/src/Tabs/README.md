###### Basic Tabs:

    <Tabs>
        <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
            <Tab>Tab 5</Tab>
        </TabList>
        <TabPanel>
            <h2>Content 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet lorem sit amet finibus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.</p>
            <Button primary>OK!</Button>
        </TabPanel>
        <TabPanel>
            <h2>Content 2</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 3</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 4</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 5</h2>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>

###### Tabs with borders around TabPanels:

    <Tabs bordered>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
        </TabList>
        <TabPanel>
            <strong>Content 1</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet lorem sit amet finibus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.</p>
        </TabPanel>
        <TabPanel>
            <strong>Content 2</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet lorem sit amet finibus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada <a href="http://lipsum.com">fames ac turpis egestas</a> et siem.</p>
        </TabPanel>
    </Tabs>

###### Manually set selected Tab:

    <Tabs selectedIndex={1}>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
        </TabList>
        <TabPanel>
            <h2>Content 1</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 2</h2>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>

###### Disabled Tabs:

    <Tabs>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab disabled>Title 2</Tab>
            <Tab>Title 3</Tab>
        </TabList>
        <TabPanel>
            <h2>Content 1</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 2</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 3</h2>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>

###### Vertical Tabs:

    <Tabs vertical>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 3</Tab>
        </TabList>
        <TabPanel>
            <strong>Content 1</strong>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <strong>Content 2</strong>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <strong>Content 3</strong>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>

###### Tabs with icons (or only icons):

    <Tabs>
        <TabList>
            <Tab icon="fa fa-star">Tab w/icon</Tab>
            <Tab icon="fa fa-star-half-empty"/>
            <Tab icon="fa fa-star-o"/>
        </TabList>
        <TabPanel>
            <h2>Tab with icon</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Only-icon Tab</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Only-icon Tab</h2>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>

###### onSelect - execute function on Tab select:
    <Tabs onSelect={(i, evt) => console.log("React-Atlas Tabs: onSelect - index", i, "- event:", evt)}>
        <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
            <Tab>Title 3</Tab>
        </TabList>
        <TabPanel>
            <h2>Content 1</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 2</h2>
            <p>Tab content here</p>
        </TabPanel>
        <TabPanel>
            <h2>Content 3</h2>
            <p>Tab content here</p>
        </TabPanel>
    </Tabs>