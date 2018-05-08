###### Default Radio:

    <RadioGroup name="test">
		<Radio label="Option 1" value="first"/>
		<Radio label="Option 2" value="second"/>
	</RadioGroup>

###### Check Radio by default:

    <RadioGroup name="test">
		<Radio label="Option 1" value="first"/>
		<Radio label="Option 2" value="second" defaultChecked/>
	</RadioGroup>

###### Disabled Radio:

    <RadioGroup name="test">
		<Radio label="Option 1" value="first"/>
		<Radio label="Option 2" value="second" disabled/>
		<Radio label="Option 3" value="third"/>
	</RadioGroup>

###### Hidden Radio:

    <RadioGroup name="test">
		<Radio label="Option 1" value="first"/>
		<Radio label="Option 2" value="second" hidden/>
		<Radio label="Option 3" value="third"/>
	</RadioGroup>

###### Radio with left-positioned label:

    <RadioGroup name="test">
		<Radio label="Option 1" labelPosition="left" value="first"/>
		<Radio label="Option 2" value="second"/>
	</RadioGroup>

###### Custom onClick method:

    <RadioGroup name="test">
		<Radio label="Custom onClick" value="first" onClick={ () => { alert('clicked!') } }/>
		<Radio label="Normal Radio" value="second"/>
	</RadioGroup>

###### Custom function before change:

    <RadioGroup name="test">
		<Radio 
			label="Custom onBeforeChange"
			value="first" 
			onBeforeChange={ function(value){ if (!value) { let accept = confirm("Do you want to check this?"); return accept; } return true; } }/>
		<Radio label="Normal Radio" value="second"/>
	</RadioGroup>
