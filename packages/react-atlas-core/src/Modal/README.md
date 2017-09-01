Basic Modal:

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
            <div>This is Modal example<br/>Any child components could be put here.</div>
            <Switch medium/>
            <Button raised primary onClick={handleToggle} >Close!</Button>
        </Modal>
	</div>