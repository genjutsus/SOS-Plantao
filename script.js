document.addEventListener('DOMContentLoaded', () => {
    const optionsSelect = document.getElementById('options');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const instructions = document.getElementById('instructions');

    const forms = {
        form1: `
            <form id="form1">
                <label for="input1">Nome do Hospital/Órgão solicitante:</label>
                <input type="text" id="input1" name="input1" required><br>
                <!-- Adicione os outros campos conforme necessário -->
                <input type="submit" value="Enviar">
            </form>
        `,
        form2: `
            <form id="form2">
                <label for="input26">Email:</label>
                <input type="email" id="input26" name="input26" required><br>
                <!-- Adicione os outros campos conforme necessário -->
                <input type="submit" value="Enviar">
            </form>
        `,
        form3: `
            <form id="form3">
                <label for="input28">Endereço:</label>
                <input type="text" id="input28" name="input28" required><br>
                <!-- Adicione os outros campos conforme necessário -->
                <input type="submit" value="Enviar">
            </form>
        `
    };

    const resultTemplates = {
        form1: {
            text: '{input1}, através do funcionário {input2}, CPF {input3}, comunica o falecimento e solicitação a remoção de: {input4}.',
            instructions: 'Observações para o Formulário 1.'
        },
        form2: {
            text: 'Email: {input26}\nTelefone: {input27}',
            instructions: 'Observações para o Formulário 2.'
        },
        form3: {
            text: 'Endereço: {input28}\nCidade: {input29}',
            instructions: 'Observações para o Formulário 3.'
        }
    };

    optionsSelect.addEventListener('change', (event) => {
        const formId = event.target.value;
        formContainer.innerHTML = forms[formId] || '';
        
        if (forms[formId]) {
            const form = document.getElementById(formId);
            // Remove event listeners anteriores se existirem
            form.removeEventListener('submit', handleSubmit);
            form.addEventListener('submit', handleSubmit);
        } else {
            resultContainer.style.display = 'none';
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const formId = form.id;
        let resultTextTemplate = '';
        let resultInstructions = '';

        if (resultTemplates[formId]) {
            resultTextTemplate = resultTemplates[formId].text;
            resultInstructions = resultTemplates[formId].instructions;
        }

        let result = resultTextTemplate;
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{${key}}`, 'g'); // Cria uma expressão regular global
            result = result.replace(regex, value); // Substitui todas as ocorrências
        }

        resultText.textContent = result;
        instructions.textContent = resultInstructions;
        resultContainer.style.display = 'block';
    }
});
