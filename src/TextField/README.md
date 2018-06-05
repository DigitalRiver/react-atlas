###### Default textfield:

    <TextField/>

###### TextField with label above:

    <TextField label="This is a TextField"/>

###### TextField with label to left:

    <TextField label="This is a TextField" leftLabel/>

###### TextField with modified width:

    <TextField style={{ width: "250px" }} />

###### Inline textfields:

    <div>
        <TextField leftLabel style={{width: "200px"}} inline label="TextField One:"/>
        <TextField leftLabel style={{width: "200px"}} inline label="TextField Two:"/>
    </div>

###### Placeholder text:

    <TextField placeholder="Enter product details here..."/>

###### HTML5 types textfields (default: "text"):

	<div>
		<TextField type="email" label="Email"/>
    	<TextField type="password" label="Password"/>
    </div>

###### Default or app controlled value:

	<TextField value="textfield value here"/>

###### Disabled textfield:

    <TextField disabled="true" />

###### Required validation. Pass a string instead of a boolean to change the required indicator from an asterisk:

    <div>
        <TextField required label="Email Address" type="Email"/>
        <TextField required="Required" label="Password" type="Password"/>
        <TextField required="" label="Confirm Password" type="Password"/>
    </div>

###### Maximum length validation:

    <TextField maxLength={20}/>

###### Custom validation. Will override the required property (you can still use the required prop to add a required indicator next to the label) and must return either false (to display an error with no message) or an object with a status (Options: null, "success", "warning", "error") and a message (Options: null or string). Returning null or not returning anything will set both status and message to null:

    <div>
        <TextField
            maxLength={1}
            valid={ (value) => { 
                if(value === "1") {
                    return { status: "warning", message: "Warning"}
                } else if(value === "2"){
                    return { status: "success", message: "Success"}
                } else if(value === "3"){
                    return { status: "error", message: "Error"}
                } else if(value === "4") {
                    return false;
                } else if(value === "5") {
                    return { status: null, message: null}
                }
            } }
            label="Only numbers allowed."
        />
        <Hint>1 = warning, 2 = success, 3 = error, 4 = false, 5 = null, Any other value = no return statement</Hint>
    </div>

###### Event handlers:

    <TextField 
        onChange={ (event, data) => { console.log('onChange: ', event, data); } }
        onBlur={ (event, data) => { console.log('onBlur: ', event, data); } }
        onFocus={ (event, data) => { console.log('onFocus: ', event, data); } }
    />

###### Tooltip Textfield with Label:

    <TextField required tooltip={<Tooltip text="Example"/>} label="key"/>

###### Textfield with uppercase prop:

    <TextField uppercase />

###### Externally controlled status:

    initialState = {status: "error", message: "Please enter a value."}
    handleToggle = () => {
        setState({ status: "success", message: "Thank you for entering a value." })
    };
    <div> 
    <TextField status={state.status} label="Modify the TextField's value then click the button to change status from an external source"/><br />
        <Button primary onClick={handleToggle}>Update State</Button>
        <br /><br />
        Status: {state.status}
    </div>
