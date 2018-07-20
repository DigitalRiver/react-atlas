The Radio component is a controlled component that must be used within the RadioGroup component. For more examples view the RadioGroup examples.

###### Default Radio:

    <RadioGroup name="radioTest">
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>

###### Disabled Radio:

    <RadioGroup name="disabledTest">
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second" disabled/>
			<Radio label="Option 3" value="third"/>
		</RadioGroup>

###### Hidden Radio:

    <RadioGroup name="hiddenTest">
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second" hidden/>
			<Radio label="Option 3" value="third"/>
		</RadioGroup>

###### Radio with left-positioned label:

    <RadioGroup name="leftLabelTest">
			<Radio label="Option 1" labelPosition="left" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>

###### Custom onClick method:

    <RadioGroup name="onClickTest">
			<Radio label="Custom onClick" value="first" onClick={ (e, data) => { console.log(data.index, data.value) } }/>
			<Radio label="Normal Radio" value="second"/>
		</RadioGroup>

###### Custom onChange method:

    <RadioGroup name="onChangeTest">
			<Radio label="Custom onChange" value="first" onChange={ (data) => { console.log(data.checked, data.value) } }/>
			<Radio label="Normal Radio" value="second"/>
		</RadioGroup>

###### Custom function before change:

    <RadioGroup name="onBeforeChangeTest">
			<Radio 
				label="Custom onBeforeChange"
				value="first" 
				onBeforeChange={ function(e, data){ if (!data.checked) { let accept = confirm("Do you want to check this?"); return accept; } return true; } }/>
			<Radio label="Normal Radio" value="second"/>
		</RadioGroup>
