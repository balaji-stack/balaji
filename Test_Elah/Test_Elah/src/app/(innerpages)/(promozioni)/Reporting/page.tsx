
"use client"
import React, { useState, useEffect } from 'react'
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import ClienteSearch from '@/app/components/shared/ClienteSearch';
import FilterComponent from './FilterComponent';
import ReportingPromozioniTable from './ReportingPromozioniTable'
import CampagnaSearch from '@/app/components/shared/campagna/page'
import AgenteSearch from '@/app/components/shared/AgenteSearch';
import UtenteSearch from '@/app/components/shared/UtenteSearch/page';
import SERVER_URL,{ dateBeforeThreeMonth } from '@/helpers/common';
import axios from 'axios';
import ArrowDown from "../../../../img/arrow-down.png";
import Image from 'next/image'
import { ToastContainer } from 'react-toastify';
import NrprLink from './nrpr/NrprLink';
import { popupMsg } from '@/helpers/messages';
import SectionLoader from '@/app/components/shared/SectionLoader';

type Props = {}

type selectField = { label: string, value: string };

export type filterType = {
    code: string,
    campagnaCode: string,
    reportArea: selectField,
    supergruppo: selectField,
    gruppo: selectField,
    sottogruppo: selectField,
    Codicerep: string,
    Agentname: string,
    status: selectField,
    promoCreatedFromDate: null | Date,
    promoCreatedToDate: null | Date,
    strCode : any,
    
}
export const initialValue: filterType = {
    code: '',
    campagnaCode: '',
    reportArea: { label: '', value: '' },
    supergruppo: { label: '', value: '' },
    gruppo: { label: '', value: '' },
    sottogruppo: { label: '', value: '' },
    Codicerep: '',
    Agentname: '',
    status: { label: '', value: '' },
    promoCreatedFromDate: new Date(dateBeforeThreeMonth),
    promoCreatedToDate: new Date(),
    strCode : '',
    
};

let pg: number = 0;
const size: number = 10;

