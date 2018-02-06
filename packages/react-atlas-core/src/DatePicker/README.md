

DatePicker with onChange:

      <DatePicker onChange={function(date) {console.log("date: ", date._d)}}/>

DatePicker with format:

      <DatePicker format="MMMM Do YYYY"/>


DatePicker with selected prop and selected date:

		initialState = {
			date: "11/11/2011" 
		}

		handleDateChange = () => {
			setState({ "date": "12/12/2012"})
		};

		<div>
			<DatePicker selected={state.date} onChange={function(date) {console.log("date: ", date._d)}}/>
			<Button onClick={handleDateChange}> Change </Button>
			<br />
			State date: {state.date.toString()}
		</div>
