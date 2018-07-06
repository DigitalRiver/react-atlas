Basic Dropdown:

      <Dropdown name="basicDropdown" id="basicDropdown">
        <Option value="true" text="Yes" />
        <Option value="false" text="No" />
      </Dropdown>

Dropdown with data object for options:

      <Dropdown name="dataDropdown" id="dataDropdown" options={[{"text": "Yes", "value": "true"}, {"text": "No", "value": "false"}]} />

Dropdown with filter:
      
      <div>
        <Dropdown name="stateDropdown" id="stateDropdown" label="State" filter>
            <Option value="AL" text="Alabama" />
            <Option value="AK" text="Alaska" />
            <Option value="AS" text="American Samoa" />
            <Option value="AZ" text="Arizona" />
            <Option value="AR" text="Arkansas" />
            <Option value="CA" text="California" />
            <Option value="CO" text="Colorado" />
            <Option value="CT" text="Connecticut" />
            <Option value="DE" text="Delaware" />
            <Option value="DC" text="District Of Columbia" />
            <Option value="FM" text="Federated States Of Micronesia" />
            <Option value="FL" text="Florida" />
            <Option value="GA" text="Georgia" />
            <Option value="GU" text="Guam" />
            <Option value="HI" text="Hawaii" />
            <Option value="ID" text="Idaho" />
            <Option value="IL" text="Illinois" />
            <Option value="IN" text="Indiana" />
            <Option value="IA" text="Iowa" />
            <Option value="KS" text="Kansas" />
            <Option value="KY" text="Kentucky" />
            <Option value="LA" text="Louisiana" />
            <Option value="ME" text="Maine" />
            <Option value="MH" text="Marshall Islands" />
            <Option value="MD" text="Maryland" />
            <Option value="MA" text="Massachusetts" />
            <Option value="MI" text="Michigan" />
            <Option value="MN" text="Minnesota" />
            <Option value="MS" text="Mississippi" />
            <Option value="MO" text="Missouri" />
            <Option value="MT" text="Montana" />
            <Option value="NE" text="Nebraska" />
            <Option value="NV" text="Nevada" />
            <Option value="NH" text="New Hampshire" />
            <Option value="NJ" text="New Jersey" />
            <Option value="NM" text="New Mexico" />
            <Option value="NY" text="New York" />
            <Option value="NC" text="North Carolina" />
            <Option value="ND" text="North Dakota" />
            <Option value="MP" text="Northern Mariana Islands" />
            <Option value="OH" text="Ohio" />
            <Option value="OK" text="Oklahoma" />
            <Option value="OR" text="Oregon" />
            <Option value="PW" text="Palau" />
            <Option value="PA" text="Pennsylvania" />
            <Option value="PR" text="Puerto Rico" />
            <Option value="RI" text="Rhode Island" />
            <Option value="SC" text="South Carolina" />
            <Option value="SD" text="South Dakota" />
            <Option value="TN" text="Tennessee" />
            <Option value="TX" text="Texas" />
            <Option value="UT" text="Utah" />
            <Option value="VT" text="Vermont" />
            <Option value="VI" text="Virgin Islands" />
            <Option value="VA" text="Virginia" />
            <Option value="WA" text="Washington" />
            <Option value="WV" text="West Virginia" />
            <Option value="WI" text="Wisconsin" />
            <Option value="WY" text="Wyoming" />
        </Dropdown>
        <Dropdown name="countryDropdown" id="countryDropdown" label="Country" options={DropdownList} filter /><br />
      </div>

Dropdown that displays "value" instead of "text":
      
      <Dropdown valueOnly filter name="valueOnlyDropdown" id="valueOnlyDropdown" label="Value Only Example" options={DropdownList} />

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

    <Dropdown label="Disabled Dropdown" disabled="true" options={DropdownList} />

Read-Only Dropdown:

    <Dropdown label="Read-Only Dropdown" readOnly={true} value="US" options={DropdownList} />

Inline Dropdowns:

    <div>
      <Dropdown leftLabel label="Dropdown One:" name="dropdown1" style={{ width: "200px" }} inline options={DropdownList} />
      <Dropdown leftLabel label="Dropdown Two:" name="dropdown2" style={{ width: "200px" }} inline options={DropdownList} />
    </div>

Dropdown with required property:

    <Dropdown label="Required Dropdown" placeholder="Select One ..." required options={[{"text": "None", value: ""}, {"text": "One", value: "1"}, {"text": "Two", "value": "2"}, {"text": "Three", "value": "3"}, {"text": "Four", "value": "4"}, {"text": "Five", "value": "5"}]} />

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


