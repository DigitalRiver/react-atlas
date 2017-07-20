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

###### Placeholder text:

    <TextField placeholder="Enter product details here..."/>

###### Disabled textfield:

    <TextField disabled/>

###### Required validation:

    <TextField required header="Email Address"/>

###### Maximum length validation:

    <TextField maxLength={20}/>

###### Custom validation:

    <TextField 
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

    <TextField onChange={ () => { alert('onChange executed!'); } }/>