//selecting all required fields required for this project

const modal = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");
const closeIcon = document.querySelector(".close-icon");
const editIcon = document.querySelector(".edit-icon");
const btnOpenModal = document.getElementById("Add-btn");

const btnEditOpenModal = document.getElementById("Edit-btn");

const editModal = document.getElementById("edit-wrapper");

const table = document.getElementById("employeeTable");
const viewbtn = document.getElementById("viewHide-btn");

//this event listner basically for hiding or showing employee details based on current state
viewbtn.addEventListener("click", function (e) {
  e.preventDefault();
  
  viewbtn.innerText =
    viewbtn.innerText === "Show Details" ? "Hide Details" : "Show Details";
  if (table.classList.contains("hidden")) {

    table.classList.remove("hidden");
  } else {
    table.classList.add("hidden");
  }
});

//Those function below basically remove the hidden class after clicking on a edit button show that it only display when required
const editOpenModal = function () {
  editModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//Those function below basically add the hidden class after clicking on a button show that it hides when not it's requirment os over
const editCloseModal = function () {
  editModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//this icon close functions below basically to close the form after clicking on font-awesome xmark icon
const AddIconClose = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  resetAddEmployeeForm()
};
const editIconClose = function () {
  editModal.classList.add("hidden");

  overlay.classList.add("hidden");
  resetEditEmployee()
};

btnEditOpenModal.addEventListener("click", editOpenModal);

// btnEditCloseModal.addEventListener("click", editCloseModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};


btnOpenModal.addEventListener("click", openModal);


closeIcon.addEventListener("click", AddIconClose);
editIcon.addEventListener("click", editIconClose);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) closeModal();
  }
});
// Employee class constructor
class Employee {
  constructor(name, address, employeeId, designation) {
    this.name = name;
    this.address = address;
    this.employeeId = employeeId;
    this.designation = designation;
  }
}

let employees = [];

let employeesId = [];

//displaying employee form
function displayEmployeeList() {
  //this function basically insert a new row and then insert employee data on the screen
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";
  employees.forEach((employee) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = employee.name;
    row.insertCell(1).textContent = employee.address;
    row.insertCell(2).textContent = employee.employeeId;
    row.insertCell(3).textContent = employee.designation;
  });
}
//resetting employee form
function resetAddEmployeeForm() {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("employeeId").value = "";
  document.getElementById("designation").value = "";
}


const successMessage = (text) => {
  showMessage(text, "green");
};

const errorMessage = (text) => {
  showMessage(text, "red");
};

//This function for showing message either error or success that takes two parameter - a text to display and green color for success and red color for success
const showMessage = (text, color) => {
  const warning = document.querySelector(".warning-hidden");
  warning.style.display = "block";
  warning.innerHTML = text;
  warning.style.backgroundColor = color;
  setTimeout(() => {
    warning.innerHTML = "";
    warning.style.display = "none";
  }, 3000);
};

