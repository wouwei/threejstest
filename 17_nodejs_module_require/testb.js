var test = require("./test");
function Print() {
	return test.Print()+": this part generated from another js file : require works like require include php / import python csharp. ";
}

exports.Print = Print;