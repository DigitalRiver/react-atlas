Basic Dropdown:

    <div>
      <Dropdown customLabel="Choose">
        <span value="bird">Bird</span>
        <span value="cow" selected>Cow</span>
        <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
        <span value="monkey">Monkey</span>
        <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
      </Dropdown>
    </div>

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

Dropdown with Required Property:

    <Dropdown customLabel="Required Dropdown" required>
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

Dropdown with Custom Function Before Change:

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
