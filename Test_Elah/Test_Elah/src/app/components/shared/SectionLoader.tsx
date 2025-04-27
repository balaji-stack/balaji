import React from "react";

import Link from "next/link";

type Props = {
  Size ? :string,
  BorderWidth ? :string,
  BorderColor ? :string,
  BorderTopColor ? :string,
}

const SectionLoader = (props: Props) => {
  const Size = props.Size;
  const BorderWidth = props.BorderWidth;
  const BorderColor = props.BorderColor;
  const BorderTopColor = props.BorderTopColor;

  const loaderStyle = {
    width: Size,
    height: Size,
    borderWidth: BorderWidth,
    borderTopWidth: BorderWidth,
    borderColor: BorderColor,
    borderTopColor: BorderTopColor,
  };


  return (
    <>
      <div className="loader_section" style={loaderStyle}></div>

    </>
  );
};

export default SectionLoader;
