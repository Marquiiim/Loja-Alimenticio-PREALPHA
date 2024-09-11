// AQUI ESTÃO AS FUNÇÕES E EVENTOS DA ABERTURA E FECHAMENTO DE MODALS

const modal = document.getElementById('cart-modal');
const modalAddress = document.getElementById('address-modal');
const fecharCart = document.getElementById('close-modal-btn');
const finalizarPedido = document.getElementById('checkout-btn');
const fecharEndereço = document.getElementById('close-address-btn');
const ativarCartBtn = document.getElementById('ativar-cart');

// Função para abrir o modal de endereço e fechar o modal do carrinho
function abrirModalEndereco() {
    modalAddress.style.display = "flex";
    modal.style.display = "none";
}

// Função para fechar o modal de endereço
function fecharModalEndereco() {
    modalAddress.style.display = "none";
    modal.style.display = "flex"
}

// Função para abrir o modal do carrinho
function abrirModalCarrinho() {
    modal.style.display = "flex";
}

// Eventos para abrir e fechar modais
finalizarPedido.addEventListener("click", abrirModalEndereco);

modalAddress.addEventListener("click", (event) => {
    if (event.target === modalAddress) {
        fecharModalEndereco();
    }
});

fecharEndereço.addEventListener("click", fecharModalEndereco);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

fecharCart.addEventListener("click", () => {
    modal.style.display = "none";
});

ativarCartBtn.addEventListener("click", abrirModalCarrinho);