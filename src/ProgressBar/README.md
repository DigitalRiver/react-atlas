Basic ProgressBar:

	<ProgressBar/>

Basic ProgressBar with custom color:

    <ProgressBar color="red"/>

Determinate ProgressBar:
    
    initialState = {value: 30}
    increase = () => {
        setState((prevState) => { 
            return {value: prevState.value + 5}
        });
    }
    decrease = () => {
            setState((prevState) => { 
                return {value: prevState.value - 5}
            });
        }
    <div>
        <ProgressBar mode="determinate" value={state.value}/>
        <br />
        <Button primary onClick={decrease} style={{marginRight: "3px"}}>Decrease</Button>
        <Button primary onClick={increase} style={{marginRight: "3px"}}>Increase</Button>
        <br />
        <br />
        <Text>Progress: {state.value}%</Text>
    </div>

ProgressBar with buffer:

    <ProgressBar mode="determinate" value={60} buffer={80}/>

Circular ProgressBar:

    <ProgressBar type="circular"/>

Circular determinate ProgressBar with custom color and style:

    initialState = {value: 30}
    increase = () => {
        setState((prevState) => { 
            return {value: prevState.value + 10}
        });
    }
    decrease = () => {
        setState((prevState) => { 
            return {value: prevState.value - 10}
        });
    }

    <div>
        <ProgressBar type="circular" mode="determinate" value={state.value} color="#4da547" style={{height:175, width:175}}/>
        <br/>
        <Button primary small onClick={decrease} style={{marginRight: "3px"}}>Decrease</Button>
        <Button primary small onClick={increase} style={{marginRight: "3px"}}>Increase</Button>
    </div>

