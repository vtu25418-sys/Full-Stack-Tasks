let employees = JSON.parse(localStorage.getItem("employees")) || [];
let auditLogs = JSON.parse(localStorage.getItem("auditLogs")) || [];

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveEmployee);

function saveEmployee() {

    let id = document.getElementById("empId").value.trim();
    let name = document.getElementById("empName").value.trim();
    let salary = parseFloat(document.getElementById("salary").value);

    if (!id || !name || isNaN(salary)) {
        alert("Please fill all fields correctly!");
        return;
    }

    let existing = employees.find(emp => emp.id === id);

    if (existing) {
        // UPDATE (Trigger Simulation)
        let oldSalary = existing.salary;
        existing.name = name;
        existing.salary = salary;

        auditLogs.push({
            empId: id,
            action: "UPDATE",
            oldSalary: oldSalary,
            newSalary: salary,
            time: new Date().toLocaleString()
        });

    } else {
        // INSERT (Trigger Simulation)
        employees.push({ id, name, salary });

        auditLogs.push({
            empId: id,
            action: "INSERT",
            oldSalary: null,
            newSalary: salary,
            time: new Date().toLocaleString()
        });
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("auditLogs", JSON.stringify(auditLogs));

    renderEmployees();
    renderAuditLogs();
    renderReport();

    clearInputs();
}

function clearInputs() {
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("salary").value = "";
}

function renderEmployees() {
    const tbody = document.querySelector("#employeeTable tbody");
    tbody.innerHTML = "";

    employees.forEach(emp => {
        let row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.salary}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderAuditLogs() {
    const tbody = document.querySelector("#auditTable tbody");
    tbody.innerHTML = "";

    auditLogs.forEach(log => {
        let row = `
            <tr>
                <td>${log.empId}</td>
                <td>${log.action}</td>
                <td>${log.oldSalary !== null ? log.oldSalary : "-"}</td>
                <td>${log.newSalary}</td>
                <td>${log.time}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function renderReport() {
    const tbody = document.querySelector("#reportTable tbody");
    tbody.innerHTML = "";

    let reportData = {};

    auditLogs.forEach(log => {
        let date = log.time.split(",")[0];

        if (!reportData[date]) {
            reportData[date] = { INSERT: 0, UPDATE: 0 };
        }

        reportData[date][log.action]++;
    });

    for (let date in reportData) {
        let row = `
            <tr>
                <td>${date}</td>
                <td>${reportData[date].INSERT}</td>
                <td>${reportData[date].UPDATE}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    }
}

renderEmployees();
renderAuditLogs();
renderReport();