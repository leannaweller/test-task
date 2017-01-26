  export function error(){
    return {
      name:'',
      username:'',
      email:'',
      address:{
        street:'',
        suite:'',
        city:'',
        zipcode:'',
        geo:{
          lat:'',
          lng:''
        },
      },
      phone:'',
      website:'',
      company:{
        name:'',
        catchPhrase:'',
        bs:''
      }
    }
  }
export function countDistance(geo1, geo2, miles = true)
{
    let lat1=geo1.lat;
    let lng1=geo1.lng;
    let lat2=geo2.lat;
    let lng2=geo2.lng;
    let pi80 = Math.PI / 180;
    lat1 *= pi80;
    lng1 *= pi80;
    lat2 *= pi80;
    lng2 *= pi80;

    let r = 6372.797; // mean radius of Earth in km
    let dlat = lat2 - lat1;
    let dlng = lng2 - lng1;
    let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) * Math.sin(dlng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let km = r * c;

    return (miles ? (km * 0.621371192) : km);
}
export function filterBy(filter,array){
  return  array.filter(item=>{
    let same=false;
    Object.keys(item).forEach(function (key) {
      if (item.hasOwnProperty(key)) {
        let prop=item[key];
        if(typeof prop === 'object'){
          Object.keys(prop).forEach(function (k) {
            if(typeof prop[k] !== 'object'){
              if(prop[k].toString().indexOf(filter)!==-1){
                same=true;
              }
            }
          });
        }else{
          if(prop.toString().indexOf(filter)!==-1){
            same=true;
          }
        }
      }
    });
    return same;
  });
}
export function compare(a,b){
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  // a должно быть равным b
  return 0;
}
export function validate(user){
  let hasError=false;
  let userError=error();
  if(user.name.length===0){
    hasError=true;
    userError.name='Invalid name';
  }
  if(user.username.length===0){
    hasError=true;
    userError.username='Invalid username';
  }
  if(user.email.length===0){
    hasError=true;
    userError.email='Invalid email';
  }
  if(user.address.street.length===0){
    hasError=true;
    userError.address.street='Invalid street';
  }
  if(user.address.suite.length===0){
    hasError=true;
    userError.address.suite='Invalid suite';
  }
  if(user.address.city.length===0){
    hasError=true;
    userError.address.city='Invalid city';
  }
  if(user.address.zipcode.length===0){
    hasError=true;
    userError.address.zipcode='Invalid zipcode';
  }
  if(user.address.geo.lat.length===0){
    hasError=true;
    userError.address.geo.lat='Invalid lat';
  }
  if(user.address.geo.lng.length===0){
    hasError=true;
    userError.address.geo.lng='Invalid lng';
  }
  if(user.phone.length===0){
    hasError=true;
    userError.phone='Invalid phone';
  }
  if(user.website.length===0){
    hasError=true;
    userError.website='Invalid website';
  }
  if(user.company.name.length===0){
    hasError=true;
    userError.company.name='Invalid company name';
  }
  if(user.company.catchPhrase.length===0){
    hasError=true;
    userError.company.catchPhrase='Invalid catch phrase';
  }
  if(user.company.bs.length===0){
    hasError=true;
    userError.company.bs='Invalid catch BS';
  }
  if(hasError) return userError;
}
