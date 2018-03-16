Alert:
    <Alert>
        This is a default Alert!
    </Alert>

Alert types:

	<div>

		<Alert type="success">
	        <strong>Success!</strong> This alert box indicates a successful or positive action.
	    </Alert>
	    <br />

	    <Alert type="info">
	        <strong>Info!</strong> This alert box indicates a neutral informative change or action.
	    </Alert>
	    <br />

	    <Alert type="warning">
	        <strong>Warning!</strong> This alert box indicates a warning that might need attention.
	    </Alert>
	    <br />

	    <Alert type="danger">
	        <strong>Danger!</strong> This alert box indicates a dangerous or potentially negative action.
	    </Alert>
	</div>

Dismissible Alerts:

	<div>	
		<Alert type="success" dismissible>
	        <strong>Success!</strong> This alert box indicates a successful or positive action.
	    </Alert>
	    <br />

	    <Alert type="info" dismissible>
	        <strong>Info!</strong> This alert box indicates a neutral informative change or action.
	    </Alert>
	    <br />

	    <Alert type="warning" dismissible>
	        <strong>Warning!</strong> This alert box indicates a warning that might need attention.
	    </Alert>
	    <br />

	    <Alert type="danger" dismissible>
	        <strong>Danger!</strong> This alert box indicates a dangerous or potentially negative action.
	    </Alert>
	</div>

onDismiss callback:

	<Alert dismissible onDismiss={function(){alert('The alert has been dismissed.');}}>
        <strong>Success!</strong> This alert box will trigger a callback function when dismissed.
    </Alert>