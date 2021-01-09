const currencies = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"];

const baseList = document.getElementById("base");
const chosenCurrencies = document.getElementById("chosenCurrencies");
const currencyList = document.getElementById("currencies");

currencies.sort().forEach((currency) => {
    baseList.insertAdjacentHTML(
        "beforeend",
        `
    <option value='${currency}'>${currency}</option>`
    );
});

function appendCurrencies(currencies){
    currencies.sort().forEach((currency) => {
        currencyList.insertAdjacentHTML(
            "beforeend",
            `
        <option value='${currency}'>${currency}</option>`
        );
    });
}
appendCurrencies(currencies);


currencyList.onchange = (e) => {
    const value = e.target.value;
    chosenCurrencies.insertAdjacentHTML("beforeend", `
    <span class='currency-btn'>${value},</span>
    `)
}

const form = document.getElementById("input-form");
const success = document.getElementById("success-div");

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const base = formData.get("base");
    const currency = chosenCurrencies.innerText.slice(0, chosenCurrencies.innerText.length-1)

    const url = `https://currency-rates-checker.herokuapp.com/api/rates?base=${base}&currency=${currency}`;

    async function submitData(url){
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        let html = `
        <p><strong>Base: </strong>${data.results.base}</p>
        <p><strong>Date: </strong>${data.results.date}</p>
        <p><strong>Rates: </strong></p>
        `;
        Object.keys(data.results.rates).forEach(rate => {
            html += `
            <p><strong>${rate}: </strong>${data.results.rates[rate]}</p>
            `
        })
        success.innerHTML = "";
        success.innerHTML = html;
    }
    submitData(url).catch(err => console.log(err));
}

