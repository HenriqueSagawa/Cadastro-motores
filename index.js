class Motor {
    constructor(modelo, numSerie, potencia, ano, marca, cilindrada, descricao) {
        this.modelo = modelo;
        this.numSerie = numSerie;
        this.potencia = potencia;
        this.ano = ano;
        this.marca = marca;
        this.cilindrada = cilindrada;
        this.descricao = descricao;
    }
}

class Carro {
    constructor(dono, marca, modelo, ano, placa, motor, preco, cor, foto) {
        this.dono = dono;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.motor = motor;
        this.preco = preco;
        this.cor = cor;
        this.foto = foto;
    }
}

var motores = [];
var carros = [];

document.getElementById("cadastrarMotor").addEventListener('click', (e) => {
    e.preventDefault();
    const modelo = document.getElementById('modeloMotor');
    const numSerie = document.getElementById('numSerieMotor');
    const potencia = document.getElementById('potenciaMotor');
    const ano = document.getElementById('anoMotor');
    const marca = document.getElementById('marcaMotor');
    const cilindrada = document.getElementById('cilindradaMotor');
    const descricao = document.getElementById('descricaoMotor');

    const motor = new Motor(modelo.value, numSerie.value, potencia.value, ano.value, marca.value, cilindrada.value, descricao.value);
    motores.push(motor);

    limparInputs();
    carregarMotor();

    salvarDados();
});

function carregarMotor() {
    let novaLista = '<option value="" disabled selected>Selecionar Motor</option>';
    motores.forEach((motor, index) => {
        novaLista += `<option value="${index}">${motor.modelo} - ${motor.marca}</option>`;
    });

    document.getElementById('motorCarro').innerHTML = novaLista;
}

function limparInputs() {
    document.getElementById('modeloMotor').value = '';
    document.getElementById('numSerieMotor').value = '';
    document.getElementById('potenciaMotor').value = '';
    document.getElementById('anoMotor').value = '';
    document.getElementById('marcaMotor').value = '';
    document.getElementById('cilindradaMotor').value = '';
    document.getElementById('descricaoMotor').value = '';
}

document.getElementById('fotoCarro').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById("cadastrarCarro").addEventListener('click', (e) => {
    e.preventDefault();
    const dono = document.getElementById('donoCarro').value;
    const marca = document.getElementById('marcaCarro').value;
    const modelo = document.getElementById('modeloCarro').value;
    const ano = document.getElementById('anoCarro').value;
    const placa = document.getElementById('placaCarro').value;
    let motor = document.getElementById('motorCarro').value;
    motor = motores[motor];
    const preco = document.getElementById('precoCarro').value;
    const cor = document.getElementById('corCarro').value;
    const foto = document.getElementById('previewImage').src;

    const carro = new Carro(dono, marca, modelo, ano, placa, motor, preco, cor, foto);
    carros.push(carro);

    carregarCarro();
    limparInputsCarro();
    salvarDados();

});

function limparInputsCarro() {
    document.getElementById('donoCarro').value = '';
    document.getElementById('marcaCarro').value = '';
    document.getElementById('modeloCarro').value = '';
    document.getElementById('anoCarro').value = '';
    document.getElementById('placaCarro').value = '';
    document.getElementById('motorCarro').value = '';
    document.getElementById('precoCarro').value = '';
    document.getElementById('corCarro').value = '';
    document.getElementById('previewImage').src = '';
    document.getElementById('previewImage').style.display = 'none';
}

function carregarCarro() {
    let novalista = "<option selected>Selecione um carro</option>"
    carros.forEach((carro, index) => {
        novalista += `<option value="${index}">${carro.marca} ${carro.modelo} - ${carro.ano}</option>`;
    });
    document.getElementById('selectCarro').innerHTML = novalista;
}

document.getElementById('selectCarro').addEventListener("change", () => {
    let viewInfo = document.getElementById('viewInfo');

    let carro = carros[document.getElementById("selectCarro").value];

    viewInfo.innerHTML = `
        <h1 class="text-5xl font-semibold">${carro.marca} ${carro.modelo}</h1>
        <div class="placa-brasileira">
            <div class="top-bar">
            <span class="pais">BRASIL</span>
            <span class="bandeira"></span>
        </div>
            <div class="codigo">
                <span class="caracteres">${carro.placa.toUpperCase()}</span>
            </div>
        </div>
        <p>Motor: ${carro.motor.modelo} <button onClick={verMotor(carros[document.getElementById("selectCarro").value].motor)} class="rounded-md bg-blue-600 py-1 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">Ver informações</button></p>
        <p>Ano: ${carro.ano}</p>
        <p>Preço: R$ ${carro.preco}</p>
        <p class="bg-[${carro.cor}]">Cor: ${carro.cor}</p>
        <img style="width: 200px; height: auto;"  src="${carro.foto}" alt="${carro.marca} ${carro.modelo}">`
});

function salvarDados() {
    localStorage.setItem('motores', JSON.stringify(motores));
    localStorage.setItem('carros', JSON.stringify(carros));
}

function carregarDados() {
    if (localStorage.getItem('motores')) {
        motores = JSON.parse(localStorage.getItem('motores'));
        carregarMotor();
    }

    if (localStorage.getItem('carros')) {
        carros = JSON.parse(localStorage.getItem('carros'));
        carregarCarro();
    }
}

carregarDados();

function verMotor(e) {
    let div = document.getElementById("viewMotor");

    abrirInformacoes();

    div.innerHTML = `
        <button class="absolute right-2 top-2 text-3xl font-semibold" onClick={abrirInformacoes()}>X</button>
        <h1 class="text-5xl font-semibold">${e.modelo} - ${e.marca}</h1>
        <p><strong>Potência:</strong> ${e.potencia} CV</p>
        <p><strong>Ano:</strong> ${e.ano}</p>
        <p><strong>Cilindrada:</strong> ${e.cilindrada}</p>
        <p><strong>Descrição:</strong> ${e.descricao}</p>
    `
};

function abrirInformacoes() {
    let div = document.getElementById("viewMotor");

    if (div.style.display == "none") {
        div.style.display = "flex";
    } else {
        div.style.display = "none";
    }

}