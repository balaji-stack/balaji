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
import NavigationIntegrationDetail from "./NavisionIntegrationDetail";


import ListaTable from "./ListaTable";
import FullPageLoader from "@/app/components/shared/FullPageLoader";
import SectionLoader from "@/app/components/shared/SectionLoader";

type Props = {
  promoId: string;
  postingDate: Date;

  CloseNavisionHandler: any;
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

const NavisionIntegrationListLink = (props: Props) => {
  const CloseNavisionHandler = props.CloseNavisionHandler;
  const promozioniId = props.promoId;
  const Date = props.postingDate;

  const [navigationIntegrationLoading, setNavigationIntegrationLoading] = useState<boolean>(false);
 
  const pathname                                      = usePathname();
  const [filter, setFilter]                           = useState<filterType>(initialValue);
  const [RefData, setRefData]                         = useState<any>({});
  const [TableLista, setTableLista]                   = useState<any>({});
  const [TableHeadings, setTableheadings]             = useState<any>([]);
  const [TableId, setTableId]                         = useState<any>({});
  const [ResultType, setResultType]                   = useState<any>({});
  const [showIntegrationLog, setShowIntegrationLog]   = useState<boolean>(false);
  const [showIntegrationLogData, setShowIntegrationLogData]   = useState<boolean>(false);

  let paramValue = {
    promozioniId,
    Date,
  };



  let paramValueData = {
    TableId: "",
    ResultType: "",
    postingDate: Date,
    promozioniId,
  };
  let refDataTest = {};
  const getNavisionIntegrationList = async () => {
    const URL = `${SERVER_URL}/popup/getNavisionIntegrationLogPopup?page=${pg}&size=${size}`;
    axios
      .post(URL, paramValue, {
        withCredentials: true,
      })
      .then((response) => {
        let apiData = response.data;
        setRefData(apiData);
        setNavigationIntegrationLoading(false);
      })
      .catch((error) => {});
  };
  const onChangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value });
  };


  useEffect(() => {
    pg = 0;
    setNavigationIntegrationLoading(true);
    getNavisionIntegrationList();
  }, [promozioniId]);

  const searchHandler = () => {
    pg = 0;
    getNavisionIntegrationList();
  };

  const resetHandler = () => {
    setFilter({ ...initialValue });
  };

  

  let tableHeadings = ["Codice"]; //names used to specify heading of each column
  const linkDetailFn = (tableId: string, resultType: string) => {
    setShowIntegrationLogData(true);
    setTableId(tableId);
    setResultType(resultType);
    paramValueData.TableId = tableId;
    paramValueData.ResultType = resultType;
    if (tableId == "1") {
      tableHeadings = ["Codice"];
    } else if (tableId == "2") {
      tableHeadings = ["Codice", "Sales Codice"];
    } else if (tableId == "3") {
      tableHeadings = [
        "Line Disc Sequence Codice",
        "Customer Disc_ Group Codice",
      ];
    }
    if (resultType != "1") {
      tableHeadings = tableHeadings.concat("Error_Description");
    }
    setTableheadings(tableHeadings);

    const URL = `${SERVER_URL}/popup/getNavisionIntegrationLogPopupDetail?page=${pg}&size=${size}`;
    axios
      .post(URL, paramValueData, {
        withCredentials: true,
      })
      .then((response) => {
        let apiData = response.data;
        setShowIntegrationLogData(false);
        setTableLista(apiData.statusPromoIdData);
      })
      .catch((error) => {}).finally(()=>{
        setShowIntegrationLog(true);
        
      });
  };
  return (
    <>
    {navigationIntegrationLoading ? <SectionLoader />
        :
        <>
    <main>
      <Card>
        <div className="row">
          <div className="title_block-arrow">
            <button type="button" onClick={CloseNavisionHandler}>
              <Image src={closeImg} alt="Image" />
            </button>
          </div>

          <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
            <Title heading=""></Title>

            <NavigationIntegrationDetail
              RefData={RefData}
              postingdate={Date}
              linkDetailFn={linkDetailFn}
            />
          </div>
        </div>
      </Card>

      <>
    {showIntegrationLogData ? <SectionLoader />
        :
        <>
      {showIntegrationLog && (
        <Card>
          <div className="table_data">
            <div className="title_sec">
              <div className="row">
                <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <Title heading="Navision integration Log"></Title>
                </div>
              </div>
            </div>
            <ListaTable
              TableLista={TableLista}
              
              TableHeadings={TableHeadings}
              TableIdprops={TableId}
              ResultTypeprops={ResultType}
            />
          </div>
        </Card>
      )}
  </>
            }
        </>
    </main>
    </>
            }
        </>
  );
};

export default NavisionIntegrationListLink;

