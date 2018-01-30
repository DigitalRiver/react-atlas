###### Default textfield:

    <TextField/>

###### TextField with label above:

    <TextField label="This is a TextField"/>

###### TextField with label to left:

    <TextField label="This is a TextField" leftLabel/>

###### Small textfield:

    <TextField small/>

###### Medium textfield:

    <TextField medium/>

###### Large textfield:

    <TextField large/>

###### Inline textfields:

    <div>
        <TextField small inline label="TextField One"/>
        <TextField small inline label="TextField Two"/>
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

    <TextField disabled/>

###### Required validation:

    <TextField required label="Email Address"/>

###### Maximum length validation:

    <TextField maxLength={20}/>

###### Custom validation:

    <TextField
        required
    	errorText="Only numbers are allowed."
    	validator={ (value) => { return /^\d+$/.test(value) } }
    	label="Only numbers allowed"/>

###### Input Mask:

	<div>
	    <TextField
	    	placeholder="(54) 111-1111"
	    	mask="(54) 111-1111"
	    	label="Phone"/>
    	<TextField
	    	placeholder="ABC 1234"
	    	mask="AAA 1111"
	    	label="License Plate"/>
	</div>

###### onChange handler:

    <TextField onChange={ (value) => { console.log('onChange executed: ', value); } }/>

###### Tooltip Textfield with Label:

    <TextField required small tooltip="some test" label="key"/>

###### Textfield with uppercase prop:

    <TextField uppercase />
