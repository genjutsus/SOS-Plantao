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
                <label for="input1">Nome do Hospital/Órgão solicitante:</label>
                <input type="text" id="input1" name="input1" required><br>
                
                <label for="input2">Nome do Funcionário comunicante:</label>
                <input type="number" id="input2" name="input2" required><br>
                
                <label for="input3">CPF do Funcionário:</label>
                <input type="number" id="input3" name="input3" required><br>
                
                <label for="input4">Nome do Falecido:</label>
                <input type="number" id="input4" name="input4" required><br>
                
                <label for="input5">Nacionalidade do Falecido:</label>
                <input type="number" id="input5" name="input5" required><br>
                
                <label for="input6">Falecido é natural de qual cidade?</label>
                <input type="number" id="input6" name="input6" required><br>
                
                <label for="input7">Estado Civil do Falecido:</label>
                <input type="number" id="input7" name="input7" required><br>
                
                <label for="input8">Data do Nascimento do Falecido:</label>
                <input type="number" id="input8" name="input8" required><br>
                
                <label for="input9">Identidade (nº do doc/órgão) do Falecido:</label>
                <input type="number" id="input9" name="input9" required><br>
                
                <label for="input10">Endereço do Falecido:</label>
                <input type="number" id="input10" name="input10" required><br>
                
                <label for="input11">Data de Entrada no Hospital/Órgão solicitante:</label>
                <input type="number" id="input11" name="input11" required><br>
                
                <label for="input12">Hora de Entrada no Hospital/Órgão solicitante:</label>
                <input type="number" id="input12" name="input12" required><br>
                
                <label for="input13">Número do BAM:</label>
                <input type="number" id="input13" name="input13" required><br>
                
                <label for="input14">Número do Prontuário:</label>
                <input type="number" id="input14" name="input14" required><br>
                
                <label for="input15">Motivo da Morte (em tese):</label>
                <input type="number" id="input15" name="input15" required><br>
                
                <label for="input16">Local da Morte:</label>
                <input type="number" id="input16" name="input16" required><br>
                
                <label for="input17">Primeiro Hospital/Órgão em que o falecido deu entrada:</label>
                <input type="number" id="input17" name="input17" required><br>
                
                <label for="input18">Socorrido por? ("Meios próprios" ou "Nome, Documento (pessoa física)" ou "Ambulância, Identificação da Ambulância"</label>
                <input type="number" id="input18" name="input18" required><br>
                
                <label for="input19">Data da Morte:</label>
                <input type="number" id="input19" name="input19" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form2: `
            <form id="form2">
                <label for="input26">Email:</label>
                <input type="email" id="input26" name="input26" required><br>
                
                <label for="input27">Telefone:</label>
                <input type="tel" id="input27" name="input27" required><br>
                
                <input type="submit" value="Enviar">
            </form>
        `,
        form3: `
            <form id="form3">
                <label for="input28">Endereço:</label>
                <input type="text" id="input28" name="input28" required><br>
                
                <label for="input28">Cidade:</label>
                <input type="text" id="input29" name="input29" required><br>
                
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
