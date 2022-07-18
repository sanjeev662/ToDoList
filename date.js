exports.getDate=function(){
    var today=new Date();

  var option={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  return today.toLocaleDateString("en-IN",option)   

};

exports.getDay=function(){
    var today=new Date();

  var option={
    weekday:"long",
  };

  return today.toLocaleDateString("en-IN",option)
};