function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-content").innerHTML = data;

            // Executa scripts específicos da página
            if (page === "dashboard") initDashboard();
            if (page === "alertas") initAlertas();
            if (page === "funcionarios") initFuncionarios();
        })
        .catch(error => console.error("Erro ao carregar página:", error));
}

// ================= DASHBOARD =================
function initDashboard() {

    // Relógio
    const clock = document.getElementById("clock");
    if (clock) {
        setInterval(() => {
            const now = new Date();
            clock.innerText = now.toLocaleString();
        }, 1000);
    }

    // Dados simulados
    document.getElementById("pessoas").innerText = 128;
    document.getElementById("conformidade").innerText = "92%";
    document.getElementById("semEpi").innerText = 6;

    const alertas = document.getElementById("alertas");
    alertas.innerHTML = `
        <div class="alert-item">Funcionário ID 102 - Sem Capacete - Área Produção</div>
        <div class="alert-item">Funcionário ID 87 - Sem Colete - Área Carga</div>
    `;

    const tabela = document.getElementById("tabelaRegistros");
    tabela.innerHTML = `
        <tr>
            <td>João Silva</td>
            <td>Produção</td>
            <td class="status-ok">Com EPI</td>
            <td>08:32</td>
        </tr>
        <tr>
            <td>Maria Souza</td>
            <td>Carga</td>
            <td class="status-alert">Sem Capacete</td>
            <td>09:11</td>
        </tr>
    `;
}

// ================= ALERTAS =================
function initAlertas() {
    const container = document.getElementById("lista-alertas");

    container.innerHTML = `
        <div class="alert-item">Funcionário ID 55 - Sem Luva</div>
        <div class="alert-item">Funcionário ID 88 - Sem Óculos</div>
        <div class="alert-item">Funcionário ID 102 - Sem Capacete</div>
    `;
}

// ================= FUNCIONÁRIOS =================
function initFuncionarios() {
    const tabela = document.getElementById("lista-funcionarios");

    tabela.innerHTML = `
        <tr>
            <td>João Silva</td>
            <td>Produção</td>
            <td>Ativo</td>
        </tr>
        <tr>
            <td>Maria Souza</td>
            <td>Carga</td>
            <td>Ativo</td>
        </tr>
    `;
}

// Carrega dashboard ao iniciar
loadPage("dashboard");