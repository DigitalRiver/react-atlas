The Form component can be used with any React Atlas input component. The Form component does not style child
components by default and will ignore inputs without a name prop.

Basic Form with action prop:

		<Form action={"/some/random/url"}>
		  <TextField small placeholder="Text" required type="text" name="textName"></TextField>
			<Button type="submit">Submit</Button>
		</Form>

Form with onSubmit prop:

		<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
		  <TextField small placeholder="Email" required type="email" name="email"></TextField>
		  <TextField small placeholder="Password" required type="password" name="password"></TextField>
		  <TextField small placeholder="Confirm Password" required type="password" name="confirm"></TextField>
			<Button type="submit">Submit</Button>
		</Form>

Form with onError prop:

	<Form onError={function(errorMsg){console.log(errorMsg)}} onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
	  <TextField small placeholder="Email" required type="email" name="email"></TextField>
	  <TextField small placeholder="Password" required type="password" name="password"></TextField>
	  <TextField small placeholder="Confirm Password" required type="password" name="confirm"></TextField>
		<Button type="submit">Submit</Button>
	</Form>
