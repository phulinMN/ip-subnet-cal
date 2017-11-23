export const plus = (x, y) => x + y;

export const subnet = (n) => {
  var str = "";
  str += "1".repeat(n);
  str += "0".repeat(32-n);
  var num = '';
  var ip = '';
  for(var i = 1; i <= 32; i++) {
    num += str[i-1];
    if((+i)%8 == 0){
      ip += parseInt(+num,2);
      if ((+i) <= 24)
        ip += '.';
      num = '';
    }
  }
  return ip;
}

export const IpToBinary = (ip) => {
  var x = ip.split('.');
  var c = '';
  for(var i = 0; i < 4; i++){
    c += (+x[i]).toString(2);
    if (i != 3)
      c += '.';
  }
  return c;
}

export const NetworkAdd = (str, n) => {
  str = (IpToBinary(str)).split('.');
  var ip = '';
  var ans = '';
  for(var i = 0; i < 4; i++) {
    if(str[i] == '0') {
      ip += '00000000';
    }
    else
      ip += str[i];
  }
  for(var i = 0; i < 32; i++) {
    if(i > n-1)
      ans += '0';
    else
      ans += ip[i];
    if((i+1)%8 == 0 && i <=24)
      ans += '.';
  }
  //console.log(ip + ' ' + ans);
  var net = binaryIpToIp(ans);
  //console.log(net);
  return net;
}

export const binaryIpToIp = (ip) => {
  var str = ip.split('.');
  var ans = '';
  for(var i = 0; i < 4; i++) {
    ans += parseInt((+str[i]), 2);
    if (i != 3)
      ans += '.';
  }
  return ans;
}

export const broadcast = (str, n) => {
  str = (IpToBinary(str)).split('.');
  var ip = '';
  var ans = '';
  for(var i = 0; i < 4; i++) {
    if(str[i] == '0') {
      ip += '00000000';
    }
    else
      ip += str[i];
  }
  for(var i = 0; i < 32; i++) {
    if(i > n-1)
      ans += '1';
    else
      ans += ip[i];
    if((i+1)%8 == 0 && i <=24)
      ans += '.';
  }
  var br = binaryIpToIp(ans);
  return br;
}

export const IpToDecimal = (str) => {
  str = (IpToBinary(str)).split('.');
  var ip = '';
  str.forEach(function(element) {
    if(element.length != 8){
      element = '0'.repeat(8 - element.length) + element;
    }
    ip += element;
  });
  var ans = parseInt(ip,2);
  return ans;
}

export const DecimalToIp = (str) => {
  str = (+str).toString(2);
  //console.log(str);
  var ip = '';
  var ans = '';
  for(var i = 0; i < 32; i++) {
    ip += str[i];
    if(i%8 == 7){
      ans += parseInt(ip, 2);
      ip = '';
      if((+i) <= 23)
        ans += '.';
    }
  }
  return ans;
}

export const BinaryToIp = (str) => {
  var ip = "";
  var num = "";
  for(var i = 0; i < 32; i++) {
      num += str[i];
      if(i%8 == 7) {
        ip += parseInt(num, 2);
        num = "";
        if((+i) <= 23)
          ip += ".";
      }
  }
  return ip;
}

export const usableLengthF = (str, n) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  var num = '';
  var ip = '';
  for(var i = 0; i < n; i++) {
    ip += str[i];
  }
  for(var i = n; i < 32; i++) {
    num += '0';
  }
  num = parseInt(num, 2);
  num += 1;
  num = (+num).toString(2);
  ip += num;
  ip = BinaryToIp(ip);
  return ip;
}

export const usableLengthL = (str, n) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  var num = '';
  var ip = '';
  for(var i = 0; i < n; i++) {
    ip += str[i];
  }
  for(var i = n; i < 32; i++) {
    num += '1';
  }
  num = parseInt(num, 2);
  num -= 1;
  num = (+num).toString(2);
  ip += num;
  ip = BinaryToIp(ip);
  return ip;
}

export const ResultHost = (n) => {
  var num = 2**(32-n);
  return num;
}

export const ResultUsable = (n) => {
  var num = 2**(32-n);
  num -= 2;
  if(num <= 0)
    num = 0;
  //console.log(num);
  return num;
}

export const BinarySubnet = (n) => {
  var str = "";
  var ans = "";
  str += "1".repeat(n);
  str += "0".repeat(32-n);
  for(var i = 0; i < 32; i++) {
    ans += str[i];
    if(i%8 == 7 && i < 24) {
      ans += '.';
    }
  }
  //console.log(ans);
  return ans;
}

export const WildcardMask = (n) => {
  var str = "";
  var ans = "";
  str += "0".repeat(n);
  str += "1".repeat(32-n);
  //console.log(str);
  str = BinaryToIp(str);
  //console.log(str);
  return str;
}


export const BinaryID = (str) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  return str;
}

export const HexID = (str) => {
  str = IpToDecimal(str);
  str = (+str).toString(16);
  return str;
}

export const Short = (str, n) => {
  str = str + '/' + n;
  return str;
}

export const cidr = (n) => {
  n = '/' + n;
  return n;
}

export const classIp = (n) => {
  if(n < 8)
    return "None";
  else if(n < 16)
    return "A";
  else if(n <24)
    return "B";
  else
    return "C";
}

export const IpType = (ip) => {
  ip = ip.split('.');
  if(ip[0] == 10){
    console.log("Private");
    return "Private";
  }
  else if(ip[0] == 172) {
    if(ip[1] >= 16 || ip[1] <= 31){
      console.log("Private");
      return "Private";
    }
  }
  else if(ip[0] == 192) {
    if(ip[1] == 168) {
      console.log("Private");
      return "Private";
    }
  }
  else{
    console.log("Public");
    return "Public";
  }
}
