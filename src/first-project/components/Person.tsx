import { useState } from "react";
import { Countries, type Country } from "../enums/Countries";

interface Props {
  name: string;
  age: number;
  isMarried: boolean;
  country: Country;
}

import useUser from "../hooks/useUser";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Person(props: Props) {
  const [showInfo, setShowInfo] = useState<boolean | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  const { users, addUser } = useUser();
  const fakeUser: Props = {
    name: "Mohamed",
    age: 26,
    isMarried: false,
    country: Countries.Palestine,
  };

  function handleBioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBio(e.target.value);
  }

  // function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setValue(e.target.value);
  // }

  // function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  // }

  return (
    <div
      className={`bg-red-400 text-red-50 p-4 max-h-fit px-6 rounded-lg shadow-lg [&_p]:font-bold`}
    >
      <p>Name: {props.name}</p>
      <pre>const users = {JSON.stringify(users, null, 2)}</pre>
      <button
        className="bg-red-900 text-red-100 p-1 rounded mb-2 flex gap-2 items-center px-3"
        onClick={() => addUser(fakeUser)}
      >
        <FaPlus />
        <p>Add User</p>
      </button>
      <br />
      {showInfo && (
        <>
          <p>Age: {props.age}</p>
          <p>Country: {props.country}</p>
          <p>This person is {props.isMarried ? "" : "not"} married</p>
          <p>{bio ? `Bio: ${bio}` : "No bio available!"}</p>
          <input
            className="bg-red-200 rounded mb-2 p-1 px-2 text-red-900 focus:outline-0 focus:border focus:border-red-900"
            onChange={handleBioChange}
            placeholder={bio ? `${bio}` : "Enter bio here.."}
            value={bio ?? ""}
          />
          <br />
        </>
      )}
      <button
        className="cursor-pointer bg-red-900 shadow-xl p-2 rounded-md text-red-100"
        onClick={() => setShowInfo(!showInfo)}
      >
        {showInfo ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
