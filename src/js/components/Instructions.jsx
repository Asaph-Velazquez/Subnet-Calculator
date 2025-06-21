import React from 'react';

function Instructions() {
  return (
    <div className="space-y-6">
      <div className="bg-dark-blue/30 rounded-xl p-6 border border-border-blue/30">
        <p className="text-text-light leading-relaxed">
          Welcome to our IP and VLSM Calculator! This tool allows you to calculate and understand IP addressing and subnetting. With it, you can divide a network into smaller subnets and see how IP addresses are assigned to each subnet.
          <br /><br />
          Subnetting is a fundamental networking technique that optimizes the use of IP addresses and improves network security and performance.
        </p>
      </div>

      <div className="bg-dark-blue/30 rounded-xl p-6 border border-border-blue/30">
        <h3 className="text-xl font-semibold text-light-blue mb-4">Quick Start Guide</h3>
        <div className="space-y-3 text-text-muted">
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">1</span>
            <span><strong className="text-text-light">Select the calculation mode</strong>: Traditional Subnetting or VLSM.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">2</span>
            <span><strong className="text-text-light">Enter a valid IP address</strong>: Use the format xxx.xxx.xxx.xxx, for example, 192.168.1.0.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">3</span>
            <span><strong className="text-text-light">Specify the network mask</strong>: In CIDR notation, like /24.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">4</span>
            <span><strong className="text-text-light">For traditional subnetting</strong>: Enter a subnet mask, for example, /26.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">5</span>
            <span><strong className="text-text-light">For VLSM</strong>: Specify the name and number of hosts for each subnet.</span>
          </p>
          <p className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-light-blue/20 text-light-blue font-semibold mr-3 flex-shrink-0">6</span>
            <span><strong className="text-text-light">Click "Calculate"</strong>: Get subnet details, such as network address, broadcast, and host range.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Instructions; 