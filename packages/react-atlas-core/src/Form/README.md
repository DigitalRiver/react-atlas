
Basic Form:

		<Form onError={function(errorCode, errorMsg){console.log(errorCode, errorMsg)}} onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
		  <TextField small placeholder="Email" required type="email" name="email"></TextField>
		  <TextField small placeholder="Password" required type="password" name="password"></TextField>
		  <TextField small placeholder="Confirm Password" required type="password" name="confirm"></TextField>
		</Form>

Another Form:

		<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
		 <Input small placeholder="Email" type="email" name="email"></Input>
		</Form>
