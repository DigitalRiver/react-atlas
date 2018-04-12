###### Default Switch:
    <Switch/>

###### Default Switch with label:

    <Switch label="This is a Switch"/>

###### Default Switch with label to left:

    <Switch label="This is a Switch" leftLabel/>

###### Different sized Switches:

    <div>
      <Switch small/>
      <Switch medium/>
      <Switch large/>
    </div>

###### Multiple Switches tied to same behavior (name prop):

    <div>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
    </div>

###### Switch with custom colors and styles:

    <div>
      <Switch onColor="#00bbaa" style={{display:"inline-block"}}/>
      <Switch onColor="#f46542" style={{display:"inline-block"}}/>
    </div>

###### Disabled and hidden Switches:

    <div>
      <Switch disabled/>
      <Switch hidden/>
    </div>

###### Switch with onClick:

    function customSwitchClick() {
        console.info("onClick event!");
    }

    <Switch onClick={customSwitchClick}/>

###### Switch with onChange:

    function customSwitchChange() {
        console.info("onChange event!");
    }

    <Switch onChange={customSwitchChange}/>

###### Make checks before changing component's state (onbeforechange). It receives a value with current checked state:

    function customSwitchBeforeChange(value) {
        if(!value) {
          let accept = confirm("Do you want to check this?");
          return accept;
        }

        return true;
    }

    <Switch onBeforeChange={customSwitchBeforeChange}/>

This method should return true or false, allowing or not the onChange handler to be fired. If undefined, will prevent it.


