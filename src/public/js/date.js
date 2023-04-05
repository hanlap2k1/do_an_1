function setupform(date){
  var ngay = date.getDate().toString();
  var thang = (date.getMonth()+1).toString();
  var nam = date.getFullYear().toString();
  var dates;
  if(Number(thang)< 10){
    dates = nam + '-0' + thang + '-' + ngay;
  }
  if(Number(ngay)< 10){
    dates = nam + '-' + thang + '-0' + ngay;
  }
  if(Number(thang)< 10 && Number(ngay)< 10){
    dates = nam + '-0' + thang + '-0' + ngay;
  }
  if(Number(thang)>= 10 && Number(ngay)>= 10){
    dates = nam + '-' + thang + '-' + ngay;
  }
  return dates;
   
}
function getDatesOfDayOfWeek (year, month, dayOfWeek) {
  const initialDate = new Date(year, month, 1);
  const datesOfDayOfWeek = [];
  while (initialDate.getDay() !== dayOfWeek) {
    initialDate.setDate(initialDate.getDate() + 1);
  }
  initialDate.setDate(initialDate.getDate() - 7);
  datesOfDayOfWeek.push(setupform(initialDate));
  initialDate.setDate(initialDate.getDate() + 7);
  while (initialDate.getMonth() === month) {
    const nextDate = new Date(initialDate.getTime());
    datesOfDayOfWeek.push(setupform(nextDate));
    initialDate.setDate(initialDate.getDate() + 7);
  }
  datesOfDayOfWeek.push(setupform(initialDate));
  return datesOfDayOfWeek;
}
function geek(myDiv,name,value) {
  var br = document.createElement("br");
  // creating checkbox element
  var checkbox = document.createElement('input');
   
  // Assigning the attributes
  // to created checkbox
  checkbox.type = "checkbox";
  checkbox.name = "check";
  checkbox.value = value;
  checkbox.id = "id"+name;
  // creating label for checkbox
  var label = document.createElement('label');
  label.classList.add("label");
  // assigning attributes for
  // the created label tag
  label.htmlFor = "id"+name;
   
  // appending the created text to
  // the created label tag
  label.appendChild(document.createTextNode(name));
  // appending the checkbox
  // and label to div
  myDiv.appendChild(checkbox);
  myDiv.appendChild(label);
  myDiv.appendChild(br);   
}