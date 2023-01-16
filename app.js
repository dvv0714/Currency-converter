
const key = `ff7e7d06a91e8d14e1901ec2`;

const dropList = document.querySelectorAll('.drop-list select');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const getBtn = document.querySelector('form button');


dropList.forEach((item, ind) => {
   for (currency_code in country_list) {
      let selected;
      if (ind === 0) {
         selected = currency_code === 'USD' ? 'selected' : '';
      } else if (ind === 1) {
         selected = currency_code === 'UAH' ? 'selected' : '';
      }
      let optionTag = `<option value="${currency_code}" ${selected} >${currency_code}</option>`;
      dropList[ind].insertAdjacentHTML('beforeend', optionTag);
   }

   dropList[ind].addEventListener('change', (e) => {
      loadFlag(e.target);
   });
})

function loadFlag(element) {
   for (code in country_list) {
      if (code === element.value) {
         let imgTag = element.parentElement.querySelector('img');
         imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
      }
   }
}

window.addEventListener('load', () => {
   getExchangeRate();
})

getBtn.addEventListener('click', (e) => {
   e.preventDefault();
   getExchangeRate();
})

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click', () => {
   let tempCode = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = tempCode;

   loadFlag(fromCurrency);
   loadFlag(toCurrency);
   getExchangeRate();
});


function getExchangeRate() {
   const amount = document.querySelector('.amount input');
   const exchangeRatetxt = document.querySelector('.exchange-rate');
   let amountVal = amount.value;

   if (amountVal === '' || amountVal === '0') {
      amount.value = '1';
      amountVal = 1;
   }

   exchangeRatetxt.textContent = 'Getting exchange rate...';
   let url = `https://v6.exchangerate-api.com/v6/${key}/latest/${fromCurrency.value}`;

   fetch(url)
      .then((response) => response.json()).then((data) => {
         // console.log(data);
         let exchangeRate = data.conversion_rates[toCurrency.value];
         let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
         exchangeRatetxt.textContent = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
      }).catch(() => {
         exchangeRatetxt.textContent = `Somthing went wrong`;
      })
}