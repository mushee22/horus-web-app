import React from "react";
import { BackButton } from "../page-header";

export default function Header() {
  return (
    <div className="shadow-md py-2 bg-black sticky top-0 h-[50px] flex gap-x-3  items-center z-20 pl-2">
      <BackButton />
      <p className="text-base font-medium">Community</p>
    </div>
  );
}
