import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Serenity Market brand", () => {
  render(<App />);
  const brand = screen.getByText(/Serenity Market/i);
  expect(brand).toBeInTheDocument();
});
