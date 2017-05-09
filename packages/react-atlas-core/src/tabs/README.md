## Tabs Component

###### Description

Tabs are controlled by an **index** (represents the active tab element), and an **onClick** handler function that will run each time a tab is clicked. 

Each tab child can also have an **onActive** handler to run special code when activated. Tabs can also be individually disabled or hidden from the tab navigation.

Each <TabContent/> block will refer to a Tab child, in concrete order.

###### Tabs usage example

```
class TabsExample extends React.Component {
	state = { index: 0 };

	handleTabChange = (index) => {
		this.setState({index});
	};

	handleActive = () => {
		console.log("Special one activated");
	};
	
	render() {
		return (
			<Tabs index={this.state.index} onClick={index => this.handleTabChange(index)}>
				<Tab label="Tab 1"></Tab>
				<Tab label="Tab 2" onActive={this.handleActive}></Tab>
				<Tab label="Tab 3" disabled></Tab>
				<Tab label="Tab 4" hidden></Tab>
				<Tab label="Tab 5"></Tab>
				<TabContent>
			  		<h3>First Tab (Default)</h3>
			  		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</TabContent>
				<TabContent>
					<h3>Second Tab</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</TabContent>
				<TabContent>
					<h3>Disabled Tab</h3>
				</TabContent>
				<TabContent>
					<h3>Hidden Tab</h3>
				</TabContent>
				<TabContent>
					<h3>Last Tab</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</TabContent>
			</Tabs>
		);
	}
}
```