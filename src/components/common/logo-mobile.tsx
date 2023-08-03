import React from "react";
import Image from "next/image";

const LogoMobile = () => {
  return (
    <>
      <div className="flex flex-row items-center">
        <Image
          src={"/logo.png"}
          width={70}
          height={70}
          alt="Logo from taski"
          className="md:hidden"
        />
        <h1 className="font-bold text-2xl text-indigo-600 font-Roboto">
          Taski
        </h1>
      </div>
    </>
  );
};

export default LogoMobile;
