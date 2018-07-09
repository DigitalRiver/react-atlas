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
    
###### TextArea event handlers:

    <TextArea 
        onChange={ (event, data) => { console.log('onChange: ', event, data); } }
        onBlur={ (event, data) => { console.log('onBlur: ', event, data); } }
        onFocus={ (event, data) => { console.log('onFocus: ', event, data); } }
    />

###### TextArea onChange handler:

    <TextArea onChange={ () => { alert('onChange executed!'); } }/>

###### TextArea onBeforeChange:

    <TextArea 
        onBeforeChange={ (event, data) => { let accept = confirm(`Are you sure you want to change the value to ${data.value}?`); return accept; } }
    />


###### TextArea Tooltip requires label:

    <TextArea label="tooltip label" tooltip={<Tooltip text="Example"/>} />
    
###### TextArea tooltipPosition set to left:

    <TextArea label="tooltip label" tooltip={<Tooltip text="Example"/>} tooltipPosition="left" />
