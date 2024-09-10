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
                
                <label for="input2">Nome do Funcionário comunicante:</label>
                <input type="text" id="input2" name="input2" required><br>
                
                <label for="input3">CPF do Funcionário:</label>
                <input type="text" id="input3" name="input3" required><br>
                
                <label for="input4">Nome do Falecido:</label>
                <input type="text" id="input4" name="input4" required><br>
                
                <label for="input5">Nacionalidade do Falecido:</label>
                <input type="text" id="input5" name="input5" required><br>
                
                <label for="input6">Falecido é natural de qual cidade?</label>
                <input type="text" id="input6" name="input6" required><br>
                
                <label for="input7">Estado Civil do Falecido:</label>
                <input type="text" id="input7" name="input7" required><br>
                
                <label for="input8">Data do Nascimento do Falecido:</label>
                <input type="text" id="input8" name="input8" required><br>
                
                <label for="input9">Identidade (nº do doc/órgão) do Falecido:</label>
                <input type="text" id="input9" name="input9" required><br>
                
                <label for="input10">Endereço do Falecido:</label>
                <input type="text" id="input10" name="input10" required><br>
                
                <label for="input11">Data de Entrada no Hospital/Órgão solicitante:</label>
                <input type="text" id="input11" name="input11" required><br>
                
                <label for="input12">Hora de Entrada no Hospital/Órgão solicitante:</label>
                <input type="text" id="input12" name="input12" required><br>
                
                <label for="input13">Número do BAM:</label>
                <input type="text" id="input13" name="input13" required><br>
                
                <label for="input14">Número do Prontuário:</label>
                <input type="text" id="input14" name="input14" required><br>
                
                <label for="input15">Motivo da Morte (em tese):</label>
                <input type="text" id="input15" name="input15" required><br>
                
                <label for="input16">Local da Morte:</label>
                <input type="text" id="input16" name="input16" required><br>
                
                <label for="input17">Primeiro Hospital/Órgão em que o falecido deu entrada:</label>
                <input type="text" id="input17" name="input17" required><br>
                
                <label for="input18">Socorrido por? ("Meios próprios" ou "Nome, Documento (pessoa física)" ou "Ambulância, Identificação da Ambulância"</label>
                <input type="text" id="input18" name="input18" required><br>
                
                <label for="input19">Data da Morte:</label>
                <input type="text" id="input19" name="input19" required><br>
                
                <label for="input20">Horário da Morte:</label>
                <input type="text" id="input20" name="input20" required><br>
                
                <label for="input21">Nome do Médico que atestou a Morte:</label>
                <input type="text" id="input21" name="input21" required><br>
                
                <label for="input22">CRM do Médico que atestou a Morte:</label>
                <input type="text" id="input22" name="input22" required><br>
                
                <label for="input23">Número da Guia:</label>
                <input type="text" id="input23" name="input23" required><br>
                
                <label for="input24">Nome de quem identificou o Falecido:</label>
                <input type="text" id="input24" name="input24" required><br>
                
                <label for="input25">Parentesco entre quem identificou e o Falecido:</label>
                <input type="text" id="input25" name="input25" required><br>
                
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
            text: '{input1}, através do funcionário {input2}, CPF {input3}, comunica o falecimento e solicitação a remoção de: {input4}, {input5}, natural do {input6}, {input7}, nascido em {input8}, identidade {input9}, com residência na {input10}. O falecido deu entrada no {input1} no dia {input11} às {input12} e foi gerado o número do BAM {input13}, prontuário {input14}. A morte, em tese, foi devido a {input15}, no local {input16}. O falecido deu entrada inicialmente no {input17}, através de {input18}. {input4} veio a óbito no dia {input19} às {input20}, atestado pelo médico {input21}, CRM {input22}. Guia {input23}. O cadáver foi identificado por {input24}, {input25} da vítima. Nome: {input1}\nIdade: {input2}',
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
