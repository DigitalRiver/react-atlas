###### Default textarea:

    <TextArea/>

###### Non-resizable textarea:

	<div>
	    <TextArea placeholder="Enter text here..." small resizable={false}/>
	    <TextArea placeholder="Enter text here..." medium resizable={false}/>
	    <TextArea placeholder="Enter text here..." large resizable={false}/>
	    <TextArea placeholder="Enter text here..." resizable={false}/>
    </div>

###### Textarea with label above:

    <TextArea label="This is a TextArea"/>

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

    <TextArea required label="Description"/>

###### Maximum length validation:

    <TextArea maxLength={20}/>

###### Both validations at the same time:

    <TextArea required maxLength={20}/>

###### onChange handler:

    <TextArea onChange={ () => { alert('onChange executed!'); } }/>

###### TextArea Tooltip requires Label:

    <TextArea label="tooltip label" tooltip="Example tooltip message"/>
    
###### TextArea tooltip right false:

    <TextArea label="tooltip label" tooltip="Example tooltip message" tooltipRight={false} />
