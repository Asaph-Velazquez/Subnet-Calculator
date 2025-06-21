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
    // Campos para subnetting tradicional
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

  // Función para dividir la IP binaria en partes de red y host
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
      <h2>Resultados del Cálculo</h2>
      <p className={styles.intro}>
        Aquí puedes ver los detalles de tu red y las subredes generadas.
      </p>

      <div className={`${styles.card} ${styles.classfulCard}`}>
        <h3>Información de la Red Principal</h3>
        <p className={styles.description}>
          {isMask32 
            ? "Una máscara /32 indica un único host, usado para configuraciones como rutas estáticas."
            : "Esta sección muestra la información básica de la red original antes de cualquier división en subredes."
          }
        </p>
        <p>
          <strong>Dirección IP:</strong> {originalIp || '-'}{' '}
          <span className={styles.binary}>{splitBinary(originalIpBinary, mask)}</span>
          <span className={styles.tooltip} data-tooltip="Identificador único para un dispositivo en la red">
            ⓘ
          </span>
        </p>
        <p>
          <strong>Máscara de Red:</strong> /{mask || '-'} ({maskDecimal || '-'}) {maskBinary || '-' }
          <span className={styles.tooltip} data-tooltip={
            isMask32 
              ? "Define que esta IP es un único host"
              : "Define la parte de red y host de la IP"
          }>
            ⓘ
          </span>
        </p>
        {!isVLSM && (
          <>
            <p>
              <strong>Wildcard:</strong> {wildcard || '-'} {wildcardBinary || '-' }
              <span className={styles.tooltip} data-tooltip="Inverso de la máscara, usado en configuraciones de red">
                ⓘ
              </span>
            </p>
            <p>
              <strong>Red:</strong> {originalNetwork || originalIp || '-'} {originalNetworkBinary || originalIpBinary || '-'}
              <span className={styles.tooltip} data-tooltip={
                isMask32 
                  ? "Dirección única del host"
                  : "Primera dirección de la red, no asignable a dispositivos"
              }>
                ⓘ
              </span>
            </p>
            <p>
              <strong>Hosts por Red:</strong> {totalHostsOriginal || '0'}
            </p>
          </>
        )}
        <p>
          <strong>Tipo de IP:</strong> {tipo || 'Desconocido'}
        </p>
      </div>

      {hasSubnets && (
        <>
          {!isVLSM && (
            <div className={`${styles.card} ${styles.subnetCard}`}>
              <h3>Subredes después de la transición de /{mask} a /{subnetMask}</h3>
              <p className={styles.description}>
                Aquí se presentan los detalles de las nuevas subredes creadas a partir de la red original.
              </p>
              <p>
                <strong>Máscara de Subred:</strong> /{subnetMask} ({subnetMaskDecimal}) {subnetMaskBinary}
              </p>
              <p>
                <strong>Wildcard:</strong> {SubnetWildcard} {SubnetWildcardBinary}
              </p>
              <p>
                <strong>Salto entre Subredes:</strong> {subnetIncrement} direcciones
              </p>
              <p>
                <strong>Total de Subredes:</strong> {totalSubnets} subredes
              </p>
              <p>
                <strong>Hosts por Subred:</strong> {hostsPerSubnet}
              </p>
              <p>
                <strong>Hosts Totales:</strong> {totalHostsAllSubnets}
              </p>
            </div>
          )}

          <div className={styles.subnetList}>
            <h3>{isVLSM ? 'Subredes VLSM' : 'Lista de Subredes'}</h3>
            <p className={styles.description}>
              Esta tabla detalla cada subred con su rango de direcciones asignables.
            </p>
            {!isVLSM && limitedSubnets && (
              <p className={styles.warning}>
                Mostrando las primeras 1000 subredes de un total de {totalSubnets}.
              </p>
            )}
            {subnetsToShow.map((subnet, index) => (
              <div className={styles.card} key={index}>
                <p>
                  <strong>{isVLSM ? subnet.name : `Subred ${subnet.index}`}:</strong>
                </p>
                {isVLSM && (
                  <p>
                    <strong>Hosts Requeridos:</strong> {subnet.hosts}
                  </p>
                )}
                <p>
                  <strong>Máscara:</strong> {isVLSM ? `/${subnet.mask}` : `/${subnetMask}`} ({isVLSM ? subnet.maskDecimal : subnetMaskDecimal})
                </p>
                <p>
                  <strong>Red:</strong> {subnet.network || subnet.red}{' '}
                  <span className={styles.binary}>{splitBinary(subnet.networkBinary || subnet.redBinary, isVLSM ? subnet.mask : subnetMask)}</span>
                </p>
                <p>
                  <strong>HostMin:</strong> {subnet.firstHost || subnet.hostmin} {subnet.firstHostBinary || subnet.hostminBinary}
                </p>
                <p>
                  <strong>HostMax:</strong> {subnet.lastHost || subnet.hostmax} {subnet.lastHostBinary || subnet.hostmaxBinary}
                </p>
                <p>
                  <strong>Broadcast:</strong> {subnet.broadcast} {subnet.broadcastBinary}
                </p>
                <p>
                  <strong>Hosts por Subred:</strong> {isVLSM ? subnet.totalHosts : hostsPerSubnet}
                </p>
                <p>
                  <strong>Tipo de IP:</strong> {tipo}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {!hasSubnets && (
        <p className={styles.noSubnets}>
          {isVLSM 
            ? "No se calcularon subredes porque no se proporcionaron subredes VLSM."
            : "No se calcularon subredes porque no se proporcionó una máscara de subred."}
        </p>
      )}
    </div>
  );
}

export default Resultados;