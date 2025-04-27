"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "@/img/arrow-down.png";
import xlsreload from "@/img/xls-reload.png";
import pdf from "@/img/pdf.png";
import xls from "@/img/xls.png";
import { it } from "date-fns/locale";

import SERVER_URL from "@/helpers/common";

import OrdiniForm from "./OrdiniForm";
import OrdiniListTable from "./OrdiniListTable";
import axios from "axios";
import { registerLocale } from "react-datepicker";
import AgenteSearch from "@/app/components/shared/AgenteSearch";
import ClienteSearch from "@/app/components/shared/ClienteSearch";
export type OrdiniDataType = {

    No: string;
    Order_Date_from: string;
    Order_Date_to: string;
    Document_No: string;
    Code: string;
    Salesperson_Code: string;
    Area: string;
    Indipendent_Customer: string;
    Sell_to_Customer_No_: string;
    Bill_to_Customer_No: string;
    Ship_to_Code: string;
    numeroOrdine: string;
    codicearticolo: string;
    agentname: string;
    clientname: string;
    sclientappliesto: string;
    spaymentterm: string;
    spaymentmethod: string;
}
let page: number = 0;
const size: number = 2;
let isLastPage: boolean = false;
const ordiniInitialValue = {


    No: "",
    Order_Date_from: "",
    Order_Date_to: "",
    Document_No: "",
    Code: "",
    Salesperson_Code: "",
    Area: "",
    Indipendent_Customer: "",
    Sell_to_Customer_No_: "",
    Bill_to_Customer_No: "",
    Ship_to_Code: "",
    numeroOrdine: "",
    codicearticolo: "",
    agentname: "",
    clientname: "",
    sclientappliesto: "",
    spaymentterm: "",
    spaymentmethod: "",
}


const ordini = () => {
    const hiddenDiv = {
        display: "none",
    };

    const [filterOpen, setfilterOpen] = useState(false);
    const filterToggle = () => {
        setfilterOpen(!filterOpen);
    };
    const [Ordini, setOrdini] = useState<OrdiniDataType>(ordiniInitialValue);
    const changeHandler = (key: string, value: string) => {
        setOrdini({ ...Ordini, [key]: value });
    };

    const [ordiniList, setOrdiniList] = useState<any>([]);




    //useEffect(() => { 
    const getOrdini = async () => {

        const URL = `${SERVER_URL}/ordini/ordinilist?offset=${page}&limit=${size}`;
        axios.post(URL, Ordini, {
            withCredentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",


            },

        })
            .then((res: any) => {

                page > 0 ? setOrdiniList((prev: any) => [...prev, ...res.data.ordiniList]) : setOrdiniList(res.data.ordiniList);
                isLastPage = ordiniList.length + res.data.ordiniList.length == res.data.totalPages || res.size >= res.total;

            })
            .catch((err: any) => {
            });
    }

    useEffect(() => { 
        console.log("on useeffect")
        getOrdini();
     },[]);     

    const searchHandler = () => {
        isLastPage = false;
        page = 0;
        getOrdini();
    }

    const loadmoreHandler = () => {
        page++;
        getOrdini();
    }

    const resetHandler = () => {
        page = 0;
        setOrdini(ordiniInitialValue);
        isLastPage = false;
        getOrdini();
    }
    const [showAgentSearch, setshowAgentSearch] = useState(false);
    const [showClientSearch, setshowClientSearch] = useState(false);
    const chooseAgentHandler = (value: any) => {
        setOrdini({ ...Ordini, 'agentname': value });
        setshowAgentSearch(false);
    }

    const chooseClientHandler = (value: any) => {
        setOrdini({ ...Ordini, 'clientname': value });
        setshowClientSearch(false);
    }
    return (
        <>
            {
                !showAgentSearch && !showClientSearch ?
                    <div id="ordini_list">
                        <Card>
                            <div
                                className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""
                                    }`}
                            >
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">

                                        <Title heading="Ricerca Ordini"></Title>
                                    </div>
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                                        <div className="title_block-arrow">
                                            <button
                                                type="button"
                                                className="filter-arrow"
                                                onClick={filterToggle}
                                            >   
                                                <Image src={ArrowDown} alt="Image" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`form_block ${filterOpen ? "filter_show" : ""}`}
                                style={hiddenDiv}
                            >
                                
                            </div>
                        </Card>
                        <Card>
                            <div className="table_data ordini_tbl">
                                <div className="title_sec">
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <Title heading="Ordini Lista"></Title>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="title_btn_grp">
                                                <ul>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="icon_btn"
                                                            title="Reload Excel"
                                                        >
                                                            <Image src={xlsreload} alt="XLS Reload" />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <button
                                                                type="button"
                                                                className="icon_btn"
                                                                title="Export To Excel"
                                                            >
                                                                <Image src={xls} alt="XLS" />
                                                            </button>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <button
                                                                type="button"
                                                                className="icon_btn"
                                                                title="Export To Pdf"
                                                            >
                                                                <Image src={pdf} alt="pdf" />
                                                            </button>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <OrdiniListTable ordiniList={ordiniList} loadmoreHandler={loadmoreHandler} isLastPage={isLastPage} />
                            </div>
                        </Card>
                    </div>
                    : 
                    (showAgentSearch ?
                        <div id="agent_search">

                            <AgenteSearch chooseAgenteHandler={chooseAgentHandler} setshowAgentSearch={setshowAgentSearch}/>
                        </div>
                        :
                        <div id="client_search">
                            <ClienteSearch chooseClienteHandler={chooseClientHandler} setshowClientSearch={setshowClientSearch}/>
                        </div>
                    )
            }

        </>
    );
};

export default ordini;
