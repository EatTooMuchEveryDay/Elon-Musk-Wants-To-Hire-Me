import "./DeviceConfig.css";
import { formatNumeric } from "../Utils";
import DeviceInfo from "../assets/DeviceInfo.json";

const DeviceConfig = ({
  type,
  info,
  number,
  updateNumber,
  includeInstallation,
  updateIncludeInstallation,
  clickDone,
}) => {
  return (
    <div
      className="device-config-container"
      style={{
        backgroundImage: `url(${require("../assets/" +
          DeviceInfo[type].filename +
          ".jpeg")})`,
      }}
    >
      <div className="device-config-form">
        <h2 className="device-config-title">Add {info.name}</h2>
        <p className="device-config-description">{info.description}</p>

        <div className="product-metric-group">
          <div className="product-metric-item">
            <h2>{info.energy * number} MWh</h2>
            <span>Total Energy</span>
          </div>
          <div className="product-metric-item">
            <h2>{info.energy} MWh</h2>
            <span>Energy Per Unit</span>
          </div>
        </div>

        <div className="device-config-row">
          <p className="device-config-text">Device Quantity</p>
          <input
            className="device-config-number-input"
            type="number"
            value={number}
            min="0"
            max={type === 4 ? "1998" : "999"}
            onChange={updateNumber}
          />
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Include Installation</p>
            <p className="device-config-caption device-config-link">
              Learn More
            </p>
          </div>
          <div className="device-config-tab">
            <button
              className={includeInstallation ? "selected" : ""}
              onClick={() => updateIncludeInstallation(true)}
            >
              Yes
            </button>
            <button
              className={includeInstallation ? "" : "selected"}
              onClick={() => updateIncludeInstallation(false)}
            >
              No
            </button>
          </div>
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Floor Dimension</p>
            <p className="device-config-caption">Per device unit</p>
          </div>
          <p className="device-config-text">
            {info.length} x {info.width} FT²
          </p>
        </div>

        {info.year !== null ? (
          <div className="device-config-row">
            <div>
              <p className="device-config-text">Release Date</p>
            </div>
            <p className="device-config-text">Year {info.year}</p>
          </div>
        ) : null}

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Estimated Price</p>
            <p className="device-config-caption">Taxes not included</p>
          </div>
          <p className="device-config-text">
            ${formatNumeric(info.cost * number)}
          </p>
        </div>

        <div className="device-config-row">
          <div>
            <p className="device-config-text">Est. Annual Maintenance</p>
            <p className="device-config-caption">
              Price escalates at 2% per year
            </p>
          </div>
          <p className="device-config-text">-</p>
        </div>

        <button className="submit-button" onClick={clickDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default DeviceConfig;
