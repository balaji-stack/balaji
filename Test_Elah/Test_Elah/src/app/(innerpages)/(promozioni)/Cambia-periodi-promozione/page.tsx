"use client"

import React, { useEffect, useState } from "react";
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import ArrowDown from "../../../../img/arrow-down.png";
import Image from 'next/image'
import FilterComponent from "./FilterComponent";
import CambiaPeriodiTable from "./CambiaPeriodiTable";
import SERVER_URL, { getOrderBy } from "@/helpers/common";
import axios, { AxiosError } from "axios";
import { Alert, ToastContainer } from "react-bootstrap";
import ClienteSearch from "@/app/components/shared/ClienteSearch";
import SectionLoader from "@/app/components/shared/SectionLoader";
import CampagnaSearch from "@/app/components/shared/campagna/page";
import ReferenzeListLink from "../promozioni/list/[page-from]/referenze-promozione/ReferenzeListLink";
import AssegnatariListLink from "../promozioni/list/[page-from]/assegnatari-promozione/AssegnatariListLink";
import GetioneListLink from "../promozioni/list/[page-from]/detail-pages/Grupp";
import { popupMsg } from "@/helpers/messages";
import { useRouter } from "next/navigation";


type Props = {}
export type selectField = { label: string, value: string };

export type filterType = {
    campagna: string,
    description: string,
    areaCode: selectField,
    codice: string,
    promoCreatedFromDate: null | Date,
    promoCreatedToDate: null | Date,
    customerCodice: string,  
}

let pg: number = 0;
const size: number = 5;
let colName: string = '';
let order: string = 'asc';
export const initialValue = {
    campagna: '',
    description: '',
    areaCode: { label: '', value: '' },
    codice: '',
   // promoCreatedFromDate: new Date(dateBeforeThreeMonth),
    promoCreatedFromDate: new Date('01-01-2018'),
    promoCreatedToDate: new Date(),
    customerCodice: '',
};


