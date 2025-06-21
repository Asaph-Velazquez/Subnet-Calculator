function calcularSubred(ip, mask, subnetMask) {
  // Helper function to sanitize binary strings
  function sanitizeBinary(binary) {
    if (typeof binary !== 'string') {
      console.warn(`Invalid binary input: ${binary}`);
      return '00000000.00000000.00000000.00000000';
    }
    // If binary has no dots, reformat it
    if (!binary.includes('.')) {
      binary = binary.padStart(32, '0');
      return [
        binary.substring(0, 8),
        binary.substring(8, 16),
        binary.substring(16, 24),
        binary.substring(24, 32)
      ].join('.');
    }
    return binary;
  }

  // Validate IP address
  const ipParts = ip.split('.').map(Number);
  if (
    ipParts.length !== 4 ||
    ipParts.some((part) => isNaN(part) || part < 0 || part > 255) ||
    ipParts.some((part) => part === '' || ip.split('.').includes(''))
  ) {
    console.error('Invalid IP address:', ip);
    return { error: 'Dirección IP no válida' };
  }

  // Validate mask
  if (isNaN(mask) || mask < 1 || mask > 32) {
    console.error('Invalid mask:', mask);
    return { error: 'Máscara de red no válida.' };
  }

  // Convert IP to integer
  const ipInt = ipParts.reduce((acc, part) => (acc << 8) | part, 0) >>> 0;
  const networkMask = (-1 << (32 - mask)) >>> 0;

  // Calculate network and broadcast
  const networkInt = ipInt & networkMask;
  const broadcastInt = networkInt | (~networkMask >>> 0);

  // Calculate hosts for the original IP
  const originalBroadcast = intToIp(broadcastInt);
  const originalHostMin = mask === 32 ? ip : mask === 31 ? intToIp(networkInt) : intToIp(networkInt + 1);
  const originalHostMax = mask === 32 ? ip : mask === 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1);
  const totalHostsOriginal = mask === 31 ? 2 : mask === 32 ? 1 : Math.pow(2, 32 - mask) - 2;

  const tipo = getIpClass(ipParts[0]);
  const wildcard = intToIp(~networkMask >>> 0);

  // Generate binary representations
  const originalIpBinary = intToBinary(ipInt);
  const maskBinary = intToBinary(networkMask);
  const wildcardBinary = intToBinary(~networkMask >>> 0);
  const originalNetworkBinary = intToBinary(networkInt);
  const originalBroadcastBinary = intToBinary(broadcastInt);
  const originalHostMinBinary = mask === 32 ? originalIpBinary : mask === 31 ? intToBinary(networkInt) : intToBinary(networkInt + 1);
  const originalHostMaxBinary = mask === 32 ? originalIpBinary : mask === 31 ? intToBinary(broadcastInt) : intToBinary(broadcastInt - 1);

  // Debug logs to verify binary output
  console.log(`Original IP Binary: ${originalIpBinary}`);
  console.log(`Mask Binary: ${maskBinary}`);
  console.log(`Wildcard Binary: ${wildcardBinary}`);
  console.log(`Network Binary: ${originalNetworkBinary}`);
  console.log(`Broadcast Binary: ${originalBroadcastBinary}`);
  console.log(`HostMin Binary: ${originalHostMinBinary}`);
  console.log(`HostMax Binary: ${originalHostMaxBinary}`);

  if (mask === 31) {
    return {
      originalIp: ip,
      originalIpBinary,
      mask: mask,
      maskDecimal: intToIp(networkMask),
      maskBinary,
      wildcard,
      wildcardBinary,
      originalNetwork: intToIp(networkInt),
      originalNetworkBinary,
      originalBroadcast,
      originalBroadcastBinary,
      originalHostMin,
      originalHostMinBinary,
      originalHostMax,
      originalHostMaxBinary,
      totalHostsOriginal,
      tipo,
    };
  }

  if (mask === 32) {
    const result = {
      originalIp: ip,
      originalIpBinary,
      mask: mask,
      maskDecimal: intToIp(networkMask),
      maskBinary,
      wildcard,
      wildcardBinary,
      originalNetwork: ip,
      originalNetworkBinary,
      originalBroadcast: ip,
      originalBroadcastBinary,
      originalHostMin: ip,
      originalHostMinBinary,
      originalHostMax: ip,
      originalHostMaxBinary,
      totalHostsOriginal: 1,
      tipo,
    };

    if (subnetMask) {
      if (isNaN(subnetMask) || subnetMask < mask || subnetMask > 32) {
        console.error('Invalid subnet mask:', subnetMask);
        return { error: 'Máscara de subred no válida' };
      }
      const subnetMaskInt = (-1 << (32 - subnetMask)) >>> 0;
      result.subnetMask = subnetMask;
      result.subnetMaskDecimal = intToIp(subnetMaskInt);
      result.subnetMaskBinary = intToBinary(subnetMaskInt);
      result.SubnetWildcard = intToIp(~subnetMaskInt >>> 0);
      result.SubnetWildcardBinary = intToBinary(~subnetMaskInt >>> 0);
      result.totalSubnets = 1;
      result.hostsPerSubnet = 1;
      result.totalHostsAllSubnets = 1;
      result.subnetIncrement = 1;
      result.subnets = [{
        index: 1,
        red: ip,
        redBinary: originalIpBinary,
        broadcast: ip,
        broadcastBinary: originalIpBinary,
        rango: `${ip} - ${ip}`,
        hostmin: ip,
        hostminBinary: originalIpBinary,
        hostmax: ip,
        hostmaxBinary: originalIpBinary,
      }];
      result.limitedSubnets = false;
    }

    return result;
  }

  if (subnetMask == null) {
    return {
      originalIp: ip,
      originalIpBinary,
      mask: mask,
      maskDecimal: intToIp(networkMask),
      maskBinary,
      wildcard,
      wildcardBinary,
      originalNetwork: intToIp(networkInt),
      originalNetworkBinary,
      originalBroadcast,
      originalBroadcastBinary,
      originalHostMin,
      originalHostMinBinary,
      originalHostMax,
      originalHostMaxBinary,
      totalHostsOriginal,
      tipo,
    };
  }

  if (isNaN(subnetMask) || subnetMask < mask || subnetMask > 32) {
    console.error('Invalid subnet mask:', subnetMask);
    return { error: 'Máscara de subred no válida' };
  }

  const subnetMaskInt = (-1 << (32 - subnetMask)) >>> 0;
  const totalSubnets = 1 << (subnetMask - mask);
  const hostsPerSubnet = subnetMask === 32 ? 1 : subnetMask === 31 ? 2 : (1 << (32 - subnetMask)) - 2;
  const subnetIncrement = subnetMask === 32 ? 1 : subnetMask === 31 ? 2 : hostsPerSubnet + 2;

  const subnets = [];
  const maxSubnetsToShow = 1000;

  for (let i = 0; i < Math.min(totalSubnets, maxSubnetsToShow); i++) {
    // Calculate network address for this subnet
    const subnetNetworkInt = networkInt + (i * subnetIncrement);
    const subnetNetwork = intToIp(subnetNetworkInt);
    
    // Calculate broadcast address for this subnet
    const subnetBroadcastInt = subnetNetworkInt | (~subnetMaskInt >>> 0);
    const subnetBroadcast = intToIp(subnetBroadcastInt);
    
    // Calculate host range
    const firstHost = subnetMask === 32 ? subnetNetwork : subnetMask === 31 ? intToIp(subnetNetworkInt) : intToIp(subnetNetworkInt + 1);
    const lastHost = subnetMask === 32 ? subnetNetwork : subnetMask === 31 ? intToIp(subnetBroadcastInt) : intToIp(subnetBroadcastInt - 1);

    // Generate binary representations
    const subnetRedBinary = intToBinary(subnetNetworkInt);
    const subnetBroadcastBinary = intToBinary(subnetBroadcastInt);
    const subnetHostMinBinary = subnetMask === 32 ? subnetRedBinary : subnetMask === 31 ? intToBinary(subnetNetworkInt) : intToBinary(subnetNetworkInt + 1);
    const subnetHostMaxBinary = subnetMask === 32 ? subnetRedBinary : subnetMask === 31 ? intToBinary(subnetBroadcastInt) : intToBinary(subnetBroadcastInt - 1);

    // Debug logs for subnets
    console.log(`Subnet ${i + 1} - Red: ${subnetNetwork}`);
    console.log(`Subnet ${i + 1} - Red Binary: ${subnetRedBinary}`);
    console.log(`Subnet ${i + 1} - Broadcast: ${subnetBroadcast}`);
    console.log(`Subnet ${i + 1} - Broadcast Binary: ${subnetBroadcastBinary}`);
    console.log(`Subnet ${i + 1} - HostMin: ${firstHost}`);
    console.log(`Subnet ${i + 1} - HostMin Binary: ${subnetHostMinBinary}`);
    console.log(`Subnet ${i + 1} - HostMax: ${lastHost}`);
    console.log(`Subnet ${i + 1} - HostMax Binary: ${subnetHostMaxBinary}`);

    subnets.push({
      index: i + 1,
      red: subnetNetwork,
      redBinary: subnetRedBinary,
      broadcast: subnetBroadcast,
      broadcastBinary: subnetBroadcastBinary,
      rango: `${firstHost} - ${lastHost}`,
      hostmin: firstHost,
      hostminBinary: subnetHostMinBinary,
      hostmax: lastHost,
      hostmaxBinary: subnetHostMaxBinary,
    });
  }

  const SubnetWildcard = intToIp(~subnetMaskInt >>> 0);
  const SubnetWildcardBinary = intToBinary(~subnetMaskInt >>> 0);
  const totalHostsAllSubnets = totalSubnets * hostsPerSubnet;

  return {
    originalIp: ip,
    originalIpBinary,
    mask: mask,
    maskDecimal: intToIp(networkMask),
    maskBinary,
    wildcard,
    wildcardBinary,
    originalNetwork: intToIp(networkInt),
    originalNetworkBinary,
    originalBroadcast,
    originalBroadcastBinary,
    originalHostMin,
    originalHostMinBinary,
    originalHostMax,
    originalHostMaxBinary,
    totalHostsOriginal,
    tipo,
    subnetMask: subnetMask,
    subnetMaskDecimal: intToIp(subnetMaskInt),
    subnetMaskBinary: intToBinary(subnetMaskInt),
    SubnetWildcard,
    SubnetWildcardBinary,
    totalSubnets,
    hostsPerSubnet,
    totalHostsAllSubnets,
    subnetIncrement,
    subnets,
    limitedSubnets: totalSubnets > maxSubnetsToShow,
  };
}

