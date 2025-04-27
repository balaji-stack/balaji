import React from "react";

const ViewText = (props: any) => {
  const text = props.text;
  const txtColor = props.txtColor;
  const textSize = props.textSize;
  const textWeight = props.textWeight;
  const bottomSpace = props.bottomSpace;
  const textStyle = {
    color: txtColor,
    fontSize: textSize,
    fontWeight: textWeight,
    marginBottom: bottomSpace,
  };

  return (
    <span className="view_txt" style={textStyle}>
      {text}
    </span>
  );
};

export default ViewText;
