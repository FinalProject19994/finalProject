let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //Months are zero-based
let yy = today.getFullYear();

today = dd + "/" + mm + "/" + yy;

export default today;
