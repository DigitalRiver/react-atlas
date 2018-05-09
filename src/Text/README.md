###### Default Text component:

    <Text>Hello World</Text>

###### Nested Text components:

    <Text>Hello <Text style={{color: "red"}}>World</Text></Text>

###### Nested view components:

    <Text>There is a Button <Button>Hello</Button> inside my Text.</Text>

###### Default Text for body copy:

    <Text body>Hello World</Text>

###### Input label:

    <div>
	  <Text as="label" htmlFor="inputId">Input Label</Text>
	  <TextField id="inputId" />
	</div>

###### Headers and Sub-Headers:

    <div>
	    <Text as="h1">h1 Heading <Text as="small">Secondary text</Text></Text>
	    <Text as="h2">h2 Heading <Text as="small">Secondary text</Text></Text>
	    <Text as="h3">h3 Heading <Text as="small">Secondary text</Text></Text>
	    <Text as="h4">h4 Heading <Text as="small">Secondary text</Text></Text>
	    <Text as="h5">h5 Heading <Text as="small">Secondary text</Text></Text>
	    <Text as="h6">h6 Heading <Text as="small">Secondary text</Text></Text>
	</div>

###### Paragraph Text:

    <div>
    	<Text as="p">Parapraph One</Text>
    	<Text as="p">Paragraph Two</Text>
    </div>

###### Bold text:

    <Text as="b">Hello World</Text>

###### Important text:

    <Text as="strong">Hello World</Text>

###### Italic text:

    <Text as="i">Hello World</Text>

###### Emphasized text:

    <Text as="em">Hello World</Text>

###### Deleted text:

    <Text as="del">Hello World</Text>

###### Inserted text:

    <Text as="ins">Hello World</Text>

###### Marked text:

    <Text as="mark">Hello World</Text>

###### Small text (must be used within another Text component):

    <Text>Hello <Text as="small">World</Text></Text>

###### Subscript text:

    <Text>Hello <Text as="sub">World</Text></Text>

###### Superscript text:

    <Text>Hello <Text as="sup">World</Text></Text>

###### Code text:

    <Text>Sample Code: <Text as="code">Hello World</Text></Text>

###### Blockquote text:

    <Text as="blockquote">Hello World</Text>

###### Link text:

    <Text as="a" href="#">Hello World</Text>

