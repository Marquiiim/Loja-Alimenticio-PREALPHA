document.addEventListener('DOMContentLoaded', () => {
    const addAddressBtn = document.getElementById('add-address');
    const addressForm = document.getElementById('address-form');
    const saveAddressBtn = document.getElementById('save-address-btn');
    const cartAddress = document.getElementById('cart-address');
    const message = document.getElementById('message');
    const cepInput = document.getElementById('zip');
    const addressInput = document.getElementById('address');
    const streetInput = document.getElementById('street');
    const cityInput = document.getElementById('city');

    // Exibe mensagens de erro
    const showMessage = (text) => {
        message.textContent = text;
        message.style.display = 'flex';
        setTimeout(() => {
            message.textContent = '';
            message.style.display = 'none';
        }, 5000);
    };

    // Preenche o formulário com dados do CEP
    const fetchAddressByCep = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro na busca do CEP');
            const data = await response.json();
            if (data.erro) throw new Error('CEP não encontrado');
            addressInput.value = data.logradouro;
            streetInput.value = data.bairro;
            cityInput.value = data.localidade;
            message.style.display = 'none'; // Oculta mensagem de erro se tudo estiver correto
        } catch (error) {
            showMessage(error.message);
        }
    };

    // Manipula o evento de perda de foco no campo de CEP
    cepInput.addEventListener('focusout', () => {
        const cep = cepInput.value.trim();
        const isValidCep = /^[0-9]{8}$/.test(cep);
        if (isValidCep) {
            fetchAddressByCep(cep);
        } else {
            showMessage('CEP inválido');
        }
    });

    // Exibe o formulário de endereço
    const showAddressForm = () => {
        addAddressBtn.style.display = 'none';
        addressForm.style.display = 'block';
    };

    // Salva e exibe o endereço
    const saveAddress = () => {
        const street = streetInput.value.trim();
        const city = cityInput.value.trim();
        const zip = cepInput.value.trim();

        // Verifica se todos os campos estão preenchidos
        if (!street || !city || !zip) {
            showMessage('Todos os campos devem ser preenchidos');
            return;
        }

        // Cria e exibe a nova div com o endereço
        const addressDiv = document.createElement('div');
        addressDiv.classList.add('saved-address');
        addressDiv.innerHTML = `
            <p><strong>Rua:</strong> ${street}</p>
            <p><strong>Cidade:</strong> ${city}</p>
            <p><strong>CEP:</strong> ${zip}</p>
        `;
        cartAddress.innerHTML = ''; // Limpa endereços antigos
        cartAddress.appendChild(addressDiv);

        // Esconde o formulário e exibe o botão de adicionar
        addressForm.style.display = 'none';
        addAddressBtn.style.display = 'block';
    };

    // Adiciona os manipuladores de eventos
    addAddressBtn.addEventListener('click', showAddressForm);
    saveAddressBtn.addEventListener('click', saveAddress);
});

