// AQUI ESTÃO AS FUNÇÕES DIRECIONADAS AO CARRINHO, DESDE O CLICK NO PRODUTO PARA ADICIONAR AO CART, DESDE AS INTERAÇÕES DENTRO DO CARRINHO

const items = document.getElementById('cart-items');
const contador = document.getElementById('contador');
const total = document.getElementById('cart-total');

let numero = 0;
let cart = [];

// Função para adicionar um item ao carrinho
function handleAddToCart(botaoAdd) {
    const nome = botaoAdd.getAttribute("data-name");
    const preco = parseFloat(botaoAdd.getAttribute("data-price"));

    console.log(`Adicionando item: ${nome}, Preço: ${preco}`);

    let item = cart.find(item => item.name === nome);

    if (item) {
        item.quantity += 1;
    } else {
        item = { name: nome, price: preco, quantity: 1 };
        cart.push(item);
    }

    numero++;
    contador.innerText = `(${numero})`;

    adicionar(item);
    atualizarTotal();
}

// Função para remover um item do carrinho
function handleRemoveFromCart(removeBtn) {
    const nome = removeBtn.getAttribute('data-name');
    console.log(`Removendo item: ${nome}`);

    const itemIndex = cart.findIndex(item => item.name === nome);

    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        item.quantity--;

        numero--;
        contador.innerText = `(${numero})`;

        if (item.quantity > 0) {
            updateItemDisplay(item);
        } else {
            cart.splice(itemIndex, 1);
            removeItemFromDisplay(nome);
        }

        atualizarTotal();
    }
}

// Função para adicionar um item ao DOM
function adicionar(item) {
    let elementoExistente = items.querySelector(`[data-name="${item.name}"]`);

    if (elementoExistente) {
        updateItemDisplay(item);
    } else {
        const criarElemento = document.createElement('div');
        criarElemento.className = 'container-item';
        criarElemento.setAttribute('data-name', item.name);
        criarElemento.innerHTML = `
            <div>
                <p>${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        `;
        items.appendChild(criarElemento);
    }
}

// Função para atualizar a exibição de um item no DOM
function updateItemDisplay(item) {
    const elementoCarrinho = items.querySelector(`[data-name="${item.name}"]`);
    if (elementoCarrinho) {
        const quantityP = elementoCarrinho.querySelector('p:nth-of-type(2)');
        if (quantityP) {
            quantityP.textContent = `Qtd: ${item.quantity}`;
        }
    }
}

// Função para remover um item da exibição no DOM
function removeItemFromDisplay(nome) {
    const elementoCarrinho = items.querySelector(`[data-name="${nome}"]`);
    if (elementoCarrinho) {
        elementoCarrinho.remove();
    }
}

// Função para atualizar o total do carrinho
function atualizarTotal() {
    const totalCart = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total.textContent = `R$ ${totalCart.toFixed(2)}`;
}

// Adiciona e remove itens do carrinho com um único listener de evento
document.addEventListener("click", (event) => {
    const botaoAdd = event.target.closest(".btn-comprar");
    if (botaoAdd) {
        handleAddToCart(botaoAdd);
    }

    const removeBtn = event.target.closest('.remove-from-cart-btn');
    if (removeBtn) {
        handleRemoveFromCart(removeBtn);
    }
});
