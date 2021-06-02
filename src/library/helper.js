export function numEn(input) {
  if (input == undefined) return;
  var returnModel = "",
    symbolMap = {
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
}
export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
export const isArray = function (a) {
  return Array.isArray(a);
};

export const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

export function isIterable(variable) {
  return isArray(variable) || isObject(variable);
}

export function clone(arr) {
  let newObj = arr instanceof Array ? [] : {};
  for (let i in arr) {
    if (i == "clone") continue;
    if (arr[i] && typeof arr[i] == "object") {
      newObj[i] = clone(arr[i]);
    } else newObj[i] = arr[i];
  }
  return newObj;
}

export function toMoney(amount) {
  if (typeof amount == "undefined" || amount == "null") return "";
  if (amount.length < 2) return amount + "";
  return ("" + amount)
    .replace(/,/g, "")
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export function toggle(collection, item) {
  let temp = clone(collection);
  var idx = temp.indexOf(item);
  if (idx !== -1) {
    temp.splice(idx, 1);
  } else {
    temp.push(item);
  }
  return temp;
}

export function num(txt) {
  let ret = 0;
  if (typeof txt == "string") ret = txt.replace(/[^\d\.]*/g, "");
  else ret = txt;
  return parseInt(ret);
}
export function query(param) {
  let xquery = window.location.search.substring(1);
  let vars = xquery.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == param) {
      return pair[1];
    }
  }
  return false;
}
