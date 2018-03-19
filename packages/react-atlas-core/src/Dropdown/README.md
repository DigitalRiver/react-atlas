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

Dropdown with label:

      <Dropdown customLabel="Dropdown Example" >
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>

Dropdown with label on the left:

      <Dropdown customLabel="Dropdown Example:" leftLabel >
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>

Dropdown with default select value:

      <Dropdown defaultText="Select One ...">
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>

Dropdown with pre-set value:

      <Dropdown value="cow">
        <span value="bird">Bird</span>
        <span value="cow">Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>

Dropdowns with custom widths:

    <div>
      <div>
        <Dropdown customLabel="Choose" style={{width: "300px"}}>
          <span value="bird">Bird</span>
          <span value="cow" selected>Cow</span>
          <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
          <span value="monkey">Monkey</span>
          <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
        </Dropdown>
      </div>
      <br  />
      <div>
        <Dropdown customLabel="Choose" style={{width: "7rem"}}>
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

Dropdown with required property:

    <Dropdown defaultText="Select One ..." customLabel="Required Dropdown" required>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with custom validation and error message:

    <Dropdown customLabel="Error Message Dropdown" errorCallback={ function(event, value){ return {isValid: false , message: "Custom error message!"} } }>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with custom function before change:

    <Dropdown customLabel="onBeforeChange Dropdown" onBeforeChange={ function(value){ let accept = confirm("Do you want to check this?"); return accept; } } >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onClick function:

    <Dropdown onClick={ function(value, event){ console.log("Click: ", event, value) }} >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onChange function:

    <Dropdown customLabel="onChange Dropdown" onChange={(value, event) => {console.log("onChange: ", value, event)}} >
    <span value="bird">Bird</span>
    <span value="cow">Cow</span>
    <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
    <span value="monkey">Monkey</span>
    <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Update Dropdown options via state after initial render:

    initialState = {items: ["Dog", "Cat"]}
    rows = state.items.map((item, index) => (
      <li value={item} key="{index}">
        {item}
      </li>
    ));
    handleToggle = () => {
        setState({ items: ["Cow", "Horse", "Pig"] })
    };
    <div> 
      <Dropdown defaultText="Select One ..." customLabel="Update State Dropdown" onChange={(value, event) => {console.log("onChange: ", value, event)}} >
        {rows}
        </Dropdown><br />
        <Button primary onClick={handleToggle}>Update State</Button>
        <br /><br />
        List: {state.items.toString()}
    </div>