const Page = (props: Props) => {


    const router = useRouter();
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [cambiaPeriodiListLoading, setCambiaPeriodiListLoading] = useState<boolean>(false);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [showCampagnaPage, setShowCampagnaPage] = useState<boolean>(false);
    const [showClientSearch, setShowClientSearch] = useState<boolean>(false);
    
    const [cambiaPeriodiPromozioniList, setCambiaPeriodiPromozioniList] = useState<any>([]);
    const [promozoniCapoArealist, setPromozoniCapoArealist] = useState<selectField[]>([]);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [listOpen, setListOpen] = useState<boolean>(true);

    const [showGruppopage, setShowGruppopage] = useState<boolean>(false);
    const [showReferenzepage, setShowReferenzepage] = useState<boolean>(false);
    const [showAssegnataripage, setShowAssegnataripage] = useState<boolean>(false);
    const [listMsg, setListMsg] = useState<string>('Cerca con filtro per ottenere i dati');
    const [sorting, setSorting] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };
   
    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }

    const getCapoAreaList = async () => {
        const url = `${SERVER_URL}/promozioni/get-capo-area-list`;
        await axios.get(url,{
            withCredentials : true,
        }).then((response: any)=>{
            let apiData = response.data;
            let capoAreaOptions = apiData?.map((it: {Description: string, Code: string})=>{
                return {label: it.Description , value: it.Code};
            })
            setPromozoniCapoArealist(capoAreaOptions);
        }).catch((err: any) =>{
            console.log(err);
        })
    }

    const getPromozioniCambiaperiodiList = async () => {
        const url = `${SERVER_URL}/promozioni/getPromozioniCambiaperiodiList?page=${pg}&size=${size}`;
        // Using the AXIOS library to make a POST request
        await axios
            .post(url, filter, {
                withCredentials: true,
            })
            .then((response: any) => {
                let apiData = response.data;
                if (Object.keys(apiData).length === 0) {
                    popupMsg("Nessun dato disponibile dal server.", "info");
                    return;
                }
                pg > 0 ? setCambiaPeriodiPromozioniList((prev: any) => [...prev, ...apiData.cambiaperiodiList]) : setCambiaPeriodiPromozioniList(apiData.cambiaperiodiList);
                let lastPage = cambiaPeriodiPromozioniList.length + apiData.cambiaperiodiList.length == apiData.count ||
                        apiData.cambiaperiodiList.length < size;
                    setIsLastPage(lastPage);
                    cambiaPeriodiPromozioniList.length == 0 && setListMsg('Nessun dato trovato');
            })
            .catch((e: AxiosError) => {
                let status = e.status;
                if (status === 401) {
                    popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
                    router.push('/login');
                } else {
                    popupMsg("qualcosa è andato storto", "error");
                }
            })
            .finally(()=>{
                setCambiaPeriodiListLoading(false);
                setMoreLoading(false);
                setSorting(false);
            });
    }

    useEffect(()=>{//to get capoarealist at initial loading
        getCapoAreaList();
    },[]);

    const resetHandler = () => {
        setFilter({ ...initialValue })  
    }

    const searchHandler = () => {

        const isFilterEmpty =
        filter.campagna === '' &&
        filter.description === '' &&
        filter.areaCode?.value === '' &&
        filter.codice === '' &&
        filter.customerCodice === '' &&
        filter.promoCreatedFromDate === null &&
        filter.promoCreatedToDate === null 

        if (isFilterEmpty) {
            setAlertMessage('Inserisci almeno un filtro prima di cercare');
            return;
          }

        pg = 0;
        setCambiaPeriodiListLoading(true);
        getPromozioniCambiaperiodiList();
        setFilterOpen(false);
        setListOpen(true);
        setAlertMessage('');
    }

    const loadmoreHandler = () => {
        setMoreLoading(true);
        pg++;
        getPromozioniCambiaperiodiList();
    }

    const showCampagnaHandler = () => {
        setShowCampagnaPage(true);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);

    }
    const chooseCampagnaHandler = (value: any) => {
        setFilter({ ...filter, campagna: value });
        setShowCampagnaPage(false);
        setFilterOpen(true);
    }

    const closeCampagnaHandler = () => {
        setShowCampagnaPage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const showClienteHandler = () => {
        setShowClientSearch(true);
        setShowCampagnaPage(false);
        setFilterOpen(false);
        setListOpen(false);
    }


    const chooseClienteHandler = (value: any) => {
        setFilter({ ...filter, customerCodice: value });
        setShowClientSearch(false);
        setFilterOpen(true);
    }

    const closeClienteHandler = ()=>{
        setShowClientSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const CloseGruppoHandler = () => {
        setShowGruppopage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const CloseReferenzeHandler = () => {
        setShowReferenzepage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const CloseAssegnatariHandler = () => {
        setShowAssegnataripage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const [gruppoListLinkProps, setGruppoListLinkProps] = useState<any>({
        pageFrom: "",
        pageName: "",
        promoId: "",
        campaign: ""
    });

    const [listLinkProps, setListLinkProps] = useState<any>({
        promoId: "",
        campaign: ""
    })


    const listLinkFn = (pageFrom: string, pageName: string, promoId: string, campaign: string) => {
        setGruppoListLinkProps({ pageFrom, pageName, promoId, campaign });
        setShowGruppopage(true);
        setShowCampagnaPage(false);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);
    }
    const referenzeLinkFn = (promoId: string, campaign: string) => {
        setListLinkProps({ promoId, campaign });
        setShowReferenzepage(true);
        setShowGruppopage(false);
        setShowCampagnaPage(false);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);
    }



    const assegnatariLinkFn = (promoId: string, campaign: string) => {
        setListLinkProps({ promoId, campaign });

        setShowAssegnataripage(true);
        setShowReferenzepage(false);
        setShowGruppopage(false);
        setShowCampagnaPage(false);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);
    }


    const sortingHandler = (e: any, indexName: string) => {
        //classList manipulation
        const EL = e.target;
        const thEl = EL.closest('th');
        const activeEl = thEl.closest('tr').querySelector('.sort_active');
        activeEl?.classList.remove("sort_active");
        const ascEL = thEl.querySelector(".ascending");
        const descEL = thEl.querySelector(".descending");
        if (colName == "" || colName != indexName || (colName == indexName && activeEl?.classList.contains("descending"))) {
          ascEL.classList.add("sort_active");
          order = "asc";
        } else {
          descEL.classList.add("sort_active");
          order = "desc"
        }
        colName = indexName;//assigning column name for sorting
        setSorting(true);
        pg = 0;
        getPromozioniCambiaperiodiList();//get sorted data from the api
        e.stopPropagation();
        setListOpen(true);
      }

    const filterComponentProps = {filter,onChangeHandler,resetHandler,searchHandler,showCampagnaHandler,showClienteHandler,promozoniCapoArealist};
    const  cambiaPeriodiTableProps = {filter,cambiaPeriodiPromozioniList,loadmoreHandler,isLastPage,moreLoading,listLinkFn,referenzeLinkFn,assegnatariLinkFn,listMsg,sortingHandler, sorting};
    const campagnaSearchProps = {selectedCampagna : filter.campagna,chooseCampagnaHandler,showCampagnaHandler,closeCampagnaHandler};
    const clienteSearchProps = {selectedCliente : filter.customerCodice, chooseClienteHandler,showClienteHandler,closeClienteHandler};
    return (

                <>
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
                                {alertMessage && <Alert variant="warning">{alertMessage}</Alert>}
                                    
                                    <FilterComponent {...filterComponentProps}  />
                                </div>
                            </div>
                        </Card>
                        {cambiaPeriodiListLoading ? <SectionLoader Size="20"/>
                        :
                        <Card padding="20px">
                            <div className="table_data">
                            <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>
                                   
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <Title heading="LISTA"></Title>
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
                                    <CambiaPeriodiTable {...cambiaPeriodiTableProps} />
                                 </div>
                                </div>
                            </div>
                       
                        <ToastContainer />
                        </Card>
                     }

                {showCampagnaPage && <div id="campagna_search" >
                        <CampagnaSearch {...campagnaSearchProps}/>
                    </div>
                    }
                  {showClientSearch &&  <div id="cliente_search">
                        <ClienteSearch {...clienteSearchProps} />
                    </div>
                    }
                    {showGruppopage && <div id="gruppo_link" >
                        <GetioneListLink  {...gruppoListLinkProps} CloseGruppoHandler={CloseGruppoHandler} />
                    </div>
                    }
                    {showAssegnataripage && <div id="assegnatari_link">
                        <AssegnatariListLink  {...listLinkProps} CloseAssegnatariHandler={CloseAssegnatariHandler} />
                    </div>
                    }
                    {showReferenzepage && <div id="referenze_link">
                        <ReferenzeListLink  {...listLinkProps} CloseReferenzeHandler={CloseReferenzeHandler} />
                    </div>
                    }
                </>


    )


}
export default Page