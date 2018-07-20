RadioGroup:

    <RadioGroup inline name="radioGroupTest" title="Radio Group">
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>

RadioGroup with selected Radio:

    <RadioGroup inline name="selectedRadioGroupTest" title="Radio Group" selectedIndex={1}>
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>

Inline RadioGroup:

		<div>    
	    <RadioGroup title="Radio Group One" inline name="inlineRadioGroupTest">
				<Radio label="Option 1" value="first"/>
				<Radio label="Option 2" value="second"/>
			</RadioGroup>
			<RadioGroup title="Radio Group Two" inline name="inlineRadioGroupTest2">
				<Radio label="Option 1" value="first"/>
				<Radio label="Option 2" value="second"/>
			</RadioGroup>
		</div>

RadioGroup with inline Children:

    <RadioGroup title="Radio Group" inlineChildren name="inlineChildrenRadioGroupTest">
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>

RadioGroup with custom onChange event:

    <RadioGroup inline name="onChangeradioGroupTest" title="Radio Group" onChange={ (e, index) => { console.log(index) } }>
			<Radio label="Option 1" value="first"/>
			<Radio label="Option 2" value="second"/>
		</RadioGroup>
