var simpleRestful = require('simple-restful');
var server = new simpleRestful.createServer({port: 8888});

var simpleResourceInfo = {
	name: "todos",
	idField: "id",
	repository: "File",
	repositoryOptions: {
		folderPath: "server/data"
	}
};

//register the resource and then run
server.addResource(simpleResourceInfo);
server.run();