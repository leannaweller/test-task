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
