import { render, screen } from "@testing-library/react";
import SiteBuilder from "./SiteBuilder";

test("renders site builder", () => {
  render(<SiteBuilder />);

  const deviceTabs = [
    "Megapack XL",
    "Megapack 2",
    "Megapack",
    "PowerPack",
    "Transformer",
  ].map((type) => screen.getByText(type));

  deviceTabs.forEach((tab) => expect(tab).toBeInTheDocument());
});
