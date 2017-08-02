
Basic Form:

	<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
      <TextField small placeholder="Email" required type="email" name="email"></TextField>
      <TextField small placeholder="Password" type="password" name="password"></TextField>
      <TextField small placeholder="Confirm Password" type="password" name="confirm"></TextField>
    </Form>