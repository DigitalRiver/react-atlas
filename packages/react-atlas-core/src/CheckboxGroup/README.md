CheckboxGroup

	<CheckboxGroup title="Checkbox Group" name="checkboxGroup" onChange={(value, event, isValid, checked) => { console.log(value, event, isValid, checked)}}>
		<Checkbox label="Checkbox 1" value="first" checked />
		<Checkbox label="Checkbox 2" value="second" />
		<Checkbox label="Checkbox 3" value="third" />
	</CheckboxGroup>

Inline CheckboxGroup

	<div>
		<CheckboxGroup inline title="Inline Checkbox Group" name="inlineGroup">
			<Checkbox
				label="Checkbox Inline"
			/>
			<Checkbox
				label="Checkbox Inline Checked"
				checked
			/>
	    </CheckboxGroup>
	    <CheckboxGroup inline title="Inline Checkbox Group Two" name="inlineGroup2">
			<Checkbox
				label="Checkbox Inline"
			/>
			<Checkbox
				label="Checkbox Inline Checked"
				checked
			/>
	    </CheckboxGroup>
	</div>

CheckboxGroup with inline children

	<CheckboxGroup inlineChildren title="Inline Checkbox Group" name="inlineGroup">
		<Checkbox
			label="Checkbox Inline"
		/>
		<Checkbox
			label="Checkbox Inline Checked"
			checked
		/>
	</CheckboxGroup>

CheckboxGroup with checked minimum

	<CheckboxGroup inline title="Checkbox Group: Select at least one" name="inlineGroup" min={1} limitMessage="This is a custom message. Please select at least {0} checkboxes below.">
		<Checkbox
			label="Checkbox"
		/>
		<Checkbox
			label="Checkbox"
		/>
    </CheckboxGroup>

CheckboxGroup with checked maximum

	<CheckboxGroup inline title="Checkbox Group: Select no more than one" name="inlineGroup" max={1} limitMessage="This is a custom message. Please select no more than {0} checkboxes below.">
		<Checkbox
			label="Checkbox"
		/>
		<Checkbox
			label="Checkbox Checked"
			checked
		/>
    </CheckboxGroup>
