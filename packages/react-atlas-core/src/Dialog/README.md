INFO Dialog:

    initialState = {active: false}
    handleToggle = () => {
        setState({ active: !state.active })
    };
    handleOk = () => {
        setState({ active: !state.active })
    };
    <div> 
        <Button primary onClick={handleToggle}>Open Info Dialog</Button>
        <Dialog 
            active={state.active} 
            onOk={handleOk} 
            title="INFO"
            overlay
            info
        >
            <div>This is Dialog example<br/>Any child components could be put here.</div>
        </Dialog>
	</div> 
	
CONFIRM Dialog:

    initialState = {active: false}
    handleToggle = () => {
        setState({ active: !state.active })
    };
    handleCancel = () => {
        alert('Cancel callback');
        setState({ active: !state.active })
    };
    handleOk = () => {
        alert('OK callback');
        setState({ active: !state.active })
    };
    <div> 
        <Button primary onClick={handleToggle}>Open Confirm Dialog</Button>
        <Dialog 
            active={state.active} 
            onOk={handleOk}
            onCancel={handleCancel} 
            title="CONFIRM"
            confirm
        >
            <div>This is Dialog example<br/>Any child components could be put here.</div>
        </Dialog>
    </div> 
    
WARNING Dialog:

    initialState = {active: false}
    handleToggle = () => {
        setState({ active: !state.active })
    };
    
    handleCancel = () => {
        setState({ active: !state.active })
    };
    
    handleOk = () => {
        setState({ active: !state.active })
    };
    <div> 
        <Button warning onClick={handleToggle}>Open Warning Dialog</Button>
        <Dialog 
            active={state.active} 
            onOk={handleOk}
            onCancel={handleCancel} 
            title="WARNING"
            warning
        >
            <div>This is Dialog example<br/>Any child components could be put here.</div>
        </Dialog>
    </div> 