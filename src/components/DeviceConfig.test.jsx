import { render, screen } from "@testing-library/react";
import DeviceConfig from "./DeviceConfig";

test("renders device config page", () => {
  render(
    <DeviceConfig
      type={0}
      info={{
        name: "Megapack XL",
        short: "Megapack XL",
        filename: "megapack_xl",
        length: 40,
        width: 10,
        energy: 4,
        cost: 120000,
        year: 2022,
        description: "TEST DESCRIPTION",
      }}
      number={1}
      updateNumber={() => {}}
      includeInstallation={false}
      updateIncludeInstallation={() => {}}
      clickDone={() => {}}
    />
  );

  const productMetricSpan = screen.getByText("Total Energy");
  expect(productMetricSpan).toBeInTheDocument();

  const productDescription = screen.getByText("TEST DESCRIPTION");
  expect(productDescription).toBeInTheDocument();

  const submitButton = screen.getByText("Done");
  expect(submitButton).toBeInTheDocument();
});
