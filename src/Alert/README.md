Alert:
    
    <Alert>
        This is a default Alert!
    </Alert>

Alert with multiple inline text elements:
    
    <Alert>
        <Text>
        	<Text as="strong">Success!</Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat nisi non odio pretium imperdiet. Praesent eget quam egestas, mattis orci sit amet, faucibus ipsum. Aliquam viverra vulputate porttitor. Suspendisse potenti. Nullam sit amet massa non nulla rhoncus dictum in ac ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras suscipit luctus tellus, nec finibus justo dignissim ac. Aliquam iaculis libero turpis, quis imperdiet elit consequat eget. In hac habitasse platea dictumst. Aliquam volutpat, nisi eget tincidunt accumsan, eros magna tincidunt tellus, quis accumsan enim turpis sit amet ex. Morbi accumsan, felis sed ultricies molestie, massa odio tristique est, sed eleifend sapien massa in massa. Vestibulum gravida maximus varius. Vivamus a elit consectetur, ornare est in, gravida turpis.
        </Text>
    </Alert>

Alert with children:

	<Alert>
		<Avatar>
		    <Icon icon={"fa fa-github"}/>
		</Avatar>
		<a href="https://github.com/DigitalRiver/react-atlas" target="_blank">
			<Button link>React-Atlas on Git-Hub</Button>
		</a>
	</Alert>

Alert types:

	<div>

		<Alert type="success">
        	<Text as="strong">Success!</Text> This alert box indicates a successful or positive action.
	    </Alert>
	    <br />

	    <Alert type="info">
	        <Text as="strong">Info!</Text> This alert box indicates a neutral informative change or action.
	    </Alert>
	    <br />

	    <Alert type="warning">
	        <Text as="strong">Warning!</Text> This alert box indicates a warning that might need attention.
	    </Alert>
	    <br />

	    <Alert type="danger">
	        <Text as="strong">Danger!</Text> This alert box indicates a dangerous or potentially negative action.
	    </Alert>
	</div>

Dismissible Alerts:

	<div>	
		<Alert type="success" dismissible>
	        <Text as="strong">Success!</Text> This alert box indicates a successful or positive action.
	    </Alert>
	    <br />

	    <Alert type="info" dismissible>
	        <Text as="strong">Info!</Text> This alert box indicates a neutral informative change or action.
	    </Alert>
	    <br />

	    <Alert type="warning" dismissible>
	        <Text as="strong">Warning!</Text> This alert box indicates a warning that might need attention.
	    </Alert>
	    <br />

	    <Alert type="danger" dismissible>
	        <Text as="strong">Danger!</Text> This alert box indicates a dangerous or potentially negative action.
	    </Alert>
	</div>

onDismiss callback:

	<Alert dismissible onDismiss={function(){alert('The alert has been dismissed.');}}>
        <strong>Success!</strong> This alert box will trigger a callback function when dismissed.
    </Alert>