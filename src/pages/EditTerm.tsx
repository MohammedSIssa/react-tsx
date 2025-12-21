import { useLocation } from "react-router";

export default function EditTerm() {
  const location = useLocation();

  return (
    <pre dir="ltr">
      Received Data: {JSON.stringify(location.state, null, 2)}
    </pre>
  );
}
