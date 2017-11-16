import { expect } from 'chai';
import { plus,
  subnet,
  IpToBinary,
  NetworkAdd,
  binaryIpToIp,
  broadcast,
  IpToDecimal
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

describe('test broadcast', () => {
  it('should broadcast number', () => {
    expect(broadcast('255.255.255.0', 24)).to.equal('255.255.255.255');
    expect(broadcast('255.255.255.255', 16)).to.equal('255.255.255.255');
  })
})

describe('test IpToDecimal', () => {
  it('should IpToDecimal number', () => {
    expect(IpToDecimal('255.255.255.255')).to.equal(4294967295);
    expect(IpToDecimal('255.255.255.0')).to.equal(4294967040);
  })
})
