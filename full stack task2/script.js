const students = [
    { name: "Midhilesh", department: "CSE", date: "2023-06-10" },
    { name: "Charan", department: "CSE", date: "2022-01-15" },
    { name: "Nikil", department: "CSE", date: "2021-03-20" },
    { name: "Manohar", department: "CSE", date: "2020-11-05" },
    { name: "Krishna", department: "CSE", date: "2023-09-12" },
    { name: "Nani", department: "AIML", date: "2022-07-18" }
];

const tableBody = document.getElementById("tableBody");
const sortOption = document.getElementById("sortOption");
const departmentFilter = document.getElementById("departmentFilter");
const departmentCounts = document.getElementById("departmentCounts");

function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(student => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.date}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function populateDepartments() {
    const departments = ["All", ...new Set(students.map(s => s.department))];
    departmentFilter.innerHTML = "";

    departments.forEach(dep => {
        const option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentFilter.appendChild(option);
    });
}

function updateDepartmentCounts() {
    departmentCounts.innerHTML = "";
    const counts = {};

    students.forEach(student => {
        counts[student.department] = (counts[student.department] || 0) + 1;
    });

    for (let dept in counts) {
        const li = document.createElement("li");
        li.textContent = `${dept}: ${counts[dept]} students`;
        departmentCounts.appendChild(li);
    }
}

function applyFilters() {
    let filteredData = [...students];

    const selectedDept = departmentFilter.value;
    if (selectedDept !== "All") {
        filteredData = filteredData.filter(s => s.department === selectedDept);
    }

    const selectedSort = sortOption.value;
    if (selectedSort === "name") {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (selectedSort === "date") {
        filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    renderTable(filteredData);
}

sortOption.addEventListener("change", applyFilters);
departmentFilter.addEventListener("change", applyFilters);

populateDepartments();
updateDepartmentCounts();
renderTable(students);