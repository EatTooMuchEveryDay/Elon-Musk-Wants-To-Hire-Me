import DeviceInfo from "./assets/DeviceInfo.json";

// Add comas to numeric string
const formatNumeric = (num) => {
  let res = "";

  if (typeof num === "number") num = String(num);

  while (num.length > 3) {
    res = "," + num.slice(-3) + res;
    num = num.slice(0, num.length - 3);
  }

  if (num) res = num + res;

  return res;
};

// Autogenerate device grid according to configuration of each device type
const spawnDeviceGrid = (numbers) => {
  let t = [];
  for (let idx in numbers) {
    if (numbers[idx] !== 0) {
      t.push({ type: Number(idx), num: numbers[idx] });
    }
  }

  numbers = t;

  let ans = [],
    remain = 0;

  while (numbers.length) {
    const idx = Math.floor(Math.random() * numbers.length);
    const type = numbers[idx].type;
    const len = DeviceInfo[type].length;

    if (ans.length === 0 || remain < len) {
      ans.push([]);
      remain = 100;
    }

    ans[ans.length - 1].push(type);
    remain -= len + 10;
    numbers[idx].num--;

    if (numbers[idx].num === 0) numbers.splice(idx, 1);
  }

  return ans;
};

// Helper functions for generating site map
const countAllDevices = (numbers) => {
  return numbers.reduce((acc, cur) => acc + cur, 0);
};

const countDeviceType = (numbers) => {
  return numbers.reduce((acc, cur) => acc + (cur > 0 ? 1 : 0), 0);
};

const sumEnergy = (numbers) => {
  return numbers.reduce(
    (acc, cur, type) => acc + cur * DeviceInfo[type].energy,
    0
  );
};

const avgEnergy = (numbers) => {
  if (countAllDevices(numbers) === 0) return 0;

  return (
    Math.round((sumEnergy(numbers) * 100) / countAllDevices(numbers)) / 100
  );
};

const sumCost = (numbers) => {
  return numbers.reduce(
    (acc, cur, type) => acc + cur * DeviceInfo[type].cost,
    0
  );
};

const countDimensions = (grid) => {
  let width = 0,
    length = Math.max(0, (grid.length * 2 - 1) * 10);

  for (let row of grid) {
    let curWidth = 0;

    for (let device of row) {
      if (curWidth > 0) curWidth += 10;

      curWidth += DeviceInfo[device].length;
    }

    width = Math.max(width, curWidth);
  }

  return { width, length };
};

export {
  formatNumeric,
  spawnDeviceGrid,
  countAllDevices,
  countDeviceType,
  sumEnergy,
  avgEnergy,
  sumCost,
  countDimensions,
};
