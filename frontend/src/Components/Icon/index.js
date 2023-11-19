import React from "react";
import icons from "./icons";

const Icon = ({
  width = "20px",
  height = "20px",
  viewBox = "0 0 20 20",
  title,
  children,
  type
}) => (
  <svg width={width} height={height} viewBox={viewBox}>
    <title>{title}</title>
    {children || icons(type)}
  </svg>
);

export default Icon;
