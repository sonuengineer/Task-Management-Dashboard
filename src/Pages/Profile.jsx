import { useState } from "react";
import Input from "../components/InputField.jsx";

export default function Profile() {
  const [bio, setBio] = useState("");
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: Sonu Prajapati </p>
      <p>Email: sonu@gmail.com</p>
      <label>Bio:</label>
      <Input value={bio} onChange={e => setBio(e.target.value)} />
      <p>Live Bio: {bio}</p>
    </div>
  );
}
