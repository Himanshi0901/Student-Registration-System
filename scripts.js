document.addEventListener('DOMContentLoaded', function () {
    //references to the form, table body, and input fields
    var form = document.getElementById('registrationForm');
    var tableBody = document.querySelector('#studentTable tbody');
    var nameField = document.getElementById('studentName');
    var idField = document.getElementById('studentID');
    var emailField = document.getElementById('emailID');
    var contactField = document.getElementById('contactNo');

    var students = JSON.parse(localStorage.getItem('students')) || [];

    //display all student records in the table
    function displayStudents() {
        tableBody.innerHTML = ''; // Clear the table

        for (var i = 0; i < students.length; i++) {
            var row = document.createElement('tr');

            // Add student data to the row
            row.innerHTML = `
                <td>${students[i].name}</td>
                <td>${students[i].id}</td>
                <td>${students[i].email}</td>
                <td>${students[i].contact}</td>
                <td>
                    <button onclick="editStudent(${i})">Edit</button>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row); // Add the row to the table
        }
    }

    // Function to add a new student
    function addStudent(event) {
        event.preventDefault(); // Prevent the page from refreshing

        // Get values from the input fields
        var name = nameField.value.trim();
        var id = idField.value.trim();
        var email = emailField.value.trim();
        var contact = contactField.value.trim();

        if (!name || !id || !email || !contact) {
            alert('All fields are required!');
            return;
        }

        // Create a new student object
        var newStudent = { name: name, id: id, email: email, contact: contact };

        // Add the student to the array and save to localStorage
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        // Update the table and reset the form
        displayStudents();
        form.reset();
    }

    // Function to edit a student
    window.editStudent = function (index) {

        nameField.value = students[index].name;
        idField.value = students[index].id;
        emailField.value = students[index].email;
        contactField.value = students[index].contact;

        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));

        // Update the table
        displayStudents();
    };

    // Function to delete a student
    window.deleteStudent = function (index) {
        // Confirm before deleting
        if (confirm('Are you sure you want to delete this record?')) {
            students.splice(index, 1); // Remove the student
            localStorage.setItem('students', JSON.stringify(students)); // Save changes
            displayStudents(); // Update the table
        }
    };

    // Add event listener to the form for adding new students
    form.addEventListener('submit', addStudent);

    // Display students on initial page load
    displayStudents();
});
