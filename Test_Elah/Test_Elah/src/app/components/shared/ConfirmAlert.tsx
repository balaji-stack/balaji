import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import Image, { StaticImageData } from "next/image";
import question from "../../../img/alert-icons/question.png";
import error from "../../../img/alert-icons/error.png";
import info from "../../../img/alert-icons/info.png";
import success from "../../../img/alert-icons/success.png";

interface Props{
  imgSrc :StaticImageData,
  heading :string,
  msg :string,
  okFn :any,
}
const ConfirmAlert = (props :Props) => {
  const imgSrc = props.imgSrc;
  const heading = props.heading;
  const msg = props.msg;
  const okFn = props.okFn;
  const [swalProps, setSwalProps] = useState({});
  const handleClick = () => {
    setSwalProps({
      show: true,
      title: "",
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  const alertClose = () => {
    setSwalProps({
      show: false,
    });
  };

  return (
    <>
      <SweetAlert2 {...swalProps}>
        <div className="alert_box">
          <div className="icon_block">
            <i className="alert_ic">
              <Image src={imgSrc} alt="Alert" />
            </i>
          </div>
          <div className="alert_content">
            <h2>{heading}</h2>
            <p>{msg}</p>
          </div>
          <div className="alert_btn_grp">
            <button type="button" className="site_btn primary_btn" onClick={okFn}>
              SÌ
            </button>
            <button
              type="button"
              className="site_btn grey_btn"
              onClick={alertClose}
            >
              NO
            </button>
          </div>
        </div>
      </SweetAlert2>
    </>
  );
};

export default ConfirmAlert;
