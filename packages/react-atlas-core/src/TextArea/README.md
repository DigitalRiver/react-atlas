###### Default textarea:

    <TextArea/>

###### Non-resizable textarea:

	<div>
		<TextArea placeholder="Enter text here..." small resizable={false}/>
	    <TextArea placeholder="Enter text here..." medium resizable={false}/>
	    <TextArea placeholder="Enter text here..." large resizable={false}/>
	    <TextArea placeholder="Enter text here..." resizable={false}/>
    </div>

###### Small textarea:

    <TextArea small/>

###### Medium textarea:

    <TextArea medium/>

###### Large textarea:

    <TextArea large/>

###### Placeholder text:

    <TextArea placeholder="Enter product details here..."/>

###### Disabled textarea:

    <TextArea disabled/>

###### Required validation:

    <TextArea required/>

###### Maximum length validation:

    <TextArea maxLength={20}/>

###### Both validations at the same time:

    <TextArea required maxLength={20}/>

###### onChange handler:

    <TextArea onChange={ () => { alert('onChange executed!'); } }/>