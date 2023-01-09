import { render, screen } from "@testing-library/react";
import SiteMap from "./SiteMap";

test("renders site map", () => {
  render(
    <SiteMap
      deviceNumbers={[1, 2, 3, 4, 10]}
      deviceGrid={[
        [0, 1],
        [1, 2],
        [3, 4],
      ]}
      onClickDevice={() => {}}
      onClickStartAddDevice={() => {}}
    />
  );

  const bannerTitle = screen.getByText("Build Energy Site");
  expect(bannerTitle).toBeInTheDocument();

  // check site map has correct number of each type of device
  const deviceBars = ["Megapack XL", "Megapack 2", "Megapack", "PP", "T"].map(
    (type) => screen.getAllByText(type)
  );

  expect(deviceBars[0].length).toBe(1);
  expect(deviceBars[1].length).toBe(2);
  expect(deviceBars[2].length).toBe(1);
  expect(deviceBars[3].length).toBe(1);
  expect(deviceBars[4].length).toBe(1);
});
