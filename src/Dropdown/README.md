Basic Dropdown:

      <Dropdown autocomplete name="basicDropdown" id="basicDropdown">
        <Option text="a1" value="a1" />
        <Option text="b1" value="b1" />
        <Option text="c1" value="c1" />
        <Option text="d1" value="d1" />
        <Option text="e1" value="e1" />
        <Option text="f1" value="f1" />
        <Option text="g1" value="g1" />
        <Option text="h1" value="h1" />
        <Option text="i1" value="i1" />
        <Option text="j1" value="j1" />
        <Option text="k1" value="k1" />
        <Option text="l1" value="l1" />
        <Option text="m1" value="m1" />
        <Option text="a" value="a" />
        <Option text="b" value="b" />
        <Option text="c" value="c" />
        <Option text="d" value="d" />
        <Option text="e" value="e" />
        <Option text="f" value="f" />
        <Option text="g" value="g" />
        <Option text="h" value="h" />
        <Option text="i" value="i" />
        <Option text="j" value="j" />
        <Option text="k" value="k" />
        <Option text="l" value="l" />
        <Option text="m" value="m" />
      </Dropdown>

Dropdown with data object for options:

      <Dropdown name="dataDropdown" id="dataDropdown" options={[{"text": "Yes", "value": "true"}, {"text": "No", "value": "false"}]} />

Dropdown with autocomplete:
      
      <Dropdown autocomplete name="autocompleteDropdown" id="autocompleteDropdown" label="Autocomplete Example" options={DropdownList} />

Dropdown with label:
      
      <Dropdown name="labelDropdown" id="labelDropdown" label="Dropdown Example" options={DropdownList} />

Dropdown with styled label:
      
      <div>
        <Label label="Dropdown Example" style={{color: "#00A7E1"}} id="styledLabelDropdown" />
        <Dropdown name="styledLabelDropdown" id="styledLabelDropdown" options={DropdownList} />
      </div>

Dropdown with label on the left:

      <Dropdown leftLabel name="leftLabelDropdown" id="leftLabelDropdown" label="Dropdown Example: "  options={DropdownList} />

Dropdown with placeholder:

      <Dropdown name="placeholderDropdown" id="placeholderDropdown" placeholder="Select One ..." options={DropdownList} />

Dropdown with pre-set value:

      <Dropdown name="presetDropdown" id="presetDropdown" value="US" options={DropdownList} />

Dropdowns with custom widths:

    <div>
        <Dropdown label="Choose" style={{width: "300px"}} options={DropdownList} />
      <br  />
        <Dropdown label="Choose" style={{width: "7rem"}} options={DropdownList} />
    </div>

Disabled Dropdown:

    <Dropdown label="Disabled Dropdown" disabled options={DropdownList} />

Inline Dropdowns:

    <div>
      <Dropdown leftLabel label="Dropdown One:" name="dropdown1" style={{ width: "200px" }} inline options={DropdownList} />
      <Dropdown leftLabel label="Dropdown Two:" name="dropdown2" style={{ width: "200px" }} inline options={DropdownList} />
    </div>

Dropdown with required property:

    <Dropdown defaultText="Select One ..." label="Required Dropdown" placeholder="Select One ..." required options={[{"text": "None", value: ""}, {"text": "One", value: 1}, {"text": "Two", "value": 2}, {"text": "Three", "value": 3}, {"text": "Four", "value": 4}, {"text": "Five", "value": 5}]} />

Dropdown with custom validation and error message (will validate against the display text, not the hidden value):

    <div>
      <Dropdown 
        label="Error Message Dropdown" 
        valid={ (value) => { 
          if(value === "1") {
              return { status: "warning", message: "Warning"}
          } else if(value === "2"){
              return { status: "success", message: "Success"}
          } else if(value === "3"){
              return { status: "error", message: "Error"}
          } else if(value === "4") {
              return false;
          } else if(value === "5") {
              return { status: null, message: null}
          }
        } } 
        options={[{"text": "One", value: "1"}, {"text": "Two", "value": "2"}, {"text": "Three", "value": "3"}, {"text": "Four", "value": "4"}, {"text": "Five", "value": "5"}]} 
      />
      <Hint>1 = warning, 2 = success, 3 = error, 4 = false, 5 = null, Any other value = no return statement</Hint>
    </div>

Dropdown with custom function before change:

    <Dropdown label="onBeforeChange Dropdown" onBeforeChange={ function(value){ let accept = confirm("Do you want to check this?"); return accept; } } options={DropdownList} />

###### Event handlers:

    <Dropdown 
        onChange={ (event, data) => { console.log('onChange: ', event, data); } }
        onBlur={ (event, data) => { console.log('onBlur: ', event, data); } }
        onFocus={ (event, data) => { console.log('onFocus: ', event, data); } }
        onClick={ (event, data) => { console.log('onClick: ', event, data); } }
        onKeyPress={ (event, data) => { console.log('onKeyPress: ', event, data); } }
        options={DropdownList}
    />

Update Dropdown options via state after initial render:

    initialState = {value: "dog", items: [{"text": "Dog", "value": "dog"}, {"text": "Cat", "value": "cat"}]}
    rows = state.items.map((item, index) => (
      <Option text={item.text} value={item.value} key={index} />
    ));
    handleToggle = () => {
        setState({value: "cow", items: [{"text": "Cow", "value": "cow"}, {"text": "Horse", "value": "horse"}] })
    };
    <div> 
      <Dropdown value={state.value} name="updateChildrenDropdown" id="updateChildrenDropdown" label="Update Children">
        {rows}
      </Dropdown><br />
      <Dropdown value={state.value} name="updateDataDropdown" id="updateDataDropdown" label="Update Data" options={state.items} />
      <br />
      <Button primary onClick={handleToggle}>Update State</Button>
      <br /><br />
      <Text>List: {JSON.stringify(state.items)}</Text>
    </div>



