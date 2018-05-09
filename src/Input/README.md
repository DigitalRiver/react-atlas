Input component should be used as core part of other components such as TextField, TextArea, CheckBox, Switch, Radio, etc. It is not recommended to use directly. For each particular example, refer to specific component documentation.

###### Default text input:

    <Input type="text"/>

###### Text input with different sizes (default is 100% width):

    <div>
      <Input type="text" small/>
      <Input type="text" medium/>
      <Input type="text" large/>
    </div>

###### Text input with placeholders:

    <Input type="text" placeholder="Add information"/>

###### Text input with required validation:
    <div>
      <Input type="text" required/>
      <Input type="text" required errorText="Custom required message"/>
    </div>

###### Text input with maximum length validation:

    <Input type="text" maxLength={20}/>

###### Text input with custom validation (application code):

    function validateTest(value) {
        return value === 'test';
    }

    <Input type="text"
         large
         validator={validateTest}
         errorText="Custom validation message"/>

###### Masked text input:

The following format characters define editable parts of the mask:

    <div>
      <Input type="text" placeholder="(54) 111-1111" large mask="(54) 111-1111"/>
      <Input type="text" placeholder="ABC 1234" large mask="AAA 1111"/>
    </div>

###### Default textarea:

    <Input type="text" multiline/>

###### Default checkbox input:

    <Input type="checkbox"/>

###### Default radio input:

    <div>
      <Input name="h" type="radio"/>
      <Input name="h" type="radio"/>
    </div>

###### HTML5 type inputs:

    <div>
      <Input type="email"/>
      <Input type="password"/>
    </div>

###### Disabled or hidden inputs:

    <div>
      <Input type="text" disabled/>
      <Input type="text" hidden/>
    </div>
