import { Link } from "react-router-dom"

export default function NavigationBar() {
  return (
    <div data-testid="navbar" className="w-full bg-gray-900 p-5">
      <Link
        to="/"
        className="text-lg text-white font-bold">BitMovie</Link>
    </div>
  );
}