function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join('.');
}

function intToBinary(int) {
  console.log(`intToBinary called with int: ${int}`);
  const binary = (int >>> 0).toString(2).padStart(32, '0');
  console.log(`Raw binary: ${binary}`);
  
  // Split into 8-bit chunks with proper spacing
  const result = [
    binary.substring(0, 8),
    binary.substring(8, 16),
    binary.substring(16, 24),
    binary.substring(24, 32)
  ].join('.');
  
  console.log(`intToBinary output: ${result}`);
  return result;
}

function getIpClass(firstOctet) {
  if (firstOctet >= 1 && firstOctet <= 126) return 'Clase A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'Clase B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'Clase C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'Clase D';
  if (firstOctet >= 240 && firstOctet <= 254) return 'Clase E';
  return 'Desconocida';
}

function calcularVLSM(ip, mask, subnets) {
  // Validar IP y máscara
  const ipParts = ip.split('.').map(Number);
  if (
    ipParts.length !== 4 ||
    ipParts.some((part) => isNaN(part) || part < 0 || part > 255) ||
    ipParts.some((part) => part === '' || ip.split('.').includes(''))
  ) {
    return { error: 'Dirección IP no válida' };
  }

  if (isNaN(mask) || mask < 1 || mask > 32) {
    return { error: 'Máscara de red no válida.' };
  }

  // Ordenar subredes por número de hosts (de mayor a menor)
  const sortedSubnets = [...subnets].sort((a, b) => b.hosts - a.hosts);

  // Convertir IP a entero
  const ipInt = ipParts.reduce((acc, part) => (acc << 8) | part, 0) >>> 0;
  const networkMask = (-1 << (32 - mask)) >>> 0;
  const networkInt = ipInt & networkMask;

  // Calcular subredes
  let currentNetwork = networkInt;
  const vlsmSubnets = [];

  for (const subnet of sortedSubnets) {
    const hosts = parseInt(subnet.hosts);
    if (isNaN(hosts) || hosts < 1) {
      return { error: `Número de hosts inválido para la subred ${subnet.name}` };
    }

    // Calcular máscara necesaria para el número de hosts
    const requiredBits = Math.ceil(Math.log2(hosts + 2)); // +2 para red y broadcast
    const subnetMask = 32 - requiredBits;

    if (subnetMask < mask) {
      return { error: `No hay suficientes hosts disponibles para la subred ${subnet.name}` };
    }

    // Calcular información de la subred
    const subnetMaskInt = (-1 << (32 - subnetMask)) >>> 0;
    const subnetNetwork = intToIp(currentNetwork);
    const subnetBroadcast = intToIp(currentNetwork | (~subnetMaskInt >>> 0));
    const firstHost = intToIp(currentNetwork + 1);
    const lastHost = intToIp((currentNetwork | (~subnetMaskInt >>> 0)) - 1);

    vlsmSubnets.push({
      name: subnet.name,
      hosts: hosts,
      mask: subnetMask,
      maskDecimal: intToIp(subnetMaskInt),
      network: subnetNetwork,
      broadcast: subnetBroadcast,
      firstHost: firstHost,
      lastHost: lastHost,
      networkBinary: intToBinary(currentNetwork),
      broadcastBinary: intToBinary(currentNetwork | (~subnetMaskInt >>> 0)),
      firstHostBinary: intToBinary(currentNetwork + 1),
      lastHostBinary: intToBinary((currentNetwork | (~subnetMaskInt >>> 0)) - 1),
      totalHosts: Math.pow(2, 32 - subnetMask) - 2
    });

    // Actualizar la dirección de red para la siguiente subred
    currentNetwork = (currentNetwork | (~subnetMaskInt >>> 0)) + 1;
  }

  return {
    originalIp: ip,
    originalIpBinary: intToBinary(ipInt),
    mask: mask,
    maskDecimal: intToIp(networkMask),
    maskBinary: intToBinary(networkMask),
    network: intToIp(networkInt),
    networkBinary: intToBinary(networkInt),
    tipo: getIpClass(ipParts[0]),
    vlsmSubnets
  };
}

export { calcularVLSM };
export default calcularSubred;