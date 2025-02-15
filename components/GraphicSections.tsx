import React from "react";
import Heading from "./Heading";
import Link from "next/link";
import Graphic1 from "../public/svg/graphic-1.svg";
import Graphic2 from "../public/svg/graphic-2.svg";
import Graphic3 from "../public/svg/Paige_Icon01_white.svg";

export type GraphicSectionProps = {
  graphic: React.ReactNode;
  heading: string;
  text: string;
  colorScheme: "GREEN" | "BLUE" | "DARKBLUE";
  overflows: boolean;
  linkTo?: string;
};

const GRAPHIC_SECTIONS: GraphicSectionProps[] = [
  {
    graphic: (
      <Graphic1 className="overflow-visible inline-flex h-64 xl:absolute xl:-right-14 xl:-bottom-6 xl:h-96" />
    ),
    heading: "Meet Paige",
    text: "Paige was founded by a group of five Imperial College London engineers trying to understand the difficulties blind and partially sighted people face when accessing braille, but now we are more than that. ",
    colorScheme: "BLUE",
    linkTo: "/about",
    overflows: true,
  },
  {
    graphic: (
      <Graphic2 className="overflow-visible inline-flex h-64 xl:absolute xl:-right-6 xl:-bottom-14 xl:h-96" />
    ),
    heading: "Braille matters",
    text: "The United Nations Convention on the Rights of Persons with Disabilities (CRPD) defines braille as a means of communication and therefore essential in freedom of expression and access to information. Worldwide, 340 million people are blind or partially sighted and this figure is set to rise due to an ageing population. ",
    colorScheme: "GREEN",
    linkTo: "/compatibility",
    overflows: true,
  },
  {
    graphic: <Graphic3 className="overflow-visible inline-flex h-48 sm:h-64" />,
    heading: "Paige Connect",
    text: "With Paige Connect, you can take your braille writing to the next level, allowing you to collaborate more effectively with sighted peers, parents, and teachers. ",
    colorScheme: "BLUE",
    linkTo: "/products",
    overflows: false,
  },
];

function GenericGraphicSection(props: GraphicSectionProps) {
  return (
    <section className="flex flex-col bg-white gap-4 w-full">
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between w-full xl:rounded-lg xl:overflow-visible relative gap-4 xl:gap-0 px-4 py-8  ${
            props.colorScheme === "BLUE"
              ? "bg-primary text-white "
              : props.colorScheme === "GREEN"
                ? " bg-paigelightgreen"
                : "bg-paigedarkblue"
          }`}
        >
          <div
            className={`inline-flex flex-col xl:max-w-1/2 gap-4 sm:mr-0 relative sm:px-4 xl:px-6 ${
              props.overflows ? "xl:mr-96 " : "xl:m-0"
            }`}
          >
            <Heading
              css="text-center sm:text-start grow"
              color={props.colorScheme === "GREEN" ? undefined : "text-white"}
            >
              {props.heading}
            </Heading>
            <span
              className={
                props.colorScheme === "GREEN" ? undefined : "text-white"
              }
            >
              {props.text}
            </span>
            {props.linkTo && (
              <Link
                className={`rounded-sm px-4 py-2 sm:mt-6 font-bold focus:outline-none focus:shadow-outline text-center w-full xl:w-fit ${
                  props.colorScheme === "GREEN" &&
                  "text-white bg-green-900 hover:bg-green-800"
                } ${
                  props.colorScheme === "DARKBLUE" &&
                  "text-paigedarkblue bg-white hover:bg-blue-100"
                } ${
                  props.colorScheme === "BLUE" &&
                  "text-primary bg-white hover:bg-blue-100"
                }`}
                href={props.linkTo}
                aria-label={"Learn more about " + props.heading}
                role="button"
              >
                Learn more
              </Link>
            )}
          </div>
          {props.graphic}
        </div>
      </div>
    </section>
  );
}

export function GraphicSection1() {
  return <GenericGraphicSection {...GRAPHIC_SECTIONS[0]} />;
}

export function GraphicSection2() {
  return <GenericGraphicSection {...GRAPHIC_SECTIONS[1]} />;
}

export function GraphicSection3() {
  return <GenericGraphicSection {...GRAPHIC_SECTIONS[2]} />;
}
