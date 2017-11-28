Switch component allows to define a particular-styled checkbox.

###### Default switch:
    initialState = {checked: true}
    _handleChange = () => {
        setState({checked: !state.checked})
    };
    
    <Switch onChange={_handleChange} checked={state.checked}/>

###### Different sized switches:
    initialState = {
        switch1: false,
        switch2: false,
        switch3: false
    }
    _handleChange = (e) => {
        setState({[`${e.target.name}`]: !state[e.target.name]})
    };
    <div>
      <Switch name="switch1" small onChange={_handleChange} checked={state.switch1}/>
      <Switch name="switch2" medium onChange={_handleChange} checked={state.switch2}/>
      <Switch name="switch3" large onChange={_handleChange} checked={state.switch3}/>
    </div>

###### Multiple switches tied to same behavior (name prop):
    initialState = {
        switch1: false,
        switch2: false,
        switch3: false
    }
    _handleChange = (e) => {
        setState({[`${e.target.id}`]: !state[e.target.id]})
    };
    <div>
      <Switch id="switch1" name="customFeature" onChange={_handleChange} checked={state.switch1}/>
      <Switch id="switch2" name="customFeature" onChange={_handleChange} checked={state.switch2}/>
      <Switch id="switch3" name="customFeature" onChange={_handleChange} checked={state.switch3}/>
    </div>

###### Set other colors for on/off states (hex, rgb, css-valid color name):

    initialState = {
        switch1: false,
        switch2: false
    }
    _handleChange = (e) => {
        setState({[`${e.target.name}`]: !state[e.target.name]})
    };
    <div>
      <Switch name="switch1" onColor="#00bbaa" offColor="#000000" onChange={_handleChange} checked={state.switch1}/>
      <Switch name="switch2" onColor="green" offColor="black" onChange={_handleChange} checked={state.switch2}/>
    </div>

###### Disabled or hidden switch:

    <div>
      <Switch disabled/>
      <Switch hidden/>
    </div>

###### Execute method when onChange event occurs:

    initialState = {
        switch1: false
    }
    customSwitchChange = () => {
    	console.info("onChange event!");
    }
    
    _handleChange = (e) => {
        setState({[`${e.target.name}`]: !state[e.target.name]})
        customSwitchChange();
    };
    
    <Switch name="switch1" onChange={_handleChange} checked={state.switch1}/>

###### Make checks before changing component's state (onbeforechange). It receives a value with current checked state:

    initialState = {
        switch1: false
    }
    _customSwitchBeforeChange = (e) => {
        let accept = confirm("Do you want to check this?");
        if(accept){
            setState({[`${e.target.name}`]: !state[e.target.name]})
        }
    };
    
    <Switch name="switch1" onBeforeChange={_customSwitchBeforeChange} checked={state.switch1}/>

This method should return true or false, allowing or not the onChange handler to be fired. If undefined, will prevent it.

###### Update switch props

    initialState = {checked: true}
    _handleChangeProps = () => {
      setState({ size: 'small' });
    };
    
    _handleChange = () => {
        setState({checked: !state.checked})
    };
    let switchComp = state.size === 'small'? 
        <Switch small onChange={_handleChange} checked={state.checked}/>:
        <Switch onChange={_handleChange} checked={state.checked}/>;
    <div>
        <Button primary onClick={_handleChangeProps}>Change Props</Button>
        {switchComp}
    </div>
