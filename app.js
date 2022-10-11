require("dotenv").config();
// total people count
const count = process.env["ppl"];
const total = process.env["total"];
const montlyPrice = total / 12;
// main process
function main() {
  const personMap = initStartMap();
  const resultMap = initPriceMap();
  const processArray = initProcessArray(personMap);
  processArray.forEach((ary) => {
    let pplCount = ary.length;
    let splitPrice = (montlyPrice / pplCount).toFixed(0);
    ary.forEach((ppl) => {
      let temp = resultMap.get(ppl);
      resultMap.set(ppl, Number(temp) + Number(splitPrice));
    });
  });

  resultMap.forEach((value,key)=>{
    console.log(`第${key}位應付為:${value}`)
  })
}

// init start month map
function initPriceMap() {
  const priceMap = new Map();
  for (let i = 1; i <= count; i++) {
    priceMap.set(i, 0);
  }
  return priceMap;
}

// init start month map
function initStartMap() {
  const monthMap = new Map();
  for (let i = 1; i <= count; i++) {
    let result = process.env[`p${i}`];
    if (isEmptyOrSpaces(result)) {
      throw Error(`Empty vlaue on no.${i} person`);
    }
    monthMap.set(i, result);
  }
  return monthMap;
}

// calculate how many people each month
function initProcessArray(personMap) {
  let recordArray = [];
  for (let i = 1; i <= 12; i++) {
    let tempArray = [];
    personMap.forEach((value, key) => {
      if (value <= i) {
        tempArray.push(key);
      }
    });
    recordArray.push(tempArray);
  }
  return recordArray;
}

// month : count map

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

main();
