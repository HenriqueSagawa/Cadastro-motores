# Cadastro de Carros e Motores

## Descrição do Projeto

Este projeto tem como objetivo criar uma página web para o cadastro de carros e motores, utilizando JavaScript para a implementação das classes Carro e Motor. A página permite o cadastro de motores e carros, associando um motor previamente cadastrado a cada carro. O projeto utiliza **Tailwind CSS** para a estilização da interface.

## Funcionalidades Principais

- **Cadastro de Motores**: Formulário para cadastro de motores com atributos como tipo, potência e cilindradas.
- **Cadastro de Carros**: Formulário para cadastro de carros com atributos como marca, modelo, ano, e a possibilidade de selecionar um motor cadastrado previamente.
- **Classes em JavaScript**: Implementação de classes `Carro` e `Motor`, onde um carro possui um motor como atributo.
- **CSS Personalizado**: A organização e o estilo da página ficam a critério do desenvolvedor.

## Requisitos do Projeto

1. Criar uma página HTML para o cadastro de carros e motores.
2. Implementar no JavaScript as classes `Carro` e `Motor` com atributos apropriados.
3. A classe `Carro` deve conter um atributo `motor` que será um objeto da classe `Motor`.
4. O cadastro de um carro deve permitir a seleção de um motor previamente cadastrado.
5. O código fornecido nas aulas anteriores pode ser usado como base para o desenvolvimento.

## Estrutura das Classes

### Classe `Carro`

A classe `Carro` possui os seguintes atributos sugeridos:

- **marca**: String representando a marca do carro (ex: "Toyota").
- **modelo**: String representando o modelo do carro (ex: "Corolla").
- **ano**: Número representando o ano de fabricação do carro (ex: 2020).
- **motor**: Objeto da classe `Motor`, representando o motor do carro.

#### Exemplo de Implementação

```javascript
class Carro {
  constructor(marca, modelo, ano, motor) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.motor = motor; // Objeto da classe Motor
  }
}

```

### Classe `Motor`
A classe `Motor` possui os seguintes atributos sugeridos:

- **tipo**: String representando o tipo do motor (ex: "V8").
- **potencia**: Número representando a potência em cavalos (ex: 400).
- **cilindradas**: Número representando a cilindrada do motor (ex: 4.0).

### Exemplo de Implementação
```
class Motor {
    constructor(tipo, potencia, cilindradas) {
        this.tipo = tipo;
        this.potencia = potencia;
        this.cilindradas = cilindradas;
    }
}

```

### Estrutura do Projeto
A estrutura sugerida para o projeto é a seguinte:

```
/projeto-carros-motores
├── index.html         # Página HTML para o cadastro de carros e motores
├── style.css          # Arquivo de estilos CSS
└── script.js          # Lógica em JavaScript para cadastro e manipulação das classes
```

### Arquivo `index.html`

O arquivo HTML deve conter dois formulários: um para o cadastro de motores e outro para o cadastro de carros. No cadastro de carros, deve-se permitir a seleção de um motor cadastrado anteriormente.

### Exemplo de Estrutura HTML
 ```
 
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <title>Cadastro de Carros e Motores</title>
</head>
<body class="bg-gray-100 p-6">
  <h1 class="text-2xl font-bold mb-4">Cadastro de Motores</h1>
  <form id="form-motor" class="mb-6 bg-white p-4 rounded shadow">
    <input type="text" id="tipo" placeholder="Tipo do motor" class="border p-2 mb-2 w-full" required>
    <input type="number" id="potencia" placeholder="Potência (CV)" class="border p-2 mb-2 w-full" required>
    <input type="number" id="cilindradas" placeholder="Cilindradas" class="border p-2 mb-2 w-full" required>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Cadastrar Motor</button>
  </form>

  <h1 class="text-2xl font-bold mb-4">Cadastro de Carros</h1>
  <form id="form-carro" class="bg-white p-4 rounded shadow">
    <input type="text" id="marca" placeholder="Marca do carro" class="border p-2 mb-2 w-full" required>
    <input type="text" id="modelo" placeholder="Modelo do carro" class="border p-2 mb-2 w-full" required>
    <input type="number" id="ano" placeholder="Ano de fabricação" class="border p-2 mb-2 w-full" required>
    <select id="motores" class="border p-2 mb-2 w-full">
      <!-- Motores cadastrados serão listados aqui -->
    </select>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Cadastrar Carro</button>
  </form>

  <script src="script.js"></script>
</body>
</html>

```

### Arquivo `script.js`
O JavaScript implementa as classes Carro e Motor, além da lógica de cadastro e manipulação dos objetos. Os motores cadastrados são armazenados em um array e podem ser selecionados ao cadastrar um carro.

### Exemplo de Interação Entre as Classes

```
let motoresCadastrados = [];

class Motor {
  constructor(tipo, potencia, cilindradas) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.cilindradas = cilindradas;
  }
}

class Carro {
  constructor(marca, modelo, ano, motor) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.motor = motor;
  }
}

document.getElementById('form-motor').addEventListener('submit', function(event) {
  event.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const potencia = document.getElementById('potencia').value;
  const cilindradas = document.getElementById('cilindradas').value;

  const novoMotor = new Motor(tipo, potencia, cilindradas);
  motoresCadastrados.push(novoMotor);

  atualizarListaMotores();
});

function atualizarListaMotores() {
  const select = document.getElementById('motores');
  select.innerHTML = '';
  motoresCadastrados.forEach((motor, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = `${motor.tipo} - ${motor.potencia}CV - ${motor.cilindradas}L`;
    select.appendChild(option);
  });
}

document.getElementById('form-carro').addEventListener('submit', function(event) {
  event.preventDefault();
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const ano = document.getElementById('ano').value;
  const motorSelecionado = motoresCadastrados[document.getElementById('motores').value];

  const novoCarro = new Carro(marca, modelo, ano, motorSelecionado);
  console.log(novoCarro);
});

```

### Arquivo `style.css`
O arquivo de estilos pode ser personalizado livremente para melhorar a aparência da página. Como o projeto utiliza Tailwind CSS, o arquivo style.css é opcional, a menos que você deseje adicionar estilos personalizados.

### Como Executar
- Clone este repositório para sua máquina local ou acesse a url <a href="https://cadastro-carros.netlify.app">cadastro-carros.netlify.app</a> .
- Abra o arquivo index.html no navegador de sua escolha.
- Cadastre motores e, em seguida, carros associando os motores cadastrados.

### Créditos
Este projeto foi desenvolvido como parte de uma atividade de aula sobre programação orientada a objetos em JavaScript pelo Professor Mestre Samuel Stephan Milczuk.

___

Se precisar de mais alguma modificação ou adição, é só avisar!