//Function for Adding employees
const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
function addEmployee() {
  //taking value form input field
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const employeeId = document.getElementById("employeeId").value;
  const designation = document.getElementById("designation").value;
  //creating a newEmployee object from the Employee class
  const newEmployee = new Employee(name, address, employeeId, designation);
  //case-1 : If username contains any special characters than show error
  if (specialChars.test(name)) {

    errorMessage("Username should not contain any special character");
    return;
  }
  //case-2 : in case user fill number in name, show error
  else if (/\d/.test(name)) {
    errorMessage("Username should not contain any number");

    return;
  }
  //case-3: In case user fill only number in address, show error
  else if (/^\d+$/.test(address)) {
    errorMessage("address should not contain only number");
    return;
  }
  //case-4: In case user fill only number in address, show error
  else if (/^\d+$/.test(designation)) {
    errorMessage("Designation should not contain only number");
    return;
  }
  //case-5: if there is no details
  else if (
    !name.trim() &&
    !address.trim() &&
    !employeeId.trim() &&
    !designation.trim()
  ) {
    errorMessage("Please enter details to register yourself");
    return;
  }
  //id and name is required must for this system as i fetch employee details using this id while editing
  else if (!name.trim()) {
    errorMessage("Enter your name to create details");
    return;
  } else if (!employeeId.trim()) {
    errorMessage("Enter id to create details");
    return;
  }
  //this employeesId keeps store of all registered employee,so if a user try to take a pre-registered id than show error
  else if (employeesId.includes(employeeId)) {
    errorMessage("Employee id is not available");
    return;
  }
  //for a record name is must
  else if (name.trim() === "") {
    errorMessage("Enter you name to create details");
    resetAddEmployeeForm();
    return;
  }
  //If all the above error case passed then finally push details into arrays and display on screen
  else if (employeesId.length === 0) {
    employeesId.push(employeeId);
    employees.push(newEmployee);
    //closeModal function call below to hide the form after success excution
    closeModal();
    displayEmployeeList();

    successMessage("Successfully created");
    resetAddEmployeeForm();
  } else {
    employeesId.push(employeeId);
    employees.push(newEmployee);
    closeModal();
    successMessage("Successfully created");
    displayEmployeeList();
    resetAddEmployeeForm();
  }
}
//target the element and then using eventlistner property to trigger the function on create button click
document
  .getElementById("create-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    addEmployee();
  });

//resetting the edit employee form
function resetEditEmployee() {
  const employeeId = (document.getElementById("editEmployeeId").value = "");
  const name = (document.getElementById("editName").value = "");
  const address = (document.getElementById("editAddress").value = "");
  const designation = (document.getElementById("editDesignation").value = "");
  const newEmployeeId = (document.getElementById("newEmployeeId").value = "");
}

//function for editing employee details
function editEmployee() {
  const newEmployeeId = document.getElementById("newEmployeeId").value;

  //fetching the value of input form the form
  const employeeId = document.getElementById("editEmployeeId").value;
  const name = document.getElementById("editName").value;
  const address = document.getElementById("editAddress").value;
  const designation = document.getElementById("editDesignation").value;
  //finding the employee from the array using the stored employee id
  const employee = employees.find((emp) => emp.employeeId === employeeId);
  //If there is no details entered to update then show error
  if (
    !name.trim() &&
    !address.trim() &&
    !designation.trim() &&
    !employeeId.trim() &&
    !newEmployeeId.trim()
  ) {

    errorMessage("Enter some details to update");
    return;
  } else if (!employee) {

    errorMessage("Employee not exist with this id");

    return;
  }

  //if id is not given then show error
  else if (employeeId.trim() === "") {
    modalHandler = false;
    errorMessage("Enter id to edit details");
    resetEditEmployee();
    return;
  }

  // If there is no error than update the field which user want to update
  else if (employee) {
    //if the updated employee id already used by another user
    if (employeeId !== newEmployeeId && employeesId.includes(newEmployeeId)) {
      errorMessage("Employee id already exist");
    } else {
      //check if user update name with special characters
      if (specialChars.test(name)) {
        errorMessage("Name should not contain any special character.");
        return;
      }
      //check if user update address with special characters
      else if (specialChars.test(address)) {
        errorMessage("Address should not contain any special characters");
        return;
      } else {
        //updating field whichever updated
        if (newEmployeeId) employee.employeeId = newEmployeeId;
        if (name) employee.name = name;
        if (address) employee.address = address;
        if (designation) employee.designation = designation;
        employeesId[employeesId.indexOf(employeeId)] = newEmployeeId;
        editCloseModal();
        displayEmployeeList();

        successMessage(
          `updated details of employee of employee id ${employeeId}`
        );
        resetEditEmployee();
      }
    }
  }
}
//target the edit button using getElementById and then trigger the function on a button click
document.getElementById("edit-button").addEventListener("click", function (e) {
  e.preventDefault();
  editEmployee();
});
