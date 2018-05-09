Modal with title, overlay, onOverlayClick, and onEscKeyDown:

    initialState = {active: false}
    handleToggle = () => {
        setState({ active: !state.active })
    };
    <div> 
        <Button primary onClick={handleToggle}>Open Modal</Button>
        <Modal 
            overlay
            active={state.active} 
            onOverlayClick={handleToggle} 
            onEscKeyDown={handleToggle}
            title="Modal Example Title"
        >
            <div style={{'marginBottom':'20px'}}>
                <Text>This is Modal example<br/>Any child components could be put here.</Text>
            </div>

            <Button raised primary onClick={handleToggle}>Close!</Button>
        </Modal>
	</div>