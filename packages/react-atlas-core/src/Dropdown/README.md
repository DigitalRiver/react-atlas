Update Dropdown props. just for example, need to remove afterwards:

    initialState = {value: 'bird', optionsValue: "bird"}
    handleChangeProps = () => {
      setState({ value: 'cow', optionsValue: "raymans" });
    };

    <div>
        <Button primary onClick={handleChangeProps}>Change Props</Button>
          <p>state's value:{state.value}, optionsValue: {state.optionsValue}</p>
      <Dropdown value={state.value}>
        <span value={state.optionsValue}>{state.optionsValue}</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

Basic Dropdown:

    <div>
      <Dropdown>
            <span value="bird">Bird</span>
            <span value="cow">Cow</span>
            <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
            <span value="monkey">Monkey</span>
            <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

Dropdown with Label

    <Dropdown
      customLabel="Dropdown Example">
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Label on the Left:

      <Dropdown customLabel="Dropdown Example:" leftLabel >
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>

Dropdown with Default Select Value

    <Dropdown defaultText="Select One ...">
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Pre-Set Value

    <Dropdown value="cow">
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdowns with Custom Widths:

    <div>
      <div>
        <Dropdown customLabel="Choose" width="300px">
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

    <div>
      <Dropdown customLabel="Dropdown One" name="dropdown1" inline>
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

    <Dropdown defaultText="Select One ..." customLabel="Required Dropdown" required>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with custom validation and error message:

    _errorCallback = (event, value) => {
    	return {isValid: false , message: "Custom error message!"}
    }
    _handleChange = (value, event) => {
      setState({ value: value });
    };
    <Dropdown
      customLabel="Error Message Dropdown"
      errorCallback={_errorCallback}>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Custom Function Before Change:

    <Dropdown customLabel="onBeforeChange Dropdown" onBeforeChange={ function(value){ let accept = confirm("Do you want to check this?"); return accept; } } >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onClick function:

    <Dropdown onClick={ function(value, event){ console.log("Click: ", event, value) }}>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onChange function:

    _handleChange = (value, event) => {
      console.log("onChange: ", value, event)
    };
    <Dropdown customLabel="onChange Dropdown"
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
