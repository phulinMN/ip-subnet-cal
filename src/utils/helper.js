export const plus = (x, y) => x + y;

export const subnet = (n) => {
  var str = "";
  str += "1".repeat(n);
  str += "0".repeat(32-n);
  var num = '';
  var ip = '';
  for(var i = 1; i <= 32; i++) {
    num += str[i-1];
    if((+i)%8 === 0){
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
    if (i !== 3)
      c += '.';
  }
  return c;
}

export const NetworkAdd = (str, n) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  var ip = "";
  for(var i = 0; i < n; i++) {
    ip += str[i];
  }
  for(var i = n; i < 32; i++) {
    ip += '0';
  }
  ip = BinaryToIp(ip);
  return ip;
}

export const binaryIpToIp = (ip) => {
  var str = ip.split('.');
  var ans = '';
  for(var i = 0; i < 4; i++) {
    ans += parseInt((+str[i]), 2);
    if (i !== 3)
      ans += '.';
  }
  return ans;
}

export const broadcast = (str, n) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  var ip = "";
  for(var i = 0; i < n; i++) {
    ip += str[i];
  }
  for(var i = n; i < 32; i++) {
    ip += '1';
  }
  ip = BinaryToIp(ip);
  return ip;
}

export const IpToDecimal = (str) => {
  str = (IpToBinary(str)).split('.');
  var ip = '';
  str.forEach(function(element) {
    if(element.length !== 8){
      element = '0'.repeat(8 - element.length) + element;
    }
    ip += element;
  });
  var ans = parseInt(ip,2);
  return ans;
}

export const DecimalToIp = (str) => {
  str = (+str).toString(2);
  var ip = '';
  var ans = '';
  for(var i = 0; i < 32; i++) {
    ip += str[i];
    if(i%8 === 7){
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
      if(i%8 === 7) {
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
  if(n >= 31){
    return '0';
  }
  else {
    for(var i = 0; i < n; i++) {
      ip += str[i];
    }
    for(var i = n; i < 32; i++) {
      num += '0';
    }
    num = parseInt(num, 2);
    num += 1;
    num = (+num).toString(2);
    if(num.length !== (32-n)){
      num = "0".repeat(32-n-num.length) + num;
    }
    ip += num;
    ip = BinaryToIp(ip);
    return ip;
  }
}

export const usableLengthL = (str, n) => {
  str = IpToDecimal(str);
  str = (+str).toString(2);
  var num = '';
  var ip = '';
  if(n >= 31) {
    return '0';
  }
  else {
    for(var i = 0; i < n; i++) {
      ip += str[i];
    }
    for(var i = n; i < 32; i++) {
      num += '1';
    }
    //console.log(ip);
    num = parseInt(num, 2);
    num -= 1;
    num = (+num).toString(2);
    //console.log(num + " " + num.length);
    ip += num;
    //console.log(ip + " " + ip.length);
    ip = BinaryToIp(ip);
    return ip;
  }
}

export const usableLength = (str, n) => {
  var a = usableLengthF(str,n);
  var b = usableLengthL(str,n);
  //console.log(a + " - " + b);
  if(n >= 31) {
    // console.log("None");
    return "None";
  }
  else {
    // console.log(a + " - " + b);
    return a + " - " + b;
  }
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
    if(i%8 === 7 && i < 24) {
      ans += '.';
    }
  }
  return ans;
}

export const WildcardMask = (n) => {
  var str = "";
  str += "0".repeat(n);
  str += "1".repeat(32-n);
  str = BinaryToIp(str);
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

export const classSubnet = (c) => {
  var ans = [];
  if(c === 'A') {
    for (var i = 32; i >= 8; i--) {
      ans.push(subnet(i));
    }
  }
  if(c === 'B') {
    for (var i = 32; i >= 16; i--) {
      ans.push(subnet(i));
    }
  }
  if(c === 'C') {
    for (var i = 32; i >= 24; i--) {
      ans.push(subnet(i));
    }
  }
  if(c === "Any") {
    for (var i = 32; i >= 1; i--) {
      ans.push(subnet(i));
    }
  }
  return ans;
}

export const IpType = (ip) => {
  ip = ip.split('.');
  if(ip[0] === "10"){
    return "Private";
  }
  else if(ip[0] === "172") {
    if(parseInt(ip[1], 2) >= 16 || parseInt(ip[1], 2) <= 31){
      return "Private";
    }
  }
  else if(ip[0] === "192") {
    if(ip[1] === "168") {
      return "Private";
    }
  }
  else{
    return "Public";
  }
}

export const genBit = (str, n) => {
  var ans = "";
  for (var i = 0; i < n; i++ ) {
    ans += str[i];
  }
  for(var i = n; i < 32; i++) {
    ans += '0';
  }
  return ans;
}

export const AllPossibleNetAdd = (ip, n) => {
  var net = [];
  var i = 0;
  var r = 0;
  if(n >= 24){
    var a = genBit((+IpToDecimal(ip)).toString(2), 24);
    a = parseInt(a, 2);
    for(var i = 0; r < 256; i++) {
      console.log(r);
      net.push(DecimalToIp(r+a));
      console.log((net[i]));
      r = (i+1)*2**(32-n);
    }
    console.log(net);
  }
  // if(n >= 16){
    
  // }
  // if(n >= 8){
    
  // }
  return net;
}
