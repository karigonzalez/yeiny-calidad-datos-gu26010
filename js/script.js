// Datos comparativos de la Base de Datos (Práctica de Depuración)
const rawDataBefore = [
    { id: "001", name: "  MARIA  FERNANDA r. ", email: "mfernanda@empresa.com", phone: "+51 987654321", date: "2026/10/05", status: "Sin Validar", errorClass: "cell-error" },
    { id: "002", name: "carlos mendoza", email: "cmendoza@gmail.com", phone: "987-654-322", date: "05-10-2026", status: "Inconsistente", errorClass: "cell-error" },
    { id: "003", name: "MARIA FERNANDA R.", email: "mfernanda@empresa.com", phone: "+51 987654321", date: "2026/10/05", status: "DUPLICADO", errorClass: "cell-error" },
    { id: "004", name: "lucia paredes", email: "lparedes_correo_invalido", phone: "S/N", date: "31/02/2026", status: "Error de Formato", errorClass: "cell-error" }
];

const cleanedDataAfter = [
    { id: "REG-001", name: "María Fernanda Rodríguez", email: "mfernanda@empresa.com", phone: "+51 987654321", date: "05/10/2026", status: "Depurado & Validado", cleanClass: "cell-clean" },
    { id: "REG-002", name: "Carlos Mendoza", email: "cmendoza@gmail.com", phone: "+51 987654322", date: "05/10/2026", status: "Depurado & Validado", cleanClass: "cell-clean" },
    { id: "REG-003", name: "Lucía Paredes", email: "lparedes@empresa.com", phone: "+51 987000111", date: "06/10/2026", status: "Corregido & Validado", cleanClass: "cell-clean" }
];

// Función para cambiar la vista entre Antes (Crudo) y Después (Depurado)
function switchDataView(view) {
    const dangerBtn = document.querySelector('.toggle-btn.danger-tab');
    const successBtn = document.querySelector('.toggle-btn.success-tab');
    const infoBar = document.getElementById('data-info-bar');
    const tableBody = document.getElementById('table-body');

    tableBody.innerHTML = '';

    if (view === 'before') {
        dangerBtn.classList.add('active');
        successBtn.classList.remove('active');
        
        infoBar.innerHTML = `
            <span class="info-badge badge-danger">
                <i class="fa-solid fa-triangle-exclamation"></i> Se detectaron 4 inconsistencias: Espacios dobles, textos en minúscula, registros duplicados (#003) y formato de fecha/correo erróneo.
            </span>
        `;

        rawDataBefore.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${row.id}</strong></td>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td>${row.date}</td>
                <td class="${row.errorClass}">${row.status}</td>
            `;
            tableBody.appendChild(tr);
        });

    } else {
        successBtn.classList.add('active');
        dangerBtn.classList.remove('active');
        
        infoBar.innerHTML = `
            <span class="info-badge badge-success">
                <i class="fa-solid fa-circle-check"></i> Base 100% Depurada: Duplicados eliminados, nombres estandarizados con NOMPROPIO, fechas uniformes y correos verificados.
            </span>
        `;

        cleanedDataAfter.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${row.id}</strong></td>
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td>${row.date}</td>
                <td class="${row.cleanClass}">${row.status}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
    switchDataView('before');

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});