import { useState } from "react";
import "./SiteBuilder.css";
import DeviceConfig from "./DeviceConfig";
import SiteMap from "./SiteMap";
import DeviceInfo from "../assets/DeviceInfo.json";
import { spawnDeviceGrid, sumEnergy } from "../Utils";

const DeviceTab = ({ name, number, selected, clickDeviceTab }) => {
  const inactive = number === 0;

  return (
    <button
      className={`device-tab-button ${inactive ? "inactive" : ""} ${
        selected ? "selected" : ""
      }`}
      onClick={clickDeviceTab}
    >
      {name} {inactive ? "" : ` x ${number}`}
    </button>
  );
};

const SiteBuilder = () => {
  const [deviceNumbers, setDeviceNumbers] = useState([0, 0, 0, 0, 0]);
  const [deviceGrid, setDeviceGrid] = useState([]);
  const [includeInstallation, setIncludeInstallation] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleClickDeviceTab = (type) => {
    setSelectedDevice(selectedDevice === type ? null : type);
  };

  const handleUpdateDeviceNumber = (type, number) => {
    let newDeviceNumbers = JSON.parse(JSON.stringify(deviceNumbers));

    // Prevent invalid change
    number = Number(number);
    if (type !== 4 && number >= 1000) return;

    // Make sure transformers number are correct
    newDeviceNumbers[type] = Number(number);
    const transformerNeeded = Math.floor(
      (newDeviceNumbers.reduce((sum, val) => sum + val, 0) -
        newDeviceNumbers[4]) /
        2
    );
    const transformerAtMost = Math.round(-sumEnergy(newDeviceNumbers) / DeviceInfo[4].energy + newDeviceNumbers[4]);

    if (type === 4 && number < transformerNeeded) {
      alert("For every 2 industrial batteries bought 1 transformer is needed.");
      return;
    }

    if(type === 4 && sumEnergy(newDeviceNumbers)<0){
      alert("Add more batteries to provide enough energy for transformers.");
      return;
    }

    newDeviceNumbers[4] = Math.max(transformerNeeded, newDeviceNumbers[4]);
    newDeviceNumbers[4] = Math.min(transformerAtMost, newDeviceNumbers[4]);

    setDeviceNumbers(newDeviceNumbers);

    // Update device grid accordingly
    if (JSON.stringify(deviceNumbers) !== JSON.stringify(newDeviceNumbers))
      setDeviceGrid(spawnDeviceGrid(newDeviceNumbers));
  };

  const handleUpdateIncludeInstallation = (type, val) => {
    let newIncludeInstallation = JSON.parse(
      JSON.stringify(includeInstallation)
    );

    newIncludeInstallation[type] = val;
    setIncludeInstallation(newIncludeInstallation);
  };

  const handleClickDone = () => {
    setSelectedDevice(null);
  };

  const handleClickStartAddDevice = () => {
    setSelectedDevice(0);
  };

  return (
    <div className="builder-container">
      <div className="device-tab">
        {deviceNumbers.map((number, idx) => (
          <DeviceTab
            key={idx}
            type={idx}
            name={DeviceInfo[idx].name}
            number={number}
            selected={selectedDevice === idx}
            clickDeviceTab={() => handleClickDeviceTab(idx)}
          />
        ))}
      </div>

      {selectedDevice === null ? (
        <SiteMap
          deviceNumbers={deviceNumbers}
          deviceGrid={deviceGrid}
          onClickDevice={handleClickDeviceTab}
          onClickStartAddDevice={handleClickStartAddDevice}
        />
      ) : (
        <DeviceConfig
          type={selectedDevice}
          info={DeviceInfo[selectedDevice]}
          number={deviceNumbers[selectedDevice]}
          updateNumber={(e) =>
            handleUpdateDeviceNumber(selectedDevice, e.target.value)
          }
          includeInstallation={includeInstallation[selectedDevice]}
          updateIncludeInstallation={(val) =>
            handleUpdateIncludeInstallation(selectedDevice, val)
          }
          clickDone={handleClickDone}
        />
      )}
    </div>
  );
};

export default SiteBuilder;
