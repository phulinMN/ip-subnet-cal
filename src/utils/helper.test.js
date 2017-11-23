import { expect } from 'chai';
import { plus,
  subnet,
  IpToBinary,
  NetworkAdd,
  binaryIpToIp,
  broadcast,
  IpToDecimal,
  DecimalToIp,
  BinaryToIp,
  usableLengthF,
  usableLengthL,
  ResultHost,
  ResultUsable,
  BinarySubnet,
  WildcardMask,
  BinaryID,
  HexID,
  Short,
  classIp,
  cidr,
  IpType
} from './helper';

describe('test plus', () => {
  it('should plus number', () => {
    expect(plus(1, 2)).to.equal(3);
    expect(plus(0, 2)).to.equal(2);
  })
})

describe('test subnet', () => {
  it('should subnet number', () => {
    expect(subnet(1)).to.equal('128.0.0.0');
    expect(subnet(32)).to.equal('255.255.255.255');
  })
})

describe('test IpToBinary', () => {
  it('should IpToBinary number', () => {
    expect(IpToBinary('255.255.255.255')).to.equal('11111111.11111111.11111111.11111111');
    expect(IpToBinary('128.128.128.128')).to.equal('10000000.10000000.10000000.10000000');
  })
})

describe('test NetworkAdd', () => {
  it('should NetworkAdd number', () => {
    expect(NetworkAdd('255.255.255.0', 24)).to.equal('255.255.255.0');
    expect(NetworkAdd('255.255.255.255', 16)).to.equal('255.255.0.0');
  })
})

describe('test binaryIpToIp', () => {
  it('should binaryIpToIp number', () => {
    expect(binaryIpToIp('11111111.11111111.11111111.11111111')).to.equal('255.255.255.255');
    expect(binaryIpToIp('10000000.10000000.10000000.10000000')).to.equal('128.128.128.128');
  })
})

describe('test BinaryToIp', () => {
  it('should BinaryToIp number', () => {
    expect(BinaryToIp('11111111111111111111111111111111')).to.equal('255.255.255.255');
    expect(BinaryToIp('10000000100000001000000010000000')).to.equal('128.128.128.128');
  })
})

describe('test broadcast', () => {
  it('should broadcast number', () => {
    expect(broadcast('255.255.255.0', 24)).to.equal('255.255.255.255');
    expect(broadcast('255.255.255.255', 16)).to.equal('255.255.255.255');
  })
})

describe('test IpToDecimal', () => {
  it('should IpToDecimal number', () => {
    expect(IpToDecimal('255.255.255.0')).to.equal(4294967040);
    expect(IpToDecimal('255.255.255.255')).to.equal(4294967295);
  })
})

describe('test DecimalToIp', () => {
  it('should DecimalToIp number', () => {
    expect(DecimalToIp(4294967040)).to.equal('255.255.255.0');
    expect(DecimalToIp(4294967295)).to.equal('255.255.255.255');
  })
})

describe('test usableLengthF', () => {
  it('should usableLengthF number', () => {
    expect(usableLengthF('255.255.255.0', 24)).to.equal('255.255.255.1');
    expect(usableLengthF('158.108.12.34', 24)).to.equal('158.108.12.1');
  })
})

describe('test usableLengthL', () => {
  it('should usableLengthL number', () => {
    expect(usableLengthL('255.255.255.0', 24)).to.equal('255.255.255.254');
    expect(usableLengthL('158.108.12.34', 24)).to.equal('158.108.12.254');
  })
})

describe('test ResultHost', () => {
  it('should ResultHost number', () => {
    expect(ResultHost(24)).to.equal(256);
    expect(ResultHost(29)).to.equal(8);
  })
})

describe('test ResultUsable', () => {
  it('should ResultUsable number', () => {
    expect(ResultUsable(32)).to.equal(0);
    expect(ResultUsable(29)).to.equal(6);
  })
})

describe('test WildcardMask', () => {
  it('should WildcardMask number', () => {
    expect(WildcardMask(16)).to.equal("0.0.255.255");
    expect(WildcardMask(18)).to.equal("0.0.63.255");
  })
})

describe('test BinarySubnet', () => {
  it('should BinarySubnet number', () => {
    expect(BinarySubnet(8)).to.equal("11111111.00000000.00000000.00000000");
    expect(BinarySubnet(32)).to.equal("11111111.11111111.11111111.11111111");
    expect(BinarySubnet(9)).to.equal("11111111.10000000.00000000.00000000");
  })
})

describe('test BinaryID', () => {
  it('should BinaryID number', () => {
    expect(BinaryID("158.108.12.255")).to.equal("10011110011011000000110011111111");
    expect(BinaryID("255.255.255.255")).to.equal("11111111111111111111111111111111");
  })
})

describe('test HexID', () => {
  it('should HexID number', () => {
    expect(HexID("158.108.12.255")).to.equal("9e6c0cff");
    expect(HexID("255.255.255.255")).to.equal("ffffffff");
  })
})

describe('test Short', () => {
  it('should Short number', () => {
    expect(Short("158.108.12.255", 24)).to.equal("158.108.12.255/24");
    expect(Short("255.255.255.255", 5)).to.equal("255.255.255.255/5");
  })
})

describe('test classIp', () => {
  it('should classIp number', () => {
    expect(classIp(24)).to.equal("C");
    expect(classIp(5)).to.equal("None");
  })
})

describe('test cidr', () => {
  it('should cidr number', () => {
    expect(cidr(24)).to.equal("/24");
    expect(cidr(5)).to.equal("/5");
  })
})

describe('test IpType', () => {
  it('should IpType number', () => {
    expect(IpType("10.0.0.0")).to.equal("Private");
    expect(IpType("11.0.0.0")).to.equal("Public");
  })
})
