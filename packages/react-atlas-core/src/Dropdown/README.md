Basic Dropdown:
    
    <Dropdown customLabel="Choose" buttonWidth={160}>
       <span value="bird">Bird</span>
       <span value="cow" selected>Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Disabled Dropdown:
    
    <Dropdown customLabel="Disabled Dropdown" buttonWidth={250} disabled>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Required Property:
    
    <Dropdown customLabel="Required Dropdown" buttonWidth={250} required>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Required Property and Custom Error Message:
    
    <Dropdown customLabel="Error Message Dropdown" buttonWidth={160} required errorCallback={ function(event, value){ return {valid: value !== "", message: "Dropdown is required"} } }>
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with Custom Function Before Change:
    
    <Dropdown customLabel="onChange Dropdown" buttonWidth={160} onBeforeChange={ function(value){ let accept = confirm("Do you want to check this?"); return accept; } } >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>

Dropdown with onClick function:

    <Dropdown onClick={ function(event, value){ console.log("Click: ", event, value) }} >
       <span value="bird">Bird</span>
       <span value="cow">Cow</span>
       <span value="cbpcdmh">Cow Bird Pick Cat Dog Monkey Human</span>
       <span value="monkey">Monkey</span>
       <span value="eee">eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span>
    </Dropdown>