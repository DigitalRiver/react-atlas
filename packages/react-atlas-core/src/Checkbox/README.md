Checkbox:

    <Checkbox
	    label="Checkbox"
	  />

Checked:	  

      <Checkbox
        label="Checkbox Checked"
        checked
      />

Disabled:

      <Checkbox
        disabled
        label="Checkbox Disabled"
      />

Left label:

      <Checkbox
        label="Checkbox Left Label"
        labelPosition="left"
        checked
      />

Custom onClick method:

      {}

      <Checkbox
        label="Checkbox onClick"
        value="Bat"
        onClick={function(data) { console.log(data.value, data.valid, data.checked); }}
      />

onChange callback:

    <Checkbox
      label="Checkbox onChange"
      value="Duck"
      onChange={function(data) { console.log(data.value, data.valid, data.checked); }}
      />

No label:

      <Checkbox
      />

No label and checked:

      <Checkbox
        checked
      />

Required:

	  <Checkbox
	  	label="Required Example"
	  	required
	  />

Custom validation:

	  <Checkbox
	  	label="Required Example"
	  	validator={ function(checked){ return {valid: checked, message: "Checkbox is required"} } }
	  />

Custom function before change:

      <Checkbox
      	label="Checkbox onBeforeChange"
      	onBeforeChange={ function(value){ if (!value) { let accept = confirm("Do you want to check this?"); return accept; } return true; } }
      />
      
Label and ID:	  

    <Checkbox
      label="Checkbox"
      id="my-checkbox"
    />
