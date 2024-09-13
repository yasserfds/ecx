"use client"

import React, { FC, useState } from "react";
import Heading from "./utils/heading";
import Header from "./components/header";
import Hero from "./components/route/hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading title="EduConnectX" description="" keywords="" />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero />
    </div>
  );
};

export default Page;