const Page = (props: Props) => {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);

    const [showCampagnaPage, setShowCampagnaPage] = useState<boolean>(false);
    const [showClientSearch, setShowClientSearch] = useState<boolean>(false);
    const [showAgenteSearch, setShowAgenteSearch] = useState<boolean>(false);
    const [showUtenteSearch, setShowUtenteSearch] = useState<boolean>(false);
    const [promozoniCapoArealist, setPromozoniCapoArealist] = useState<selectField[]>([]);
    const [reportingList, setReportingList] = useState<any>([]);
    const [reportingListLoading,setReportingListLoading] = useState<boolean>(false);
    const [listOpen, setListOpen] = useState<boolean>(true);
    const [showNrPr, setShowNrPr] = useState<boolean>(false);
    const [promozoniAssotiDropDown, setPromozoniAssotiDropDown] = useState<selectField[]>([]);
    const [promozoniGruppodropDown, setPromozoniGruppodropDown] = useState<selectField[]>([]);
    const [promozoniSottoGruppodropDown, setPromozoniSottoGruppodropDown] = useState<selectField[]>([]);

    const getReportingList = async () => {
        const URL = `${SERVER_URL}/promozionireport/promozionireportlist?page=${pg}&size=${size}`;
        
        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, filter , {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    pg > 0 ? setReportingList((prev: any) => [...prev, ...apiData.promozioniReportList]) : setReportingList(apiData.promozioniReportList);


                    let lastPage = reportingList.length + apiData.promozioniReportList.length == apiData.count || apiData.promozioniReportList.length < size;
                    setIsLastPage(lastPage);
                    setIsSectionLoading(false);
            })
            .catch((error) => {            
                popupMsg(error.message,"error");
            }).finally(()=>{
                setReportingListLoading(false);

            });
    }


    const getCapoAreaList = async () => {
        const URL = `${SERVER_URL}/Common/getCapoAreaList?page=${pg}&size=${size}`;

        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, {}, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    let areaList: selectField[] = apiData.capoAreaList?.map((it: any) => {
                        return { label: `(${it.Code}) ${it.Description}`, value: it.Code }
                    })
                    setPromozoniCapoArealist(areaList);//setting capoArea select option      
                    setIsSectionLoading(false);
            })
            .catch((error) => {            
                popupMsg(error.message,"error");
            }).finally(()=>{
                setReportingListLoading(false);

            });
    }


    const getGestioneAssortimentoDropDown = async () => {
        const URL = `${SERVER_URL}/Common/getGestioneAssortiDropDown?page=${pg}&size=${size}`;

        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, {}, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    let assortiDropDown: selectField[] = apiData.assortimentoDropDown?.map((it: any) => {
                        return { label: `(${it.Code}) ${it.Description}`, value: it.Code }
                    })
                    setPromozoniAssotiDropDown(assortiDropDown);//setting capoArea select option
                    setIsSectionLoading(false);
            })
            .catch((error) => {            
                popupMsg(error.message,"error");
            }).finally(()=>{
                setReportingListLoading(false);

            });
    }

    
    useEffect(() => {
        pg = 0;
        getCapoAreaList();
        getGestioneAssortimentoDropDown();
    }, [])
    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getReportingList();
    }

    const resetHandler = () => {
        setFilter({ ...initialValue })
    }

    const searchHandler = () => {
        setReportingListLoading(true);
        pg = 0;
        getReportingList();
    }


    const chooseCampagnaHandler = (value: any) => {
        setFilter({ ...filter, 'campagnaCode': value });
        setShowCampagnaPage(false);
    }


    const showCampagnaHandler = () => {
        setShowCampagnaPage(true);
        setShowClientSearch(false);
        setShowAgenteSearch(false);
        setShowUtenteSearch(false);
        setFilterOpen(false);
        setListOpen(false);


    }
   
    
    const closeCampagnaHandler = () => {
        setShowCampagnaPage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const chooseClientHandler = (value: any) => {
        setFilter({ ...filter, 'Codicerep': value });
        setShowClientSearch(false);
    }


    const showClienteHandler = () => {
        setShowClientSearch(true);
        setShowCampagnaPage(false);
        setFilterOpen(false);
        setListOpen(false);
    }


    const closeClienteHandler = () => {
        setShowClientSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }


    const chooseAgenteHandler = (value: any) => {
        setFilter({ ...filter, 'Agentname': value });
        setShowAgenteSearch(false);
    }


    const showAgenteHandler = () => {
        setShowAgenteSearch(true);
        setShowClientSearch(false);
        setShowCampagnaPage(false);
        setFilterOpen(false);
        setListOpen(false);
    }


    const closeAgenteHandler = () => {
        setShowAgenteSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const chooseUtenteHandler = (value: any) => {
        setFilter({ ...filter, 'Agentname': value });
        setShowUtenteSearch(false);
    }

    const showUtenteHandler = () => {
        setShowUtenteSearch(true);
        setShowAgenteSearch(false);
        setShowClientSearch(false);
        setShowCampagnaPage(false);
        setFilterOpen(false);
        setListOpen(false);
    }


    const CloseUtenteHandler = () => {
        setShowUtenteSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const nrPrLinkFn = (codice: string) => {
        setFilter((prev: filterType) =>{
            return {...prev,campagnaCode : codice}
        })
        setShowNrPr(true);
        setFilterOpen(false);
        setListOpen(false);
    }
    const closeNrPrLinkHandler = () => {
        setShowNrPr(false);
        setFilterOpen(true);
        setListOpen(true);
    }
   
    const showGruppoSottoOptionsDropDown = async (supergruppo: selectField, type: string) => {

        const URL = `${SERVER_URL}/Common/getSurveySottoGruppolistDropDown?pageFrom="merchandisingReport"&type=${type}&criteria=${supergruppo.value}`;

        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, {}, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    let gruppoSottoDropDown: selectField[] = apiData.sottoGroupDropDown?.map((it: any) => {
                        return { label: `(${it.Code}) ${it.Description}`, value: it.Code }
                    })
                    if(type=="gruppo"){
                        setPromozoniGruppodropDown(gruppoSottoDropDown);//setting capoArea select option
                    }
                    else
                    setPromozoniSottoGruppodropDown(gruppoSottoDropDown);         
                    setIsSectionLoading(false);
            })
            .catch((error) => {            
                popupMsg(error.message,"error");
            }).finally(()=>{
                setReportingListLoading(false);

            });
    }

   

    useEffect(()=>{//function when superGruppo change
        if(filter.supergruppo.value !='')
        {
        setFilter((prev)=>{//getting latest value of superGruppo
            showGruppoSottoOptionsDropDown(prev.supergruppo,"gruppo");
            return prev;
        });
       
    }
    },[filter.supergruppo]);

    useEffect(()=>{//function when Gruppo change
        if(filter.gruppo.value !='')
        {     
        let superGr = {};
        setFilter((prev)=>{//getting latest value of Gruppo
            showGruppoSottoOptionsDropDown(prev.gruppo,"sottogroup");
            return prev;
        });
    }
    },[filter.gruppo]);

    return (

            <main>
                <Card padding="20px">
                    <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                <Title heading="RICERCA PROMOZIONI"></Title>
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
                        style={{ 'display': 'none' }}
                    >
                        <div className="content_form content_form-filter">
                            <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                resetHandler={resetHandler} searchHandler={searchHandler}
                                showCampagnaHandler={showCampagnaHandler} showClienteHandler={showClienteHandler}
                                showAgenteHandler={showAgenteHandler} showUtenteHandler={showUtenteHandler}
                               
                                promozoniCapoArealist={promozoniCapoArealist} promozoniAssotiDropDown ={promozoniAssotiDropDown}   
                                promozoniGruppodropDown ={promozoniGruppodropDown} promozoniSottoGruppodropDown ={promozoniSottoGruppodropDown}/>
                        </div>
                    </div>
                </Card>
                {reportingListLoading ? <SectionLoader Size='20'/>
                :
                <Card padding="20px">
                    <div className="table_data">
                        <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <Title heading="Statistica Promozioni"></Title>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    
                                    <div className="title_block-arrow" style={{ paddingBottom: '10px' }}>
                                        <button
                                            type="button"
                                            className="filter-arrow"
                                            onClick={() => setListOpen(!listOpen)}
                                        >
                                            <Image src={ArrowDown} alt="Image" />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div
                            className={`form_block ${listOpen ? "filter_show" : ""}`}
                            style={{ display: 'none' }}
                        >
                            <div className="content_form content_form-filter">

                                <ReportingPromozioniTable reportingListLoading={reportingListLoading} filter={filter} reportingList={reportingList} loadmoreHandler={loadmoreHandler}
                                    isLastPage={isLastPage} isSectionLoading={isSectionLoading} nrPrLinkFn={nrPrLinkFn} />
                            </div>
                        </div>
                    </div>

                    <ToastContainer />
                </Card>
               }

                {showCampagnaPage && <div id="campagna_search">
                    <CampagnaSearch selectedCampagna={filter.campagnaCode} chooseCampagnaHandler={chooseCampagnaHandler}
                closeCampagnaHandler={closeCampagnaHandler} />
                </div>
                }

                {showClientSearch && <div id="cliente_search">
                    <ClienteSearch selectedCliente={filter.Codicerep} chooseClienteHandler={chooseClientHandler}
                closeClienteHandler={closeClienteHandler} />
                </div>
                }
                {showAgenteSearch && <div id="agente_search">
                    <AgenteSearch selectedAgent={filter.Agentname} chooseAgenteHandler={chooseAgenteHandler}
                closeAgenteHandler={closeAgenteHandler} />
                </div>
                }
                {showUtenteSearch && <div id="utente_search">
                    <UtenteSearch chooseUtenteHandler={chooseUtenteHandler} showUtenteHandler={showUtenteHandler}
                        CloseUtenteHandler={CloseUtenteHandler} />
                </div>
                }
                {showNrPr && <div id='nrpr_link'>
                    <NrprLink filter={filter} closeNrPrLinkHandler={closeNrPrLinkHandler} />
                </div>}

            </main>
    )
}

export default Page