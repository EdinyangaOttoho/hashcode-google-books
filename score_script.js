/*Configuration
	//Input File=>*/
	var input = "path/to/input_test_case";
	//output File=>
	var output = "path/to/output_file";
	/*
*/
var f = require("fs");
var input_file = f.readFileSync(input, "utf-8").split("\n");
var output_file = f.readFileSync(output, "utf-8").split("\n");

var presets = input_file[0].split(" ").map(function(x) {
	return parseInt(x);
});
var book_data = input_file[1].split(" ");

var books_count = presets[0];
var libraries_count = presets[1];
var days = parseInt(presets[2]);

var scanned = [];

function getlibrary(x) {
	try {
		let library = input_file[2 + (x * 2)].split(" ");
		let lib_books = input_file[2 + (x * 2) + 1].split(" ").map((a)=>{
			return parseInt(a);
		});
		return {status:"success", library:library, books:lib_books, message:""};
	}
	catch (error) {
		return {status:"error", message:"Invalid library provided"};
	}
}
function book_in_lib(x, y) {
	let lib_books = input_file[2 + (x * 2) + 1].split(" ").map((a)=>{
		return parseInt(a);
	});
	if (lib_books.includes(y) == true) {
		return true;
	}
	else {
		return false;
	}
}
function getmaxbooks(x) {
	let library = input_file[2 + (x * 2)].split(" ").map(function(a) {
		return parseInt(a);
	});
	return (days - parseInt(library[1])) * parseInt(library[2]);
}
function getscore(x) {
	return parseInt(book_data[parseInt(x)]);
}

var a = 0;

var total_score = 0;

console.log("Scoring started...");

if (parseInt(output_file[0]) == (output_file.length - 1) / 2) {
	for (let i = 1; i < output_file.length; i++) {
		a++;
		if (a % 2 == 0) {
			let lib = output_file[i - 1].split(" ").map(function(v) {
				return parseInt(v);
			});
			let books = output_file[i].split(" ").map(function(v) {
				return parseInt(v);
			});
			let determine_lib = getlibrary(lib[0]);
			if (determine_lib.status == "error") {
				console.log("Failed at #"+i);
				console.log("The library ID "+lib[0]+" in line #"+i+" does not exist");
				break;
			}
			for (let j = 0; j < books.length; j++) {
				if (book_in_lib(lib[0], books[j]) === false) {
					console.log("Failed at #"+i);
					console.log("Book "+books[j]+" does not exist in Library "+ lib[0] +" on line #"+i);
					break;
				}
				if (scanned.includes(books[j]) == false) {
					scanned.push(books[j]);
				}
				else {
					books.splice(j, 1);
					j -=1;
				}
			}
			if (parseInt(lib[1]) != books.length) {
				console.log("Failed at #"+i);
				console.log("The book count you provided for library ID "+lib[0]+" doesn't match the list of submitted books provided on line #"+i);
				break;
			}
			let toscore = [];
			let getmax = getmaxbooks(lib[0]);
			if (getmax >= books.length) {
				toscore = books;
			}
			else {
				toscore = books.slice(0, getmax);
			}
			for (k in toscore) {
				total_score += getscore(toscore[k]);
			}
		}
	}
	console.log("Scoring Done... 100%");
	console.log("Total: "+total_score);
}
else {
	console.log("Failed at #1");
	console.log("The number of libraries on line #1 provided does not match the libraries submitted");
}