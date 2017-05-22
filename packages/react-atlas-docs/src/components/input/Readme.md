Input component should be used as core part of other components such as TextField, TextArea, CheckBox, Switch, Radio, etc. It is not recommended to use directly. For each particular example, refer to specific component documentation.

###### Default text input:

    <Input type="text"/>

###### Text input with different sizes (default is 100% width):

    <Input type="text" small/>
    <Input type="text" medium/>
    <Input type="text" large/>

###### Text input with placeholders:

    <Input type="text" placeholder="Add information"/>

###### Text input with required validation:

    <Input type="text" required/>
    <Input type="text" required requiredText="Custom required message"/>

###### Text input with maximum length validation:

    <Input type="text" maxLength={20}/>

###### Text input with custom validation (application code):

    function validateTest(value) {
        return value === 'test';
    }

    <Input type="text"
         large
         validator={this.validateTest} 
         errorText="Custom validation message"/>

###### Masked text input:

The following format characters define editable parts of the mask:

- 1: number
- a: letter
- A: letter, forced to upper case when entered
- *: alphanumeric
- #: alphanumeric, forced to upper case when entered

    <Input type="text" placeholder="(54) 111-1111" large mask="(54) 111-1111"/>
    <Input type="text" placeholder="ABC 1234" large mask="AAA 1111"/>

###### Default textarea:

    <Input type="text" multiline/>

###### Default checkbox input:

    <Input type="checkbox"/>

###### Default radio input:

    <Input type="radio"/>

###### HTML5 type inputs:

    <Input type="email"/>
    <Input type="password"/>

###### Disabled or hidden inputs:

    <Input type="text" disabled/>
    <Input type="text" hidden/>