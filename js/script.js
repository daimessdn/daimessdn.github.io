const a = new Date("09/02/1998");
let b = new Date();

let year = b.getFullYear() - a.getFullYear();
let month = 12 - a.getMonth() + b.getMonth();

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {
	year = year - 1;
}

let datever = year + "." + month;

document.getElementById("date_ver").innerHTML = datever;