const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdwon = document.querySelectorAll(".dropdwon select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//this loop is imp.. to understand 
// for (code in countryList){
//     console.log(code, countryList[code]);

// }
// let i =0;
// iss  se sare ki sare countary ke naam (list) me add ho jainge 
for(let select of dropdwon ){
    for (currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name === "from" && currcode === "USD"){
        newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);

    }
    //now we can remove the 4-5 name that are written in html

    select.addEventListener("change" , (evt) =>{
        updateflag(evt.target);
    });


}

const updateflag = (element) => {
       let currcode = element.value;
       let countrycode = countryList[currcode];
       let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
       let img = element.parentElement.querySelector("img");
       img.src = newsrc;

};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    // console.log(amtval);
    if(amtval === ""  || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }

    //must to do this 54 line tat hoe the api are working
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //to acess this from and to curr uper line me add kro 
    let response = await fetch(URL);
    let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    // console.log(amount);
    let finalAmount = amtval * rate; 
    // msg.innerText = `1USD = 80INR` want t write like this 
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});



