const moedas = [
    'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BND', 'BOB',
    'BRL', 'BRLT', 'BSD', 'BTC', 'BWP', 'BYN', 'BZD', 'CAD', 'CHF', 'CHFRTS', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CUP', 'CVE',
    'CZK', 'DJF', 'DKK', 'DOGE', 'DOP', 'DZD', 'EGP', 'ETB', 'ETH', 'EUR', 'FJD', 'GBP', 'GEL', 'GHS', 'GMD', 'GNF', 'GTQ',
    'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'JPYRTS', 'KES', 'KGS',
    'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LSL', 'LTC', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK',
    'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NGNI', 'NGNPARALLEL', 'NIO', 'NOK', 'NPR',
    'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RUBTOD', 'RUBTOM', 'RWF', 'SAR',
    'SCR', 'SDG', 'SDR', 'SEK', 'SGD', 'SOS', 'STD', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TRY', 'TTD', 'TWD',
    'TZS', 'UAH', 'UGX', 'USD', 'USDT', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'XAF', 'XAGG', 'XBR', 'XCD', 'XOF', 'XPF', 'XRP',
    'YER', 'ZAR', 'ZMK', 'ZWL', 'XAU'
];

let selectTag = document.querySelector('#campo-moeda-1')
let selectTag2 = document.querySelector('#campo-moeda-2')

moedas.map((moeda)=>{
    let optionTag = document.createElement('option')
    optionTag.value = moeda
    optionTag.innerText = `${moeda}`

    let optionTag2 = optionTag.cloneNode(true)
    selectTag.appendChild(optionTag)
    selectTag2.appendChild(optionTag2)
})

function convert() {
    let valorDigitado = document.querySelector('#quantia-digitada').value

    if(valorDigitado.length == 0) {alert('Digite um Valor no campo')}
    else{
        let moeda1 = document.querySelector('#campo-moeda-1').value
        let moeda2 = document.querySelector('#campo-moeda-2').value
        
        buscaValor(moeda1, moeda2)
    }
}

function buscaValor(moeda1, moeda2){

    fetch(`https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`)
    .then((response)=>{
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then((data)=>{
        const cotacao = data[`${moeda1}${moeda2}`];
        let valorConversao = cotacao.bid
        
        let numDigitado = document.querySelector('#quantia-digitada').value

        let valorConvertido = Number(valorConversao) * Number(numDigitado)

        let campo = document.querySelector('#valor')
        let nome = document.querySelector('#nome-moeda')
        let img = document.querySelector('#img')

        nome.innerHTML = `${cotacao.code}`
        campo.innerHTML = `$${numDigitado}`

        let novaMoeda1 = cotacao.code.slice(0, -1);
        novaMoeda1 = novaMoeda1.toLowerCase()
        img.src = `https://flagcdn.com/48x36/${novaMoeda1}.png`
        
        let campo1 = document.querySelector('#valor1')
        let nome1 = document.querySelector('#nome-moeda1')
        let img1 = document.querySelector('#img1')

        nome1.innerHTML = `${cotacao.codein}`
        campo1.innerHTML = `$${valorConvertido.toFixed(2)}`

        let novaMoeda = cotacao.codein.slice(0, -1);
        novaMoeda = novaMoeda.toLowerCase()
        img1.src = `https://flagcdn.com/48x36/${novaMoeda}.png`
    })
    .catch((e)=>{
        alert(e)
    })
}