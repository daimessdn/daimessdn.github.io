const a = new Date("09/02/1998");
let b = new Date();

// console.log(b.getFullYear() - a.getFullYear())
// console.log(9 - a.getMonth() + b.getMonth())

let year = b.getFullYear() - a.getFullYear();
let month = 12 - a.getMonth() + b.getMonth();

if (month < 10) {
	month = "0" + month;
}

if (month > 0) {
	year = year - 1;
}

let datever = year + "." + month;
// console.log(year + "." + month)

document.getElementById("date_ver").innerHTML = datever;