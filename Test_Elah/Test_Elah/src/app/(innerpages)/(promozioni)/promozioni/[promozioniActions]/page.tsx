"use client"
import React, { ChangeEvent, forwardRef, useState } from 'react';
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import calenderimg from "@/img/calender.png";
import { Tab, Tabs } from "react-bootstrap";
import Image from "next/image";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GruppoFilterComponent from "./(gruppiTab)/GruppoFilterComponent"
import GruppoVisualizzaTable from "./(gruppiTab)/GruppoVisualizzaTable"
import ReferenceFilterComponent from "./(referenze-viewTab)/ReferenceFilterComponent"
import ReferenceVisualizzaTable from "./(referenze-viewTab)/ReferenceVisualizzaTable"
import { usePathname } from 'next/navigation';
import { calenderimgStr } from '@/helpers/images';
import GruppiComponent from './(gruppiTab)/GruppoComponent';
import ReferenzeComponent from './(referenze-viewTab)/ReferenzeComponent';
import SottoGruppiComponent from './(sottogruppi)/SottoGruppiComponent';
import PuntivenditaComponent from './(puntivendita)/PuntivenditaComponent';
import Referenze_addComponent from './(referenze-add)/Referenze_addComponent';

type Props = {}
export type filterType = {

    //datas of promozioni(01E15777)
    txtCampagna: string,
    txtDescPromozione: string,
    selStatus: string,
    txtDataRevisione: any | Date,
    txtcediFrom: string,
    txtcediTo: string,
    selModeli: string,
    txtCampagnaDelCliente: string,
    txtClusterPuntivendita: string,

    //datas of sell-in ordini
    txtsellInOrdiniFrom: any | Date,
    txtsellInOrdiniTo: any | Date,

    //datas of sell-in consegna
    txtsellInConsegnaFrom: any | Date,
    txtsellInConsegnaTo: any | Date,

    //datas of sell out
    txtSellOutFrom: any | Date,
    txtSellOutTo: any | Date,

    //datas of sconti valuta
    txtSconto1: number,
    txtSconto2: number,
    txtSconto3: number,
    txtSconto4: number,

    //datas of sconti merce
    txtAcquistata: number,
    txtOmaggio: number,

    //datas of Area della promozione
    sarea: string,
    txtDescription: string

}


export const initialValue = {

    //datas of promozioni(01E15777)
    txtCampagna: '',
    txtDescPromozione: '',
    selStatus: '',
    txtDataRevisione: new Date(),
    txtcediFrom: '',
    txtcediTo: '',
    selModeli: '',
    txtCampagnaDelCliente: '',
    txtClusterPuntivendita: '',

    //datas of sell-in ordini
    txtsellInOrdiniFrom: new Date(),
    txtsellInOrdiniTo: new Date(),

    //datas of sell-in consegna
    txtsellInConsegnaFrom: new Date(),
    txtsellInConsegnaTo: new Date(),

    //datas of sell out
    txtSellOutFrom: new Date(),
    txtSellOutTo: new Date(),

    //datas of sconti valuta
    txtSconto1: 0,
    txtSconto2: 0,
    txtSconto3: 0,
    txtSconto4: 0,

    //datas of sconti merce
    txtAcquistata: 0,
    txtOmaggio: 0,

    //datas of Area della promozione
    sarea: '',
    txtDescription: '',

}




