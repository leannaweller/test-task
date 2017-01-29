import _ from 'lodash';
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
    Object.keys(item).forEach( (key) => {
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
  return 0;
}
export function sortAndFilter(data,filter,order){
  if(filter){
    console.log(`FILTER ${filter}`);
    data=filterBy(this.state.filter,data);
  }
  console.log(data);
  if(order){
    console.log('SORT CONTACTS');
    if(order>0){
      data = data.sort((a,b)=>{
        return compare(a,b);
      });
    }else{
      data = data.sort((a,b)=>{
        return compare(b,a);
      });
    }
  }
  console.log(data)
  return data;
}
export function mergeArrays(arr1,arr2){
  if(arr1){
    if(arr2){
      arr1 = arr1.concat(arr2);
    }
    return arr1;
  }else if(arr2){
    return arr2;
  }
}
