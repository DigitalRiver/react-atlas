###### Default textfield:

    <TextField/>

###### TextField with header above:

    <TextField header="This is a TextField"/>

###### Small textfield:

    <TextField small/>

###### Medium textfield:

    <TextField medium/>

###### Large textfield:

    <TextField large/>

###### Inline textfields:

    <div>
        <TextField small inline header="TextField One"/>
        <TextField small inline header="TextField Two"/>
    </div>

###### Placeholder text:

    <TextField placeholder="Enter product details here..."/>

###### HTML5 types texfields (default: "text"):

	<div>
		<TextField type="email" header="Email"/>
    	<TextField type="password" header="Password"/>
    </div>

###### Default or app controlled value:

	<TextField value="textfield value here"/>

###### Disabled textfield:

    <TextField disabled/>

###### Required validation:

    <TextField required header="Email Address"/>

###### Maximum length validation:

    <TextField maxLength={20}/>

###### Custom validation:

    <TextField
        required
    	errorText="Only numbers are allowed."
    	validator={ (value) => { return /^\d+$/.test(value) } }
    	header="Only numbers allowed"/>

###### Input Mask:

	<div>
	    <TextField
	    	placeholder="(54) 111-1111"
	    	mask="(54) 111-1111"
	    	header="Phone"/>
    	<TextField
	    	placeholder="ABC 1234"
	    	mask="AAA 1111"
	    	header="Lincese Plate"/>
	</div>

###### onChange handler:

    <TextField onChange={ (value) => { console.log('onChange executed: ', value); } }/>
