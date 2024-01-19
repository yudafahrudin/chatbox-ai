import React from "react";

import { ICON_COLLECTION } from "./config";

export type IconNameType =
  | "dotmenu"
  | "like"
  | "dislike"
  | "copy"
  | "refresh"
  | "send"
  | "trash"
  | "close";

interface IconProp {
  width?: number;
  height?: number;
  stroke?: string;
  iconName: IconNameType;
}

const Icon: React.FC<IconProp> = ({
  width = "24",
  height = "24",
  stroke = "#000000",
  iconName,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_COLLECTION[iconName]()}
    </svg>
  );
};

export default Icon;
