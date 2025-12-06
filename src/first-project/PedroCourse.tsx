import Person from "./components/Person";
import "./custom.css";

import { UserProvider } from "./userContext";
import { Countries } from "./enums/Countries";

export default function Tutorial() {
  return (
    <UserProvider>
      <div
        className={`min-h-dvh bg-red-100 p-4 flex flex-col md:flex-row gap-4`}
      >
        <Person
          name={"Mohamed"}
          age={26}
          isMarried={false}
          country={Countries.Palestine}
        />
      </div>
    </UserProvider>
  );
}
