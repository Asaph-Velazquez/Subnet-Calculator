import React from 'react';
import styles from './resultados.module.css';

function Resultados({ data }) {
  if (data.error) {
    return (
      <div className={styles.error}>
        <strong>Error:</strong> {data.error}
      </div>
    );
  }

  const {
    originalIp,
    originalIpBinary,
    mask,
    maskDecimal,
    maskBinary,
    network,
    networkBinary,
    tipo,
    vlsmSubnets,
    // Fields for traditional subnetting
    wildcard,
    wildcardBinary,
    originalNetwork,
    originalNetworkBinary,
    originalBroadcast,
    originalBroadcastBinary,
    originalHostMin,
    originalHostMinBinary,
    originalHostMax,
    originalHostMaxBinary,
    totalHostsOriginal,
    subnetMask,
    subnetMaskDecimal,
    subnetMaskBinary,
    SubnetWildcard,
    SubnetWildcardBinary,
    totalSubnets,
    hostsPerSubnet,
    totalHostsAllSubnets,
    subnetIncrement,
    subnets,
    limitedSubnets,
  } = data;

  const isVLSM = !!vlsmSubnets;
  const hasSubnets = isVLSM ? vlsmSubnets.length > 0 : (!!subnetMask && subnets?.length > 0);
  const subnetsToShow = isVLSM ? vlsmSubnets : (hasSubnets ? subnets.slice(0, 1000) : []);
  const isMask32 = mask === 32;

  // Function to split the binary IP into network and host parts
  const splitBinary = (binary, mask) => {
    if (!binary) return <span className={styles.networkPart}>{'-'}</span>;
    const octets = binary.split('.');
    const networkPart = octets.slice(0, Math.ceil(mask / 8)).join('.');
    const hostPart = octets.slice(Math.ceil(mask / 8)).join('.');
    const separator = networkPart && hostPart ? '.' : '';
    return (
      <>
        <span className={styles.networkPart}>{networkPart}</span>
        {separator}
        <span className={styles.hostPart}>{hostPart}</span>
      </>
    );
  };

  return (
    <div className={styles.calculationResults}>
      <h2>Calculation Results</h2>
      <p className={styles.intro}>
        Here you can see the details of your network and the generated subnets.
      </p>

      <div className={`${styles.card} ${styles.classfulCard}`}>
        <h3>Main Network Information</h3>
        <p className={styles.description}>
          {isMask32 
            ? "A /32 mask indicates a single host, used for configurations like static routes."
            : "This section shows the basic information of the original network before any subnetting."
          }
        </p>
        <p>
          <strong>IP Address:</strong> {originalIp || '-'}{' '}
          <span className={styles.binary}>{splitBinary(originalIpBinary, mask)}</span>
          <span className={styles.tooltip} data-tooltip="Unique identifier for a device on the network">
            ⓘ
          </span>
        </p>
        <p>
          <strong>Network Mask:</strong> /{mask || '-'} ({maskDecimal || '-'}) {maskBinary || '-' }
          <span className={styles.tooltip} data-tooltip={
            isMask32 
              ? "Defines that this IP is a single host"
              : "Defines the network and host portion of the IP"
          }>
            ⓘ
          </span>
        </p>
        {!isVLSM && (
          <>
            <p>
              <strong>Wildcard:</strong> {wildcard || '-'} {wildcardBinary || '-' }
              <span className={styles.tooltip} data-tooltip="Inverse of the mask, used in network configurations">
                ⓘ
              </span>
            </p>
            <p>
              <strong>Network:</strong> {originalNetwork || originalIp || '-'} {originalNetworkBinary || originalIpBinary || '-'}
              <span className={styles.tooltip} data-tooltip={
                isMask32 
                  ? "Unique address of the host"
                  : "First address of the network, not assignable to devices"
              }>
                ⓘ
              </span>
            </p>
            <p>
              <strong>Hosts per Network:</strong> {totalHostsOriginal || '0'}
            </p>
          </>
        )}
        <p>
          <strong>IP Type:</strong> {tipo || 'Unknown'}
        </p>
      </div>

      {hasSubnets && (
        <>
          {!isVLSM && (
            <div className={`${styles.card} ${styles.subnetCard}`}>
              <h3>Subnets after transitioning from /{mask} to /{subnetMask}</h3>
              <p className={styles.description}>
                Here are the details of the new subnets created from the original network.
              </p>
              <p>
                <strong>Subnet Mask:</strong> /{subnetMask} ({subnetMaskDecimal}) {subnetMaskBinary}
              </p>
              <p>
                <strong>Wildcard:</strong> {SubnetWildcard} {SubnetWildcardBinary}
              </p>
              <p>
                <strong>Subnet Increment:</strong> {subnetIncrement} addresses
              </p>
              <p>
                <strong>Total Subnets:</strong> {totalSubnets} subnets
              </p>
              <p>
                <strong>Hosts per Subnet:</strong> {hostsPerSubnet}
              </p>
              <p>
                <strong>Total Hosts:</strong> {totalHostsAllSubnets}
              </p>
            </div>
          )}

          <div className={styles.subnetList}>
            <h3>{isVLSM ? 'VLSM Subnets' : 'Subnet List'}</h3>
            <p className={styles.description}>
              This table details each subnet with its range of assignable addresses.
            </p>
            {!isVLSM && limitedSubnets && (
              <p className={styles.warning}>
                Showing the first 1000 subnets out of a total of {totalSubnets}.
              </p>
            )}
            {subnetsToShow.map((subnet, index) => (
              <div className={styles.card} key={index}>
                <p>
                  <strong>{isVLSM ? subnet.name : `Subnet ${subnet.index}`}:</strong>
                </p>
                {isVLSM && (
                  <p>
                    <strong>Required Hosts:</strong> {subnet.hosts}
                  </p>
                )}
                <p>
                  <strong>Mask:</strong> {isVLSM ? `/${subnet.mask}` : `/${subnetMask}`} ({isVLSM ? subnet.maskDecimal : subnetMaskDecimal})
                </p>
                <p>
                  <strong>Network:</strong> {subnet.network || subnet.red}{' '}
                  <span className={styles.binary}>{splitBinary(subnet.networkBinary || subnet.redBinary, isVLSM ? subnet.mask : subnetMask)}</span>
                </p>
                <p>
                  <strong>First Host:</strong> {subnet.firstHost || subnet.hostmin} {subnet.firstHostBinary || subnet.hostminBinary}
                </p>
                <p>
                  <strong>Last Host:</strong> {subnet.lastHost || subnet.hostmax} {subnet.lastHostBinary || subnet.hostmaxBinary}
                </p>
                <p>
                  <strong>Broadcast:</strong> {subnet.broadcast} {subnet.broadcastBinary}
                </p>
                <p>
                  <strong>Hosts per Subnet:</strong> {isVLSM ? subnet.totalHosts : hostsPerSubnet}
                </p>
                <p>
                  <strong>IP Type:</strong> {tipo}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {!hasSubnets && (
        <p className={styles.noSubnets}>
          {isVLSM 
            ? "No subnets were calculated because no VLSM subnets were provided."
            : "No subnets were calculated because no subnet mask was provided."}
        </p>
      )}
    </div>
  );
}

export default Resultados;