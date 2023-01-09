import "./SiteMap.css";
import DeviceInfo from "../assets/DeviceInfo.json";
import {
  formatNumeric,
  countAllDevices,
  countDeviceType,
  sumEnergy,
  avgEnergy,
  sumCost,
  countDimensions,
} from "../Utils";

const SiteMap = ({
  deviceNumbers,
  deviceGrid,
  onClickDevice,
  onClickStartAddDevice,
}) => {
  const genDevice = (type, idx) => {
    return (
      <button
        key={idx}
        className="site-map-device"
        style={{
          width: `${DeviceInfo[type].length}%`,
        }}
        onClick={() => onClickDevice(type)}
      >
        {DeviceInfo[type].short}
      </button>
    );
  };

  const genRow = (row, rowIdx) => {
    return (
      <div key={rowIdx} className="site-map-row">
        {row.map((type, idx) => genDevice(type, idx))}
      </div>
    );
  };

  return (
    <div className="site-map-container">
      <div className="site-map-banner">
        <h2 className="device-config-title">Build Energy Site</h2>
        <p className="device-config-description">
          Aliquam ut nunc sed ipsum malesuada tempor. Suspendisse condimentum
          gravida lacus, diam pretium sed. In lectus nulla, fermentum nec
          tellus.
        </p>

        <div className="product-metric-group">
          <div className="product-metric-item">
            <h2>
              {countAllDevices(deviceNumbers)} Unit
              {countAllDevices(deviceNumbers) > 1 ? "s" : ""}
            </h2>
            <span>All Devices</span>
          </div>
          <div className="product-metric-item">
            <h2>
              {countDeviceType(deviceNumbers)} Type
              {countDeviceType(deviceNumbers) > 1 ? "s" : ""}
            </h2>
            <span>All Units</span>
          </div>
        </div>
        <div className="product-metric-group">
          <div className="product-metric-item">
            <h2>{sumEnergy(deviceNumbers)} MWh</h2>
            <span>Total Energy</span>
          </div>
          <div className="product-metric-item">
            <h2>{avgEnergy(deviceNumbers)} MWh</h2>
            <span>Energy Per Unit</span>
          </div>
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Land Size</p>
            <p className="device-config-caption">Device clearance included</p>
          </div>
          <p className="device-config-text">{`${
            countDimensions(deviceGrid).width
          } x ${countDimensions(deviceGrid).length} FT`}</p>
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Device Clearance</p>
          </div>
          <p className="device-config-text">10 FT</p>
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Estimated Price</p>
            <p className="device-config-caption">Taxes not included</p>
          </div>
          <p className="device-config-text">
            ${formatNumeric(sumCost(deviceNumbers))}
          </p>
        </div>

        <div className="device-config-row">
          <h2 className="device-config-subtitle">Site Contact Information</h2>
        </div>

        <div className="device-config-contact-form">
          <p className="device-config-contact-text">Company Name</p>
          <input className="device-config-contact-input" type="text" />

          <p className="device-config-contact-text">Installation Address</p>
          <input
            className="device-config-contact-input"
            type="text"
            placeholder="Enter a location"
          />
        </div>

        <button
          className="submit-button"
          onClick={() => {
            // To be implemented
            // Should call backend API
          }}
        >
          Order Now
        </button>
      </div>

      <div className="site-map">
        <div className="site-map-top-cover" />
        {deviceGrid.length === 0 ? (
          <h2 className="start-title" onClick={onClickStartAddDevice}>
            Start By Adding Devices
          </h2>
        ) : (
          <div className="site-map-rows-container">
            {deviceGrid.map((type, idx) => genRow(type, idx))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteMap;
