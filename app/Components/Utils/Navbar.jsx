import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <Image
        src="/logo.png"
        alt="Logo"
        width={1000}
        height={1000}
        className="w-[5vw]"
      />
      <h2 className="text-3xl font-semibold ml-3">Invoice Summary</h2>
    </div>
  );
};

export default Navbar;
