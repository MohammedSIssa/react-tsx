import { useLocation } from "react-router";

export default function EditLog() {
  const location = useLocation();

  return (
    <pre dir="ltr">
      Recieved Data: {JSON.stringify(location.state, null, 2)}
    </pre>
  );
}
