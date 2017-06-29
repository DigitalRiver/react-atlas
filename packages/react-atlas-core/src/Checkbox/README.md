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

Left Label:

      <Checkbox
        label="Checkbox Left Label"
        labelPosition="left"
        checked
      />

Custom onClick Method:

      {}

      <Checkbox
        label="Checkbox onClick"
        onClick={this.clickHandler}
      />

No Label:

      <Checkbox
      />

No Label and Checked:

      <Checkbox
        checked
      />

Required:

	  <Checkbox
	  	label="Required Example"
	  	required
	  />

Custom Validation:

	  <Checkbox
	  	label="Required Example"
	  	errorCallback={ function(event, checked){ return {valid: checked, message: "Checkbox is required"} } }
	  />

Custom Function Before Change:

      <Checkbox 
      	label="Checkbox onBeforeChange" 
      	onBeforeChange={ function(value){ if (!value) { let accept = confirm("Do you want to check this?"); return accept; } return true; } }
      />