import { ImSpinner } from "react-icons/im";

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="loading-spinner h-10 w-10">
        <ImSpinner size={40} />
      </div>
    </div>
  );
}
