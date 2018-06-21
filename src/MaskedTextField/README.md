MaskedTextField:

    <MaskedTextField mask="(6\\12) 111-1111" placeholder="(612) 111-1111" />

Set Initial value:

    <MaskedTextField mask="(111) 111-1111" value="6121633734" />

Controlled MaskedTextField:

    initialState = {value: "1234567890"}
    handleToggle = () => {
        setState({ value: "8888888888" })
    };
    <div>
      <Button primary onClick={handleToggle}>Click</Button>
      <MaskedTextField mask="(111) 111-1111" value={state.value} />
    </div>

MaskedTextField with validation:

    <MaskedTextField mask="(111) 111-1111" placeholder="(111) 111-1111" valid={(value) => { console.log("value: ", value); return false; }} />

onChange MaskTextField:

    <MaskedTextField mask="(111) 111-1111" placeholder="(111) 111-1111" onChange={(event, value) => { console.log("value: ", value); }} />

onBeforeChange MaskTextField:

    <MaskedTextField mask="(111) 111-1111" placeholder="(111) 111-1111" onBeforeChange={(event, value) => { console.log("value: ", value); return false; }} />

