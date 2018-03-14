
Basic example:

    <FileUpload text="Click or drag a file to be uploaded"/>

onChange example:

    <FileUpload onChange={function(files) {console.log("files: ", files)}}/>

Accept example:

    <FileUpload accept={"application/pdf"}/>

Open File Dialog via external Button:

    <div>
        <FileUpload text="Click or drag a file to be uploaded" inputRef={el => inputElement = el}/>
        <Button primary onClick={() => inputElement.open()}>Open File Dialog</Button>
    </div>

