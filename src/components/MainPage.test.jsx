import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";

test("renders main page", () => {
  render(<MainPage />);
  const teslaLogo = screen.getByAltText(/tesla logo/i);
  expect(teslaLogo).toBeInTheDocument();

  const mainTitle = screen.getByText(/build your energy battery site/i);
  expect(mainTitle).toBeInTheDocument();
});
