
Basic Form:

	<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
      <Input small placeholder="Email" required type="email" name="email"></Input>
    </Form>

Another Form:

		<Form onSubmit={function(event, data) {console.log("event: ", event); console.log("data: ", data);}}>
		 <Input small placeholder="Email" type="email" name="email"></Input>
		</Form>
