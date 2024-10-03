"use client";
import { FC, useState } from "react";
import { Protected } from "../hooks/userProtected";
import Heading from "../utils/heading";
import Header from "../components/header";
import Profile from "../components/profile/profile";
import { useSelector } from "react-redux";

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => {
    console.log("Redux state auth: ", state.auth);
    return state.auth;
  });

  console.log("User: ", user);

  return (
    <div>
      <Protected>
        <Heading
          title="Profile - ECX"
          description={`Profile page of ${user?.name}`}
          keywords=""
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile />
      </Protected>
    </div>
  );
};

export default page;
