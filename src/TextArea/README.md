###### Default textarea:

    <TextArea/>

###### Non-resizable textarea:

	<TextArea placeholder="Enter text here..." resizable={false}/>

###### Textarea with label above:

    <TextArea label="This is a TextArea"/>

###### Placeholder text:

    <TextArea placeholder="Enter product details here..."/>

###### Disabled textarea:

    <TextArea disabled="true" />

###### Required validation:

    <TextArea required label="Description"/>

###### Maximum length validation:

    <TextArea maxLength={20}/>

###### Both validations at the same time:

    <TextArea required maxLength={20}/>

###### onChange handler:

    <TextArea onChange={ () => { alert('onChange executed!'); } }/>

###### TextArea onBeforeChange:

    <TextArea 
        onBeforeChange={ (event, data) => { return false;} }
    />

###### TextArea Tooltip requires Label:

    <TextArea label="tooltip label" tooltip={<Tooltip text="Example"/>} />
    
###### TextArea tooltip right false:

    <TextArea label="tooltip label" tooltip={<Tooltip text="Example"/>} tooltipPosition="left" />
