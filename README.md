# Cardápio de Espetinho Online

Este é um projeto de interface gráfica para um cardápio de espetinhos e bebidas. O objetivo é permitir que os usuários visualizem os itens disponíveis, adicionem ou removam itens do carrinho e finalizem o pedido, enviando diretamente para o Whatsapp do estabelecimento.

## Funcionalidades

- Visualização de itens do cardápio (espetinhos e bebidas)
- Adicionar itens ao carrinho
- Remover itens do carrinho
- Atualização dinâmica das quantidades de itens
- Exibição do total do carrinho
- Finalização do pedido via WhatsApp

## Tecnologias Utilizadas

- HTML
- CSS
- Tailwtailwind
- JavaScript

## Estrutura do Projeto

espetinho-gui/
├── assets/
│ ├── bg.jpg
│ ├── logo.jpg
│ ├── refri-1.png
│ └── refri-2.png
├── styles/
│ ├── output.css
│ └── style.css
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── script.js

## Como Executar o Projeto

1. Clone o repositório para o seu ambiente local:
    ```bash
    git clone https://github.com/Danyel492/espetinho-gui.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd espetinho-gui
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor:
    ```bash
    npm run dev
    ```

## Funcionalidades Detalhadas

### Adicionar e Remover Itens do Carrinho

Os botões de adicionar (`add-to-cart-btn`) e remover (`remove-to-cart-btn`) itens permitem que o usuário ajuste a quantidade de cada item no carrinho. A quantidade é atualizada dinamicamente tanto na página principal quanto no modal do carrinho.

### Atualização do Carrinho

Ao clicar no botão do carrinho, o modal é exibido com os itens adicionados, suas quantidades e o total do pedido. O modal pode ser fechado clicando fora dele ou no botão "Fechar".

### Finalização do Pedido

Ao clicar no botão de finalizar pedido, o sistema verifica se o restaurante está aberto e se o endereço foi preenchido. Se tudo estiver correto, o pedido é enviado via WhatsApp.

Para mudar o numero do Whatsapp, navegue no arquivo `script.js` até:

    ```bash
    //Enviar o pedido para a api whatsapp
    const cartItems = cart.map((item) => {
        return (
            `
            -${item.name} (${item.quantity})
            Preço: R$${item.price}
            ________________
            `
        )
    }).join(" ")

    const saldation = encodeURIComponent("Espetinho do Gui") //Mudar aqui para o nome do estabelecimento desejado
    const message = encodeURIComponent(cartItems)
    const phone = "mude para o numero do whatsapp" // Mudar aqui para o número do whatsapp do estabelecimento, com DDD
    ```

## Contribuição

Se você deseja contribuir com este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).