Update Dropdown props. just for example, need to remove afterwards:

    initialState = {value: 'bird', optionsValue: "bird"}
    handleChangeProps = () => {
      setState({ value: 'cow', optionsValue: "raymans" });
    };
    
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <div>
        <Button primary onClick={handleChangeProps}>Change Props</Button>
          <p>state's value:{state.value}, optionsValue: {state.optionsValue}</p>
      <Dropdown onChange={_handleChange} value={state.value}>
        <span value={state.optionsValue}>{state.optionsValue}</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

Basic Dropdown:

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <div>
      <Dropdown
        value={state.value} 
        onChange={_handleChange}>
            <span value="bird">Bird</span>
            <span value="cow">Cow</span>
            <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
            <span value="monkey">Monkey</span>
            <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

Dropdown with Label

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown 
      customLabel="Dropdown Example" 
      value={state.value} 
      onChange={_handleChange}>
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Default Select Value
    
    initialState = {value: ''}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown defaultText="Select One ..."
      value={state.value} 
      onChange={_handleChange}>
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Pre-Set Value

    initialState = {value: 'cow'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown
      value={state.value} 
      onChange={_handleChange}>
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdowns with Custom Widths:

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <div>
      <div>
        <Dropdown customLabel="Choose" width="300px"
          value={state.value} 
          onChange={_handleChange}>
          <span value="bird">Bird</span>
          <span value="cow" selected>Cow</span>
          <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
          <span value="monkey">Monkey</span>
          <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
        </Dropdown>
      </div>
      <br  />
      <div>
        <Dropdown customLabel="Choose" width="7rem">
          <span value="bird">Bird</span>
          <span value="cow" selected>Cow</span>
          <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
          <span value="monkey">Monkey</span>
          <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
        </Dropdown>
      </div>
    </div>

Disabled Dropdown:

    <Dropdown customLabel="Disabled Dropdown" disabled>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Inline Dropdowns:

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <div>
      <Dropdown customLabel="Dropdown One" name="dropdown1" inline
        value={state.value} 
        onChange={_handleChange}>
         <span value="bird">Bird</span>
         <span value="cow">Cow</span>
         <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
         <span value="monkey">Monkey</span>
         <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
      <Dropdown customLabel="Dropdown Two" name="dropdown2" inline>
         <span value="bird">Bird</span>
         <span value="cow">Cow</span>
         <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
         <span value="monkey">Monkey</span>
         <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

Dropdown with Required Property:
    
    initialState = {isValid: true}
    _validationCallback = (isValid) => {
      setState({ isValid });
    }
    
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    
    <Dropdown defaultText="Select One ..." customLabel="Required Dropdown" onChange={_handleChange} value={state.value} required validationCallback={_validationCallback} isValid={state.isValid} >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with custom validation and error message:

    initialState = {isValid: true}
    _validationCallback = (isValid) => {
      setState({ isValid }); 
    };
    
    _errorCallback = (event, value) => {
    	return {isValid: false , message: "Custom error message!"}
    }
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown 
      customLabel="Error Message Dropdown" 
      onChange={_handleChange} 
      value={state.value}
      errorCallback={_errorCallback} 
      validationCallback={_validationCallback} 
      isValid={state.isValid}>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Custom Function Before Change:

    initialState = {value: ""}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown customLabel="onBeforeChange Dropdown" onBeforeChange={ function(value){ let accept = confirm("Do you want to check this?"); return accept; } } value={state.value} onChange={_handleChange}  >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onClick function:

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown onClick={ function(value, event){ console.log("Click: ", event, value) }}
      value={state.value} 
      onChange={_handleChange}>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onChange function:

    initialState = {value: 'bird'}
    _handleChange = (value, event) => {
      console.log("onChange: ", value, event)
      setState({ value: value });
    };
    <Dropdown customLabel="onChange Dropdown"
      value={state.value} 
      onChange={_handleChange}>
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Update Dropdown options via state after initial render:

    initialState = {value: '', items: ["Dog", "Cat"]}
    rows = state.items.map((item, index) => (
      <li value={item} key={index}>
        {item}
      </li>
    ));
    handleToggle = () => {
        setState({  value: '', items: ["Cow", "Horse", "Pig"] })
    }; 
    _handleChange = (value, event) => {
      console.log("onChange: ", value, event)
      setState({ value: value });
    };
    
    <div> 
      <Dropdown defaultText="Select One ..." customLabel="Update State Dropdown" onChange={_handleChange} value={state.value}>
        {rows}
        </Dropdown><br />
        <Button primary onClick={handleToggle}>Update State</Button>
        <br /><br />
        List: {state.items.toString()}
    </div>
