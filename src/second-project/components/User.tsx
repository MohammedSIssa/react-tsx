import { useParams } from "react-router";

export default function User() {
  const { uid } = useParams();

  return <h1>User with ID {uid}</h1>;
}
