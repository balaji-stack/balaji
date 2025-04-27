import React from "react";

const Card = ({ children, ...props }: any) => {
  const bgColor = props.bgColor;
  const padding = props.padding;
  const marginTop = props.marginTop;
  const marginBottom = props.marginBottom;
  const borderRadius = props.borderRadius;
  const minimumHeight = props.minimumHeight;
  const boxStyle = {
    backgroundColor: bgColor,
    padding: padding,
    marginTop: marginTop,
    marginBottom: marginBottom,
    borderRadius: borderRadius,
    minHeight: minimumHeight,
  };
  return (
    <section className="card_outline" style={boxStyle}>
      {children}
    </section>
  );
};

export default Card;
