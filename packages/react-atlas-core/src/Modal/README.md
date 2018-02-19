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
            <p>This is a basic Modal example. Any child components could be put here.</p>
            <Button primary onClick={handleToggle} >Close!</Button>
        </Modal>
	</div>