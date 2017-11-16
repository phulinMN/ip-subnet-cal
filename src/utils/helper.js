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
  console.log(ip + ' ' + ans);
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
