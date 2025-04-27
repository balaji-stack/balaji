"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import axios from "axios";
import router from "next/router";
import Swal from "sweetalert2";
import closeImg from "@/img/close.png";
import Image from "next/image";
import SERVER_URL from "@/helpers/common";
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import FullPageLoader from "@/app/components/shared/FullPageLoader";
import SectionLoader from "@/app/components/shared/SectionLoader";
import { popupMsg } from "@/helpers/messages";
import PromoListaTable from "./PromoListaTable";

type Props = {
  promoId: string;
  posting_date: Date;
  Codice: string;
  ClosePromoInfoHandler: any;
};

export type filterType = {
  codice: string;
  description: string;
};

let pg: number = 0;
const size: number = 3;



export const initialValue: filterType = {
  codice: "",
  description: "",
};

const PromoInfoListLink = (props: Props) => {

  let ClosePromoInfoHandler = props.ClosePromoInfoHandler;
  const promozioniId = props.promoId;
  const datetimeValue = props.posting_date;
  const code =props.Codice;

  const [filter, setFilter] = useState<filterType>(initialValue);
  const [promoInfoTableData,setPromoInfoTableData] =  useState<any>({});



  let paramValue = {
    promozioniId,
    datetimeValue,
    code
  };

  const getPromoInfoList = async () => {
    const URL = `${SERVER_URL}/popup/getPromozioniinfopopup?page=${pg}&size=${size}`;
    // Using the AXIOS library to make a POST request
    await axios
      .post(URL, paramValue, {
        withCredentials: true,
      })
      .then((response) => {
        let apiData = response.data;
          setPromoInfoTableData(apiData);
      })
      .catch((error) => {
        popupMsg(error.message, "error");

      })
      .finally(() => {
        // setIsLoading(false);
        // setIsSectionLoading(false);
      });
  }

  useEffect(() => {
    pg = 0;
    getPromoInfoList();
  }, []);



  return (
    <Card>
      <div className="row">
        <div className="title_block-arrow">

          <button type="button" onClick={ClosePromoInfoHandler}>
            <Image src={closeImg} alt="Image" />
          </button>
        </div>

        <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
          <Title heading="Promozione-Informazione"></Title>
          <Card>
            {/* <Title heading="Navision Log -04LI26784 -(VOL.TAV CLASSICHE)Eseguito il"></Title> */}
              <Title heading={`Navision Log -${paramValue.code} -(VOL.TAV CLASSICHE) Eseguito il ${datetimeValue ? datetimeValue : ''}`}  />

            <PromoListaTable {...promoInfoTableData} />
          </Card>


        </div>
      </div>
    </Card>

  )
}
export default PromoInfoListLink;