import React from "react";

const Title = (props: any) => {
  const heading = props.heading;
  const textColor = props.textColor;
  const fontSize = props.fontSize;
  const fontWeight = props.fontWeight;
  const bottomSpace = props.bottomSpace;
  const headWrapperStyle = {
    marginBottom: bottomSpace,
  };

  const headingStyle = {
    color: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };

  return (
    <div className="title_block" style={headWrapperStyle}>
      <h2 style={headingStyle}>{heading}</h2>
    </div>
  );
};

export default Title;
