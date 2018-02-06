Switch component allows to define a particular-styled checkbox.

###### Default switch:

    <Switch/>

###### Default switch with label above:

    <Switch label="This is a Switch"/>

###### Default switch with label to left:

    <Switch label="This is a Switch" leftLabel/>

###### Different sized switches:

    <div>
      <Switch small/>
      <Switch medium/>
      <Switch large/>
    </div>

###### Multiple switches tied to same behavior (name prop):

    <div>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
      <Switch name="customFeature"/>
    </div>

###### Set other colors (hex, rgb, css-valid color name) or css attributes :

    <div>
      <Switch onColor="#00bbaa" style={{display:"inline-block"}}/>
      <Switch onColor="#f46542" style={{display:"inline-block"}}/>
    </div>

###### Disabled or hidden switch:

    <div>
      <Switch disabled/>
      <Switch hidden/>
    </div>

###### Custom onClick Method:

    function customSwitchClick() {
        console.info("onClick event!");
    }

    <Switch onChange={customSwitchClick}/>

###### Execute method when onChange event occurs:

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


