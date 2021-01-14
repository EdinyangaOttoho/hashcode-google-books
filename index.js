var f = require("fs");

var input_file = f.readFileSync("F.txt", "utf-8").split("\n");

var params = input_file[0].split(" ");

var book_data = input_file[1].split(" ");

var a = 0;

var books = parseInt(params[0]);

var libraries = parseInt(params[1]);

var days = parseInt(params[2]);

var sortable = [];

function getscores(x) {
	let y = input_file[2 + (x * 2) + 1].split(" ");
	let score = 0;
	for (let i in y) {
		score += parseInt(book_data[parseInt(y[i])]);
	}
	return score;
}
function getbooks(x, w, z) {
	let y = input_file[2 + (x * 2) + 1].split(" ");
	let picker = [];
	for (n in y) {
		picker.push([y[n], parseInt(book_data[parseInt(y[n])])]);
	}
	picker = picker.sort(function(a, b) {
		return b[1] - a[1];
	});
	y = picker.map(function(a) {
		return a[0];
	});
	for (let m = 0; m < y.length; m++) {
		if (scanned.includes(y[m]) == true) {
			y.splice(m, 1);
			m--;
		}
	}
	let calc = z * w;
	let res = [];
	if (calc >= y.length) {
		res = y;
	}
	else {
		res = y.slice(0, calc);
	}
	return res;
}

var libs = -1;
for (i = 2; i < input_file.length; i++) {
	a++;
	if (a % 2 == 0) {

		libs++;

		let x = input_file[i - 1].split(" ");

		let y = input_file[i].split(" ");

		let lib_allbooks = parseInt(x[0]);
		let lib_signup = parseInt(x[1]);
		let lib_books = parseInt(x[2]);

		let score = getscores(libs);

		let formula = parseInt((days - lib_signup) * (lib_allbooks / lib_books)) * score;

		sortable.push([libs, formula, days - lib_signup, lib_books]);

	}
}
console.log("Scanning routine started...");
var distinct = sortable.sort((a, b)=>{
	return b[1] - a[1];
});
var output = [];
var scanned = [];
var unscanned = [];
var libraries_count = 0;
var scores_count = 0;
for (let i in distinct) {
	let bks = getbooks(distinct[i][0], distinct[i][3], distinct[i][2]);
	if (bks.length <= 0) {
		//Do nothing
	}
	else {
		output.push(distinct[i][0]+" "+bks.length);
		output.push(bks.join(" "));
		for (let j in bks) {
			if (scanned.includes(bks[j]) == false) {
				scanned.push(bks[j]);
				scores_count += parseInt(book_data[parseInt(bks[j])]);
			}
		}
		libraries_count++;
	}
}
console.log("Scan completed with "+libraries_count+" libraries and "+scanned.length+" books"+". You scored: "+scores_count);
var final_output = [libraries_count].concat(output);
f.writeFileSync("F_0.txt", final_output.join("\n"));