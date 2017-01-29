import {error} from './constants';
import validator from 'validator';
import config from '../config';

const isNotAlpha = (item,name) => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.isAlpha(item,config.locale)){
    return `Invalid ${name}`;
  }
}
const isEmpty = (item,name) => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }
}
const isNotAlphanumeric = (item,name) => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.isAlphanumeric(item,config.locale)){
    return `Invalid ${name}`;
  }
}
const isNotEmail = (item,name='email') => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.isEmail(item)){
    return `Invalid ${name}`;
  }
}
const isNotURL = (item,name='website') => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.iURL(item)){
    return `Invalid ${name}`;
  }
}
const isNotMobilePhone = (item,name='phone') => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.isEmail(item,config.locale)){
    return `Invalid ${name}`;
  }
}
const isNotNumeric = (item,name) => {
  if(validator.isEmpty(item)){
    return `${name} is empty`;
  }else if (!validator.isNotNumeric(item)){
    return `Invalid ${name}`;
  }
}
export function validate(user){
  let hasError=false;
  let userError=error();
  let currentError = isNotAlpha(user.name,"name");
  if(currentError){
    let hasError = true;
    userError.name = currentError;
  }
  currentError = isNotAlphanumeric(user.username,"username");
  if(currentError){
    let hasError = true;
    userError.username = currentError;
  }
  currentError = isNotEmail(user.email);
  if(currentError){
    let hasError = true;
    userError.email = currentError;
  }
  currentError = isNotMobilePhone(user.phone);
  if(currentError){
    let hasError=true;
    userError.phone=currentError;
  }
  currentError = isNotURL(user.website);
  if(currentError){
    let hasError=true;
    userError.website=currentError;
  }
  currentError = isNotAlpha(user.address.street,"street");
  if(currentError){
    hasError = true;
    userError.address.street = currentError;
  }
  currentError = isNotAlphanumeric(user.address.suite,"suite");
  if(currentError){
    hasError = true;
    userError.address.suite = currentError;
  }
  currentError = isNotAlpha(user.address.city,"city");
  if(currentError){
    hasError = true;
    userError.address.city = currentError;
  }
  currentError = isNotNumeric(user.address.zipcode,"zipcode");
  if(currentError){
    hasError = true;
    userError.address.zipcode = currentError;
  }
  currentError = isNotNumeric(user.address.geo.lat,"lat")
  if(currentError){
    hasError=true;
    userError.address.geo.lat=currentError;
  }
  currentError = isNotNumeric(user.address.geo.lng,"lng")
  if(currentError){
    hasError=true;
    userError.address.geo.lng=currentError;
  }
  currentError = isNotAlphanumeric(user.company.cname,"company name");
  if(currentError){
    hasError=true;
    userError.company.cname=currentError;
  }
  currentError = isEmpty(user.company.catchPhrase,"catch phrase");
  if(currentError){
    hasError=true;
    userError.company.catchPhrase=currentError;
  }
  currentError = isEmpty(user.company.bs,"bs");
  if(currentError){
    hasError=true;
    userError.company.bs=currentError;
  }
  if(hasError) return userError;
}
