import axios from 'axios';
export function saveToLocalStorage(data,itemName){
  let array;
  localStorage.getItem(itemName) ?
  array = JSON.parse(localStorage.getItem(itemName))
  :
  array = []
  array.push(data);
  localStorage.setItem("itemName", JSON.stringify(array));
}
export function getDataFromURL(url){
  console.log('GET DATA');
  return axios.get(url);
}
export function getDataFromLocalStorage(itemName){
  if (localStorage.getItem(itemName)){
    return JSON.parse(localStorage.getItem(itemName));
  }else{
    return null;
  }
}
