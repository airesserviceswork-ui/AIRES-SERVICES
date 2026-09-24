// ===============================
// ABRIR / FECHAR MENU
// ===============================

function abrirMenu() {

    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("aberto");
    }

}


// ===============================
// MUDAR DE PÁGINA
// ===============================

function mostrarPagina(nomePagina) {

    const paginas =
        document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina) {

        pagina.classList.remove("ativa");

    });


    const paginaSelecionada =
        document.getElementById(nomePagina);


    if (paginaSelecionada) {

        paginaSelecionada.classList.add("ativa");

    }


    const menu =
        document.getElementById("menu");

    if (menu) {

        menu.classList.remove("aberto");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// SOLICITAR SERVIÇO
// ===============================

function solicitarServico(servico) {

    const campoServico =
        document.getElementById("servico-escolhido");

    const campoNome =
        document.getElementById("nome-cliente");

    const campoTelefone =
        document.getElementById("telefone-cliente");


    // Colocar o serviço escolhido

    if (campoServico) {

        campoServico.value = servico;

    }


    // Procurar dados guardados no perfil

    const nome =
        localStorage.getItem("aires_nome");

    const telefone =
        localStorage.getItem("aires_telefone");


    // Preencher automaticamente o pedido

    if (campoNome) {

        campoNome.value = nome || "";

    }


    if (campoTelefone) {

        campoTelefone.value = telefone || "";

    }


    mostrarPagina("novo-pedido");

}


// ===============================
// RESPONDER NO CHAT
// ===============================

function responder(tipo) {

    const resposta =
        document.getElementById("resposta-chat");


    if (!resposta) {
        return;
    }


    // SERVIÇOS

    if (tipo === "servicos") {

        resposta.innerHTML = `

            <div class="mensagem empresa">

                <strong>
                    AIRES SERVICES
                </strong>

                <p>
                    Temos vários serviços digitais
                    para pessoas e empresas.
                </p>

                <button
                    class="botao-principal"
                    onclick="mostrarPagina('servicos')">

                    Ver serviços

                </button>

            </div>

        `;

    }


    // PEDIDO

    if (tipo === "pedido") {

        resposta.innerHTML = `

            <div class="mensagem empresa">

                <strong>
                    AIRES SERVICES
                </strong>

                <p>
                    Claro! Primeiro escolha
                    um dos nossos serviços.
                </p>

                <button
                    class="botao-principal"
                    onclick="mostrarPagina('servicos')">

                    Escolher serviço

                </button>

            </div>

        `;

    }


    // ATENDENTE

    if (tipo === "humano") {

        resposta.innerHTML = `

            <div class="mensagem empresa">

                <strong>
                    AIRES SERVICES
                </strong>

                <p>
                    Um atendente poderá
                    continuar o seu atendimento.
                </p>

                <button
                    class="botao-principal"
                    onclick="abrirWhatsApp()">

                    💬 Falar pelo WhatsApp

                </button>

            </div>

        `;

    }

}


// ===============================
// ABRIR WHATSAPP
// ===============================

function abrirWhatsApp() {

    const numero = "244957637442";

    const mensagem =
        "Olá, AIRES SERVICES! Estou necessitando de apoio técnico!";


    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");

}


// ===============================
// CRIAR PEDIDO
// ===============================

function criarPedido() {

    const campoNome =
        document.getElementById("nome-cliente");

    const campoTelefone =
        document.getElementById("telefone-cliente");

    const campoServico =
        document.getElementById("servico-escolhido");

    const campoDescricao =
        document.getElementById("descricao-pedido");


    const nome =
        campoNome ? campoNome.value.trim() : "";

    const telefone =
        campoTelefone ? campoTelefone.value.trim() : "";

    const servico =
        campoServico ? campoServico.value.trim() : "";

    const descricao =
        campoDescricao ? campoDescricao.value.trim() : "";


    // VERIFICAR CAMPOS

    if (
        !nome ||
        !telefone ||
        !servico ||
        !descricao
    ) {

        alert(
            "Por favor, preencha todos os campos."
        );

        return;

    }


    // CRIAR PEDIDO

    const pedido = {

        nome: nome,

        telefone: telefone,

        servico: servico,

        descricao: descricao,

        estado: "Pendente",

        data: new Date().toLocaleString("pt-AO")

    };


    // PEGAR PEDIDOS EXISTENTES

    let pedidos =
        JSON.parse(
            localStorage.getItem("pedidos")
        ) || [];


    // ADICIONAR NOVO PEDIDO

    pedidos.push(pedido);


    // GUARDAR PEDIDOS

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    alert(
        "Pedido enviado com sucesso!"
    );


    // ATUALIZAR LISTA

    mostrarPedidos();


    // IR PARA PEDIDOS

    mostrarPagina("pedidos");


    // LIMPAR FORMULÁRIO

    if (campoNome) {
        campoNome.value = "";
    }

    if (campoTelefone) {
        campoTelefone.value = "";
    }

    if (campoServico) {
        campoServico.value = "";
    }

    if (campoDescricao) {
        campoDescricao.value = "";
    }

}


// ===============================
// MOSTRAR PEDIDOS
// ===============================

function mostrarPedidos() {

    const lista =
        document.getElementById("lista-pedidos");


    if (!lista) {
        return;
    }


    const pedidos =
        JSON.parse(
            localStorage.getItem("pedidos")
        ) || [];


    // SEM PEDIDOS

    if (pedidos.length === 0) {

        lista.innerHTML = `

            <div class="cartao">

                <h2>
                    Nenhum pedido ainda
                </h2>

                <p>
                    Os pedidos que fizeres
                    aparecerão aqui.
                </p>

                <button
                    class="botao-principal"
                    onclick="mostrarPagina('servicos')">

                    Escolher serviço

                </button>

            </div>

        `;

        return;

    }


    // LIMPAR LISTA

    lista.innerHTML = "";


    // MOSTRAR CADA PEDIDO

    pedidos.forEach(
        function(pedido) {

            lista.innerHTML += `

                <div class="pedido-card">

                    <h2>
                        ${pedido.servico}
                    </h2>

                    <p>

                        <strong>
                            Cliente:
                        </strong>

                        ${pedido.nome}

                    </p>

                    <p>

                        <strong>
                            Telefone:
                        </strong>

                        ${pedido.telefone}

                    </p>

                    <p>

                        <strong>
                            Descrição:
                        </strong>

                        ${pedido.descricao}

                    </p>

                    <p>

                        <strong>
                            Data:
                        </strong>

                        ${pedido.data}

                    </p>

                    <span class="pedido-status">

                        ${pedido.estado}

                    </span>

                </div>

            `;

        }
    );

}


// ===============================
// MARKETING DIGITAL
// ===============================

function mostrarPacotesMarketing() {

    const pacotes =
        document.getElementById("pacotes-marketing");


    if (!pacotes) {
        return;
    }


    pacotes.classList.toggle("visivel");


    if (pacotes.classList.contains("visivel")) {

        pacotes.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ===============================
// MOSTRAR BENEFÍCIOS DO PACOTE
// ===============================

function mostrarBeneficios(pacote) {

    const beneficios =
        document.getElementById(
            "beneficios-" + pacote
        );


    if (!beneficios) {
        return;
    }


    const todos =
        document.querySelectorAll(
            ".beneficios-pacote"
        );


    todos.forEach(function(item) {

        if (item !== beneficios) {

            item.classList.remove("aberto");

        }

    });


    beneficios.classList.toggle("aberto");

}


// ===============================
// SOLICITAR PACOTE DE MARKETING
// ===============================

function solicitarPacote(nomePacote) {

    const campoServico =
        document.getElementById("servico-escolhido");

    const campoNome =
        document.getElementById("nome-cliente");

    const campoTelefone =
        document.getElementById("telefone-cliente");


    // Serviço escolhido

    if (campoServico) {

        campoServico.value =
            "Marketing Digital - " + nomePacote;

    }


    // Dados do perfil

    const nome =
        localStorage.getItem("aires_nome");

    const telefone =
        localStorage.getItem("aires_telefone");


    // Preencher automaticamente

    if (campoNome) {

        campoNome.value = nome || "";

    }


    if (campoTelefone) {

        campoTelefone.value = telefone || "";

    }


    // Abrir formulário de pedido

    mostrarPagina("novo-pedido");

}


// =================================
// PERFIL DO CLIENTE
// =================================

function guardarPerfil() {

    const campoNome =
        document.getElementById("perfil-nome");

    const campoTelefone =
        document.getElementById("perfil-telefone");


    const nome =
        campoNome
            ? campoNome.value.trim()
            : "";


    const telefone =
        campoTelefone
            ? campoTelefone.value.trim()
            : "";


    if (nome === "" || telefone === "") {

        alert(
            "Por favor, preencha o nome e o contacto."
        );

        return;

    }


    // GUARDAR NO DISPOSITIVO

    localStorage.setItem(
        "aires_nome",
        nome
    );

    localStorage.setItem(
        "aires_telefone",
        telefone
    );


    // MOSTRAR PERFIL GUARDADO

    mostrarPerfilGuardado();

}


// =================================
// MOSTRAR PERFIL GUARDADO
// =================================

function mostrarPerfilGuardado() {

    const nome =
        localStorage.getItem("aires_nome");

    const telefone =
        localStorage.getItem("aires_telefone");


    if (!nome || !telefone) {

        mostrarFormularioPerfil();

        return;

    }


    const nomeGuardado =
        document.getElementById(
            "perfil-nome-guardado"
        );

    const telefoneGuardado =
        document.getElementById(
            "perfil-telefone-guardado"
        );

    const perfilGuardado =
        document.getElementById(
            "perfil-guardado"
        );

    const formularioPerfil =
        document.getElementById(
            "formulario-perfil"
        );


    if (nomeGuardado) {

        nomeGuardado.textContent = nome;

    }


    if (telefoneGuardado) {

        telefoneGuardado.textContent = telefone;

    }


    if (perfilGuardado) {

        perfilGuardado.style.display = "block";

    }


    if (formularioPerfil) {

        formularioPerfil.style.display = "none";

    }

}


// =================================
// MOSTRAR FORMULÁRIO DO PERFIL
// =================================

function mostrarFormularioPerfil() {

    const perfilGuardado =
        document.getElementById(
            "perfil-guardado"
        );

    const formularioPerfil =
        document.getElementById(
            "formulario-perfil"
        );


    if (perfilGuardado) {

        perfilGuardado.style.display = "none";

    }


    if (formularioPerfil) {

        formularioPerfil.style.display = "block";

    }

}


// =================================
// EDITAR PERFIL
// =================================

function editarPerfil() {

    const nome =
        localStorage.getItem("aires_nome");

    const telefone =
        localStorage.getItem("aires_telefone");


    const campoNome =
        document.getElementById("perfil-nome");

    const campoTelefone =
        document.getElementById("perfil-telefone");


    if (campoNome) {

        campoNome.value = nome || "";

    }


    if (campoTelefone) {

        campoTelefone.value = telefone || "";

    }


    mostrarFormularioPerfil();

}


// =================================
// CARREGAR PERFIL
// =================================

function carregarPerfil() {

    const nome =
        localStorage.getItem("aires_nome");

    const telefone =
        localStorage.getItem("aires_telefone");


    if (nome && telefone) {

        mostrarPerfilGuardado();

    } else {

        mostrarFormularioPerfil();

    }

}


// =================================
// QUANDO O APP FOR ABERTO
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Carregar pedidos

        mostrarPedidos();


        // Carregar perfil

        carregarPerfil();

    }
);
