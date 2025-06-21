import React, { useState } from 'react';

function InputVLSM({ onSubnetsChange }) {
  const [subnets, setSubnets] = useState([{ name: '', hosts: '' }]);

  const handleSubnetChange = (index, field, value) => {
    const newSubnets = [...subnets];
    newSubnets[index][field] = value;
    setSubnets(newSubnets);
    onSubnetsChange(newSubnets);
  };

  const addSubnet = () => {
    setSubnets([...subnets, { name: '', hosts: '' }]);
  };

  const removeSubnet = (index) => {
    const newSubnets = subnets.filter((_, i) => i !== index);
    setSubnets(newSubnets);
    onSubnetsChange(newSubnets);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-text-light">VLSM Configuration</h3>
      <p className="text-text-muted">
        Specify the name and number of hosts required for each subnet.
      </p>
      {subnets.map((subnet, index) => (
        <div key={index} className="flex flex-col space-y-4 p-4 bg-dark-blue/30 rounded-lg border border-border-blue/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-text-light font-medium">Subnet Name</label>
              <input
                type="text"
                value={subnet.name}
                onChange={(e) => handleSubnetChange(index, 'name', e.target.value)}
                placeholder="E.g., Admin Network"
                className="w-full px-4 py-3 bg-dark-blue/30 border border-border-blue/30 rounded-lg text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-light-blue/50 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-text-light font-medium">Number of Hosts</label>
              <input
                type="number"
                value={subnet.hosts}
                onChange={(e) => handleSubnetChange(index, 'hosts', e.target.value)}
                placeholder="E.g., 50"
                min="1"
                className="w-full px-4 py-3 bg-dark-blue/30 border border-border-blue/30 rounded-lg text-text-light placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-light-blue/50 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          {subnets.length > 1 && (
            <button
              onClick={() => removeSubnet(index)}
              className="w-full md:w-auto px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Remove Subnet
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addSubnet}
        className="w-full px-4 py-3 bg-gradient-to-r from-light-blue to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Add Subnet
      </button>
    </div>
  );
}

export default InputVLSM;