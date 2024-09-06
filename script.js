document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const optionsSelect = document.getElementById('options');
    const formContainer = document.getElementById('form-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const instructions = document.getElementById('instructions');

    const forms = {
        form1: `
            <form id="form1">
                <label for="input1">Nome:</label>
                <input type="text" id="input1" name="input1" required><br>
                
                <label for="input2">Idade:</label>
                <input type="number" id="input2" name="input2" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form2: `
            <form id="form2">
                <label for="input3">Email:</label>
                <input type="email" id="input3" name="input3" required><br>
                
                <label for="input4">Telefone:</label>
                <input type="tel" id="input4" name="input4" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form3: `
            <form id="form3">
                <label for="input5">Endereço:</label>
                <input type="text" id="input5" name="input5" required><br>
                
                <label for="input6">Cidade:</label>
                <input type="text" id="input6" name="input6" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `
    };

    const resultTemplates = {
        form1: {
            text: 'Nome: {input1}\nIdade: {input2}',
            instructions: 'Observações para o Formulário 1.'
        },
        form2: {
            text: 'Email: {input3}\nTelefone: {input4}',
            instructions: 'Observações para o Formulário 2.'
        },
        form3: {
            text: 'Endereço: {input5}\nCidade: {input6}',
            instructions: 'Observações para o Formulário 3.'
        }
    };

    optionsSelect.addEventListener('change', (event) => {
        const formId = event.target.value;
        formContainer.innerHTML = forms[formId] || '';
        
        if (forms[formId]) {
            const form = document.getElementById(formId);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                let resultTextTemplate = '';
                let resultInstructions = '';

                if (resultTemplates[formId]) {
                    resultTextTemplate = resultTemplates[formId].text;
                    resultInstructions = resultTemplates[formId].instructions;
                }

                let result = resultTextTemplate;
                for (const [key, value] of Object.entries(data)) {
                    result = result.replace(`{${key}}`, value);
                }

                resultText.textContent = result;
                instructions.textContent = resultInstructions;
                resultContainer.style.display = 'block';
            });
        } else {
            resultContainer.style.display = 'none';
        }
    });
});
