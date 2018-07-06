Timer with render prop:

    initialState = { time: 0 }
    addTime = () => {
        setState((prevState) => { 
            return { time: prevState.time + 10 }
        });
    }
    <div>
        <Button onClick={addTime}>Add 10 seconds</Button>
        <Timer time={state.time} render={remaining => (remaining) ? <Text>{remaining} second(s) remaining</Text> : null}/>
    </div>

Timer with callbacks:

    initialState = { time: 0 }
    addTime = () => {
        setState((prevState) => { 
            return { time: prevState.time + 10 }
        });
    }
    <div>
        <Button onClick={addTime}>Add 10 seconds</Button>
        <Timer
            time={state.time} 
            onTick={(remaining, elapsed) => console.log(`onTick: ${elapsed} second(s) have passed. ${remaining} second(s) left.`)}
            onZero={() => console.log('Timer reached zero.')}
        />
    </div>

