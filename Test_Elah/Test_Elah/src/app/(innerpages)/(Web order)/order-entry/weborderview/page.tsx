"use client";
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import FieldColumn from "../web-order-add-backup/FieldColumn";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import SERVER_URL from "@/helpers/common";

interface dataType {
    dataOrdine: any,
    dataConsegna: any,
}
const initialData: dataType = {
    dataOrdine: '',
    dataConsegna: '',
}
const webOrderDetail = () => {
    const [data, setData] = useState<dataType>(initialData);
 
    const changeHandler = (key: string, value: string) => {
        setData({ ...data, [key]: value });
    };
    const searchParams = useSearchParams();
    const filterStringified :any= searchParams.get('filter');
    const filter = JSON.parse(filterStringified);
    // useEffect(()=>{
    //     const URL = `${SERVER_URL}/orderEntry/getOrderentryData`
    //     axios.post(URL,filter,{
    //         withCredentials: true , 
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //     }   
    //     }).then(
    //         (res)=> console.log(res))
    // },[])
    return (
        <main>
        
            <div className="weborder_detail">
                <div className="pg_title">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Title
                                heading="Web Ordini"
                                textColor="#0069ba"
                                fontSize="30px"
                                fontWeight="600"
                            />
                        </div>
                        <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                            <div className="btn_grp_header">
                                <div className="link_grp">
                                    <ul className="subnav_ul" style={{ display: 'flex' }}>
                                        <li>
                                            <Link href="#">Ritorna</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Primo</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Precedente</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Successivo</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Ultimo</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <div className="tab_block">
                        <div className="tab_inner_block">
                            <Card marginBottom="15px" padding="30px 30px 0 30px">
                                <div className="title_sub">
                                    <Title heading="Customer" fontSize="18px" />
                                </div>
                                <div className="row">
                                    {customerFields?.map((it) => {
                                        return (
                                            <FieldEl fieldType={it.fieldType}
                                                label={it.label} value={it.value} colArr={it.colArr}
                                                 />
                                        )
                                    })}
                                </div>
                            </Card>
                            <Card marginBottom="15px" padding="30px 30px 0 30px">
                                <div className="title_sub">
                                    <Title heading="Giro" fontSize="18px" />
                                </div>
                                <div className="row">
                                    <FieldEl fieldType={'viewText'}
                                        label={'Codice'} value={'FIRENZE'}
                                        colArr ={[4,4,4,12,12,12]}
                                       />

                                </div>
                            </Card>
                            <Card marginBottom="15px" padding="30px 30px 0 30px">
                                <div className="tab_block">
                                    <Tabs
                                        defaultActiveKey="webordinitab"
                                        id="uncontrolled-tab-example"
                                        className="button_tab_block"
                                    >
                                        <Tab eventKey="webordinitab" title="Cliente">
                                            <div className="content_block">
                                                <div className="row">
                                                    <FieldEl fieldType={clienteTabFields[0].fieldType}
                                                        label={clienteTabFields[0].label} value={clienteTabFields[0].value}
                                                        colArr ={clienteTabFields[0].colArr} />
                                                </div>
                                                <div className="row">
                                                    <FieldEl fieldType={clienteTabFields[1].fieldType}
                                                        label={clienteTabFields[1].label} value={clienteTabFields[1].value}
                                                        colArr ={clienteTabFields[1].colArr} />
                                                </div>
                                                <div className='row'>
                                                    {clienteTabFields.slice(2)?.map((item) => {
                                                        return (
                                                            <FieldEl fieldType={item.fieldType}
                                                                label={item.label} value={item.value}
                                                                colArr ={item.colArr} />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="fatturazione" title="Fatturazione">
                                            <div className="content_block">
                                                <div className="row">
                                                    <FieldEl fieldType={clienteTabFields[0].fieldType}
                                                        label={clienteTabFields[0].label} value={clienteTabFields[0].value}
                                                        colArr ={clienteTabFields[0].colArr} />
                                                </div>
                                                <div className="row">
                                                    <FieldEl fieldType={clienteTabFields[1].fieldType}
                                                        label={clienteTabFields[1].label} value={clienteTabFields[1].value}
                                                        colArr ={clienteTabFields[1].colArr} />
                                                </div>
                                                <div className='row'>
                                                    {clienteTabFields.slice(2)?.map((item) => {
                                                        return (
                                                            <FieldEl fieldType={item.fieldType}
                                                                label={item.label} value={item.value}
                                                                colArr ={item.colArr} />
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="spedizione" title="Spedizione">
                                            <div className="content_block">
                                                <form>
                                                    <div className="row">
                                                        {spedizioneFields?.map((it) => {
                                                            return (
                                                                <FieldEl fieldType={it.fieldType}
                                                                    label={it.label} value={it.value}
                                                                    colArr ={it.colArr} />
                                                            )
                                                        })}
                                                    </div>
                                                </form>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </Card>
                            <Card marginBottom="15px" padding="30px 30px 0 30px">
                                <div className="title_sub">
                                    <Title heading="Pagamento" fontSize="18px" />
                                </div>
                                <div className="row">
                                    {pagamentoFields?.map((it) => {
                                        return (
                                            <FieldEl fieldType={it.fieldType}
                                                label={it.label} value={it.value}
                                                colArr={it.colArr} />
                                        )
                                    })}
                                </div>
                            </Card>
                            <Card marginBottom="15px" padding="30px 30px 0 30px">
                                <div className="title_sub">
                                    <Title heading="Dati Spedizione" fontSize="18px" />
                                </div>
                                <div className="row">
                                    {datiSpedizioneFields?.map((it) => {
                                        return (
                                            <FieldEl fieldType={it.fieldType}
                                                label={it.label} value={it.value}
                                                colArr={it.colArr} />
                                        )
                                    })}
                                </div>
                            </Card>
                            <Card marginBottom="15px" padding="30px">
                                <button type="button" className="site_btn primary_btn">
                                    Nuovo ordine
                                </button>
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
            </main>
        
    );
};

const customerFields = [{ 'fieldType': 'viewText', 'label': 'Ragione Sociale', 'value': 'CONAD NORD OVEST SOC. COOP', 'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Codice cliente', 'value': 'C060252_039' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Agente', 'value': '(BO) BOZZA FABRIZIO' ,'colArr': [4, 4, 4, 12, 12, 12] }];

const clienteTabFields = [{ 'fieldType': 'viewText', 'label': 'Ragione Sociale', 'value': 'value1' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Indirizzo', 'value': 'value2' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Citta', 'value': 'value3' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'CAP', 'value': 'value4' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'PV', 'value': 'value5' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Partita IVA', 'value': 'value6' ,'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Riferimento', 'value': 'value7' ,'colArr': [4, 4, 4, 12, 12, 12] }];

const spedizioneFields = [{ 'fieldType': 'inputSearch', 'label': 'Ragione Sociale', 'value': '', 'colArr': [6, 6, 6, 6, 12, 12] },
{ 'fieldType': 'input', 'label': 'Indrizzo', 'value': '', 'colArr': [6, 6, 6, 6, 12, 12] },
{ 'fieldType': 'input', 'label': 'Citta', 'value': '', 'colArr': [4,4, 4, 4, 12, 12] },
{ 'fieldType': 'input', 'label': 'CAP', 'value': '', 'colArr': [4, 4, 4, 4, 12, 12] },
{ 'fieldType': 'input', 'label': 'PV', 'value': '', 'colArr': [4, 4, 4, 4, 12, 12] },
{ 'fieldType': 'input', 'label': 'Riferimento', 'value': '', 'colArr': [6, 6, 6, 6, 12, 12] }];

const pagamentoFields = [{ 'fieldType': 'viewText', 'label': 'Descrizione condizione', 'value': '(30G2) 30 gg 2%', 'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Descrizione metodo', 'value': '(BB) Bonifico bancario', 'colArr': [4, 4, 4, 12, 12, 12] }];

const datiSpedizioneFields = [{ 'fieldType': 'viewText', 'label': 'Metodo di spedizione', 'value': '(VET) VettorE', 'colArr': [4, 4, 4, 12, 12, 12] },
{ 'fieldType': 'viewText', 'label': 'Ubicazione', 'value': '(SPED-NOVI) SPEDIZIONI NOVI', 'colArr': [4, 4, 4, 12, 12, 12] }];


export default webOrderDetail;
