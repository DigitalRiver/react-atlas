Basic Taskbar:
	
	<Taskbar>
		<Task icon={"fa fa-id-card"} title="Item One" selected />
		<Task title="Item Two"/>
		<Task title="Item Three" />
	</Taskbar>

Taskbar with an onClick function which gets passed down to each child Task:
	
	<Taskbar onClick={ function(e, id, index){ console.log("Click: ", index) }}>
		<Task icon={"fa fa-id-card"} title="Item One" selected />
		<Task title="Item Two"/>
		<Task title="Item Three" />
	</Taskbar>

Taskbar with an onClick function set to only one child Task:
	
	<Taskbar>
		<Task icon={"fa fa-id-card"} title="Item One" selected />
		<Task title="Item Two" id="Item2" onClick={ function(e, id, index){ console.log("Click: ", id, index) }} />
		<Task title="Item Three" />
	</Taskbar>