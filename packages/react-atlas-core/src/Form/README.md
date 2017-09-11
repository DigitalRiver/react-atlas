
The Form component is used for sending data to a server. The Form component can be used with any react-atlas input component, for example components like Input, TextArea, TextField, Dropdown, RadioGroup, etc. As well as any HTML5 input element. The Form component does not style child components by default and will ignore inputs without a name prop. There are two main ways of using the Form component and they both deal with how to send form data to the server. First a user can use the action prop to set the URL to send data to. By default POST is used, this can be overidden by the method prop. When using action, Form will send data as a querystring. Below is an example of using action to send data to a server.

Basic Form:

		<Form action={"/some/random/url"}>
		  <TextField small placeholder="Text" required type="text" name="textName"></TextField>
			<Button type="submit">Submit</Button>
		</Form>


However many times a server does not accept querystrings or you want to do some post processing, client side before sending the data back to the server. For this use onSubmit instead of action. onSubmit takes a function with the signature `function(event, data) {}` . Event is the click event on the submit button and data is a object containing data in key value pairs. The keys are the name of the child component and value is the value of the child component. Below is an example of using onSubmit.

onSubmit Form:

		<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
		  <TextField small placeholder="Email" required type="email" name="email"></TextField>
		  <TextField small placeholder="Password" required type="password" name="password"></TextField>
		  <TextField small placeholder="Confirm Password" required type="password" name="confirm"></TextField>
			<Button type="submit">Submit</Button>
		</Form>

But what about errors? good question. To get Form errors use the onError prop. This callback will fire whenever an error has occured. The callback looks like this `function(errorCode, errorMsg)`. The errorCode can be used to lookup the type of error and errorMsg provides a generic error message for this specific error. Below is an example of using onError with onSubmit.

Error Form:

	<Form onError={function(errorCode, errorMsg){console.log(errorCode, errorMsg)}} onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
	  <TextField small placeholder="Email" required type="email" name="email"></TextField>
	  <TextField small placeholder="Password" required type="password" name="password"></TextField>
	  <TextField small placeholder="Confirm Password" required type="password" name="confirm"></TextField>
		<Button type="submit">Submit</Button>
	</Form>
