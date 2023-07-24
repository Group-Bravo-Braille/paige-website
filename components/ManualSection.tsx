import React from "react";
import Graphic4 from "../public/svg/board-outline.svg";
import Heading from "../components/Heading";

export default function ManualSection() {
  return (
    <div className="flex flex-col bg-white px-4 py-4 md:p-8 sm:my-8 justify-between relative gap-6 sm:rounded-lg">
      <div className="flex flex-col justify-between">
        <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-xl md:text-3xl md:text-center">
        If you have any questions,
        get in touch at <a className="text-primary" href = "mailto: hello@paigebraille.com">hello@paigebraille.com</a>
        </h2>
      </div>
      <Graphic4 className="object-contain inline-flex h-28 md:h-36 " />
    </div>
  );
}