const Page = (props: Props) => {

    const pathname = usePathname();
    const currentPage = pathname.split('/').slice(-1)[0];

    const [filter, setFilter] = useState<filterType>(initialValue);

    const onchangeHandler = (key: string, value: string | number) => {
        setFilter({ ...filter, [key]: value })
    }
    const resetHandler = () => {
        setFilter({ ...filter,sarea:'', txtDescription: ''})
    }

    const [showassegnatariPage, setshowassegnatariPage] = useState<boolean>(false);

    return (
        <main>

            <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <Title heading="PROMOZIONE"></Title>
                </div>
                <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                    <div className="link_grp">
                        <ul className="subnav_ul">
                            <li>
                                <button type="button" className="site_btn primary_btn">
                                    Ritorna
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="tab_block">
                <Tabs
                    defaultActiveKey="promozione" id="uncontrolled-tab-example" className="button_tab_block" >
                    <Tab eventKey="promozione" title="PROMOZIONE(01LE15777-VOL.TAV CLASSICHE)">

                        <div className='row'>
                            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12' >
                                <Card>
                                    <div className="row">
                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Codice campagna</label>
                                                <input
                                                    type="text" readOnly={currentPage === 'promozioniView' || currentPage === 'promozioniAdd'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Descrizione campagna</label>
                                                <input
                                                    type="text"
                                                    readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Descrizione promozione</label>
                                                <input
                                                    type="text"
                                                    readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Status della promozione</label>
                                                <select className="form-control" disabled={currentPage === 'promozioniView'}>
                                                    <option value="ATTIVA">ATTIVA</option>
                                                </select>
                                            </div>
                                        </div>


                                        {currentPage === 'promozioniView' && (
                                            <div className="btn_grp">
                                                <button
                                                    type="button"
                                                    className="site_btn primary_btn"
                                                    style={{ backgroundColor: 'green', color: 'white', border: 'green' }}
                                                >
                                                    ATTIVA
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {currentPage === 'promozioniView' && (
                                        <div className="table_section">
                                            <Title heading="Utente authorizzazione"></Title>
                                            <div className="inner-content">
                                                <div className="inner-table-content">
                                                    <div className="table-responsive">
                                                        <table className="table-main table table-striped table-borderless">
                                                            <thead className="sticky-thead">
                                                                <tr>
                                                                    <th>UTENTE</th>
                                                                    <th>DATA</th>
                                                                    <th>STATUS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Administrator</td>
                                                                    <td>15-05-2024 11:25:48 AM</td>
                                                                    <td>OK</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}



                                    <div className="row">
                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Data ultima revisione</label>

                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtDataRevisione}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtDataRevisione', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Periodo prenotazione cedi dal</label>
                                                <input
                                                    type="text" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>


                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Data fine </label>
                                                <input
                                                    type="text" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label> Modalita espositive</label>
                                                <select className="form-control" disabled={currentPage === 'promozioniView'} >
                                                    <option value="Seleziona">Seleziona</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Codice campagna del cliente</label>
                                                <input
                                                    type="text" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>


                                        <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                            <div className="form-group">
                                                <label>Cluster punti vendita</label>
                                                <input
                                                    type="text" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {currentPage === 'promozioniView' &&
                                        <>
                                            <div className="table_section">
                                                <Title heading="Creazione"></Title>
                                                <div className="inner-content">
                                                    <div className="inner-table-content">
                                                        <div className="table-responsive">
                                                            <table className="table-main table table-striped table-borderless">
                                                                <thead className="sticky-thead">
                                                                    <tr>
                                                                        <th>UTENTE</th>
                                                                        <th>DATA</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Administrator</td>
                                                                        <td>27-05-2024 7:18:41 AM</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table_section">
                                                <Title heading="Modifiche"></Title>
                                                <div className="inner-content">
                                                    <div className="inner-table-content">
                                                        <div className="table-responsive">
                                                            <table className="table-main table table-striped table-borderless">
                                                                <thead className="sticky-thead">
                                                                    <tr>
                                                                        <th>UTENTE</th>
                                                                        <th>DATA</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Administrator</td>
                                                                        <td>15-05-2024 11:25:48 AM</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }




                                </Card>
                            </div>

                            <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                <Card>
                                    <Title heading="Sell-in Ordini"></Title>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data inizio</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtsellInOrdiniFrom}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtsellInOrdiniFrom', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data fine</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtsellInOrdiniTo}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtsellInOrdiniTo', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <Title heading="Sell-In Consegna"></Title>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data inizio</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtsellInConsegnaFrom}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtsellInConsegnaFrom', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data fine</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtsellInConsegnaTo}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtsellInConsegnaTo', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <Title heading="Sell-out"></Title>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data inizio</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtSellOutFrom}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtSellOutFrom', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Data fine</label>
                                                <div className="cntrl_grp">
                                                    <DatePicker
                                                        showIcon
                                                        toggleCalendarOnIconClick
                                                        locale="it"
                                                        className="form-control" readOnly={currentPage === 'promozioniView'}
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={filter.txtSellOutTo}
                                                        scrollableYearDropdown
                                                        icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                                            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                                                        </svg>}
                                                        calendarIconClassname='calender-icon-datepicker'
                                                        onChange={(date: any) => {
                                                            onchangeHandler('txtSellOutTo', date);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <Title heading="Sconti valuta(%)"></Title>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>%Sconton 1</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>%Sconton 2</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>%Sconton 3</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>%Sconton 4</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Title heading="Sconti Merce"></Title>
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Quantita acquistata</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label>Quantita in omaggio</label>
                                                <input
                                                    type="number" readOnly={currentPage === 'promozioniView'}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Note</label>
                                        <textarea className="form-control" readOnly={currentPage === 'promozioniView'} style={{ resize: 'both' }}>

                                        </textarea>

                                    </div>
                                </Card>
                            </div>
                        </div>

                        <Card>
                            <div className="row">

                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <Title heading="AREA DELLA PROMOZIONE"></Title>
                                </div>
                            </div>



                            <div className="row">
                                <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                    <div className="form-group">
                                        <label>Codice </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={filter.sarea}
                                            onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                                                setFilter({...filter,sarea : e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                                    <div className="form-group">
                                        <label>Area </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={filter.txtDescription}
                                            onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                                                setFilter({...filter,txtDescription : e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="btn_grp">
                                    <div className="btn_grp_inner">
                                        <button
                                            type="button"
                                            className="site_btn primary_btn"
                                            onClick={resetHandler}
                                            
                                        >
                                            Resettare
                                        </button>
                                        <button
                                            type="button"
                                            className="site_btn brdr_btn"

                                        >
                                            Cerca
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="table_section">

                                <div className="inner-content">
                                    <div className="inner-table-content">
                                        <div className="table-responsive">
                                            <table className="table-main table table-striped table-borderless">
                                                <thead className="sticky-thead">
                                                    <tr>
                                                        <th>-</th>
                                                        <th>Area</th>
                                                        <th>Descrizione</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>-</td>
                                                        <td>Area</td>
                                                        <td>Descrizione</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Card>

                    </Tab>

                    {currentPage === 'promozioniView' &&          
                                   <Tab eventKey="visualizza" title="VISUALIZZA(5-2)">
                            <Tabs
                                defaultActiveKey="gruppi" id="uncontrolled-tab-example" className="button_tab_block" >

                                <Tab eventKey="gruppi" title="GRUPPI(1)">
                                    <GruppiComponent />
                                </Tab>

                                <Tab eventKey="referenze" title="REFERENZE(2)">
                                    <ReferenzeComponent />

                                </Tab>

                            </Tabs>
                        </Tab>
                    }

                    {currentPage === 'promozioniAdd' && (
                        <Tab eventKey="assegnazioni" title="Assegnazioni">
                            <Tabs
                                defaultActiveKey="gruppi" id="uncontrolled-tab-example" className="button_tab_block" >

                                <Tab eventKey="gruppi" title="GRUPPI">
                                    <GruppiComponent />
                                </Tab>

                                <Tab eventKey="sottogruppi" title="SOTTO GRUPPI">
                                    <SottoGruppiComponent />

                                </Tab>

                                <Tab eventKey="puntivendita" title="PUNTI VENDITA">
                                    <PuntivenditaComponent />

                                </Tab>

                                <Tab eventKey="referenze" title="REFERENZE">
                                    <Referenze_addComponent />

                                </Tab>
                            </Tabs>
                        </Tab>

                    )}

                </Tabs>
            </div>
        </main>
    )
}

export default Page
