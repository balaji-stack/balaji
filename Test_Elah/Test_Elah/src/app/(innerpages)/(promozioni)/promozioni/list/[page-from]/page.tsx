"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import ArrowDown from "@/img/arrow-down.png";
import Image from 'next/image';
import { faPlus, faFileExcel, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SERVER_URL, { dateBeforeThreeMonth } from '@/helpers/common'
import axios, { AxiosError } from 'axios'
import CampagnaSearch from '@/app/components/shared/campagna/page'
import ClienteSearch from '@/app/components/shared/ClienteSearch'
import { usePathname, useRouter } from 'next/navigation';
import { popupMsg } from '@/helpers/messages';
import GetioneListLink from './detail-pages/Grupp'
import ReferenzeListLink from './referenze-promozione/ReferenzeListLink'
import AssegnatariListLink from './assegnatari-promozione/AssegnatariListLink'
import PromozioniTable from './PromozioniTable'
import SectionLoader from '@/app/components/shared/SectionLoader'
import NavisionIntegrationListLink from './navision-integration/NavisionIntegrationListLink'
import { Alert } from 'react-bootstrap'


type Props = {}

type selectField = { label: string, value: string };

export type filterType = {//declared types for filter components 
    codice: string,
    description: string,
    status: selectField,
    areaCode: selectField,
    campagna: string,
    autorizza: selectField,
    customerCodice: string,
    promoCreatedFromDate: null | Date,
    promoCreatedToDate: null | Date,
    pageFrom: string,//this is to identify which menu
}


let pg: number = 0;
const size: number = 3;
let orderBy: number = 0;
let colName: string = '';
let order: string = 'asc';

const Page = (props: Props) => {//Main component of the page starts here
    const pathname = usePathname();
    const currentPage = pathname.split('/').slice(-1)[0];
    const initialValue: filterType = {//declared intial values for filter components 
        codice: '',
        description: '',
        status: { label: '', value: '' },
        areaCode: { label: '', value: '' },
        campagna: '',
        autorizza: { label: '', value: '' },
        customerCodice: '',
        promoCreatedFromDate: new Date(dateBeforeThreeMonth),
        promoCreatedToDate: new Date(),
        pageFrom: currentPage == 'gestione' ? '' : currentPage,
    };
    const router = useRouter();//router for page navigation
    /////////////////////////////usestate fields //////////////////////////
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const [listLoading, setListLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [showCampagnaPage, setShowCampagnaPage] = useState<boolean>(false);
    const [showClientSearch, setShowClientSearch] = useState<boolean>(false);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [promozioniList, setPromozioniList] = useState<any>([]);
    const [promozoniCapoArealist, setPromozoniCapoArealist] = useState<selectField[]>([]);
    const [listOpen, setListOpen] = useState<boolean>(true);
    const [showGruppopage, setShowGruppopage] = useState<boolean>(false);
    const [showReferenzepage, setShowReferenzepage] = useState<boolean>(false);
    const [showAssegnataripage, setShowAssegnataripage] = useState<boolean>(false);
    const [showNavisionIntegration, setShowNavisionIntegration] = useState<boolean>(false);
    const [sorting, setSorting] = useState<boolean>(false);
    const [listMsg, setListMsg] = useState<string>('Cerca con filtro per ottenere i dati');
    const [alertMessage, setAlertMessage] = useState('');
    //////////////////////////////////////////////////////////////////////////////////////////////////////   
    const getCapoAreaList = async () => {
        const url = `${SERVER_URL}/promozioni/get-capo-area-list`;
        await axios.get(url, {
            withCredentials: true,
        }).then((response: any) => {
            let apiData = response.data;

            let capoAreaOptions: selectField[] = apiData?.map((it: { Description: string, Code: string }) => {
                return { label: `(${it.Code}) ${it.Description}`, value: it.Code };
            })
            setPromozoniCapoArealist(capoAreaOptions);
        }).catch((err: any) => {
            console.log(err);
        })
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getPromozioniList = async () => {
        const URL = `${SERVER_URL}/promozioni/getPromozioniList?page=${pg}&size=${size}`;
        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, filter,//sorting is done in this page
              //  { ...filter, sortField: colName, sortOrder: order },
                 {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                if (Object.keys(apiData).length === 0) {
                    popupMsg("Nessun dato disponibile dal server.", "info");
                    return;
                }
                pg > 0 ? setPromozioniList((prev: any) => [...prev, ...apiData.promodatalist]) : setPromozioniList(apiData.promodatalist);

                let lastPage = promozioniList.length + apiData.promodatalist.length == apiData.count ||
                    apiData.promodatalist.length < size;
                setIsLastPage(lastPage);
                promozioniList.length == 0 && setListMsg('Nessun dato trovato');
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
            .finally(() => {
                setListLoading(false);
                setMoreLoading(false);
                setRefreshing(false);
                setSorting(false);
                setListOpen(true);
            });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {//to get capoarealist at initial loading
        getCapoAreaList();
    }, []);
    //////////////////////////Handlers////////////////////////////////////////////////////////////////////////
    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }
    const loadmoreHandler = () => {
        setMoreLoading(true);
        pg++;
        getPromozioniList();
    }
    const resetHandler = () => {
        setFilter({ ...initialValue })
    }
    const CloseNavisionHandler = () => {
        setShowNavisionIntegration(false);
        setFilterOpen(true);
        setListOpen(true);
    }
    const searchHandler = () => {

        const isFilterEmpty =
        filter.codice === '' &&
        filter.description === '' &&
        filter.status?.value === '' &&
        filter.areaCode?.value === '' &&
        filter.campagna === '' &&
        filter.autorizza?.value === '' &&
        filter.customerCodice === '' &&
        filter.promoCreatedFromDate === null &&
        filter.promoCreatedToDate === null 

        if (isFilterEmpty) {
            setAlertMessage('Inserisci almeno un filtro prima di cercare');
            return;
          }

        setListLoading(true);
        pg = 0;
        getPromozioniList();
        setAlertMessage('');
    }
    const refreshHandler = () => {
        setRefreshing(true);
        setFilterOpen(false);
        pg = 0;
        getPromozioniList();
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
    ////////////////////////////////////////////////////////////////
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
        setListOpen(true);
    }
    const closeClienteHandler = () => {
        setShowClientSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }
    //////////////////////////////////////////////////////////////////
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const [gruppoListLinkProps, setGruppoListLinkProps] = useState<any>({
        pageFrom: "",
        pageName: "",
        promoId: "",
        campaign: ""
    });
    const listLinkFn = (pageFrom: string, pageName: string, promoId: string, campaign: string) => {
        setGruppoListLinkProps({ pageFrom, pageName, promoId, campaign });
        setShowGruppopage(true);
        setShowCampagnaPage(false);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);
    }
    ///////////
    const [listLinkProps, setListLinkProps] = useState<any>({
        promoId: "",
        campaign: ""
    })

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
    ///////// 
    const [listNavisionLinkProps, setListNavisionLinkProps] = useState<any>({
        promoId: "",
        postingDate: ""
    })

    const navintegrationLinkFn = (promoId: string, postingDate: string) => {
        setListNavisionLinkProps({ promoId, postingDate });
        setShowNavisionIntegration(true);
        setShowGruppopage(false);
        setShowCampagnaPage(false);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);
        setShowReferenzepage(false);
    }
    /////////
    //////////////////////////////Export Handler //////////////////////////
    const exportExcelHandler = async () => {//export promozioni list
        const exportURL = `${SERVER_URL}/export-gestionepromozioni-excel`;
        await axios.post(exportURL, filter, {
            withCredentials: true,
            responseType: 'blob'
        })
            .then((response) => {
                const url = URL.createObjectURL(new Blob([response.data], { type: 'application/octet-stream' }));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'promozioni-list.xlsx'; // replace with your desired filename
                link.click();
            })
            .catch((error) => {
                popupMsg(error.message, "error");

            });
    }
    ///////////////////////////////////////////////Apply colour for each row///////////////////////////////////////////////////////////////////////////////
    useEffect(() => {//apply colour based on status when gestionipromozioniList updated
        const tableEl = document.getElementById('listTable');
        const objStatusEls = tableEl?.querySelectorAll('.obj_status');
        if (objStatusEls) {//if elements present
            for (const element of objStatusEls) {//iterating elements
                const objStatusEl = element as HTMLInputElement;
                let objStatus = objStatusEl.value;
                const objAuthorizationStatusEl = objStatusEl.parentElement?.querySelector('.obj_authorization_status') as HTMLInputElement;
                let objAuthorizationStatus = parseInt(objAuthorizationStatusEl.value, 10);
                const objNavStatusEl = objStatusEl.parentElement?.querySelector('.obj_nav_status') as HTMLInputElement;
                let objNavStatus = parseInt(objNavStatusEl.value, 10);
                let backgroundColorHashCode = '#ffffff';
                if (objStatus == 'Attiva') {
                    if (objNavStatus == 1) {
                        backgroundColorHashCode = '#82EC82';
                    } else if (objNavStatus == 2) {
                        backgroundColorHashCode = '#faa9c8';
                    } else if (objNavStatus == 0) {
                        backgroundColorHashCode = '#FFFFB0';
                    }
                } else if (objAuthorizationStatus == 3) {//Autorizzato
                    backgroundColorHashCode = '#B1FFD2';
                } else if (objAuthorizationStatus == 2) {//Da autorizzare
                    backgroundColorHashCode = '#fbe08f';
                } else if (objAuthorizationStatus == 0) {//Non autorizzato
                    backgroundColorHashCode = '#FFA581';
                } else if (objAuthorizationStatus == 4) {//Dati incompleti
                    backgroundColorHashCode = '#dfdfdf';
                }
                const trEl = objStatusEl.parentElement?.parentElement;
                const tdEls = trEl?.childNodes;

                if (tdEls) {//if elements present
                    for (const element of tdEls) {//iterating elements
                        const tdEl = element as HTMLInputElement;
                        tdEl.setAttribute("style", `background-color: ${backgroundColorHashCode}`);
                    }
                }

            }
        }
    }, [promozioniList]);
    ///////////////////////////////////////////////Sorting handler function/////////////////////////////////////////////////////////////////////////////////////
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
        getPromozioniList();//get sorted data from the api
        e.stopPropagation();
        setListOpen(true);
      }
    //////////////////////////////////////////////////Props for components//////////////////////////////////////////////////////////////////////////////////////////
    let filterComponentProps = { filter, onChangeHandler, resetHandler, searchHandler, showCampagnaHandler, showClienteHandler, promozoniCapoArealist };
    let promozioniTableProps = { filter, promozioniList, loadmoreHandler, isLastPage, moreLoading, listLinkFn, referenzeLinkFn, assegnatariLinkFn, navintegrationLinkFn, sortingHandler, sorting,listMsg };
    let campagnaSearchProps = { selectedCampagna: filter.campagna,chooseCampagnaHandler, closeCampagnaHandler };
    let clienteSearchProps = { selectedCliente: filter.customerCodice,chooseClienteHandler, closeClienteHandler };
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
                                    onClick={() => setFilterOpen(!filterOpen)}
                                > <Image src={ArrowDown} alt="Image" />
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
                        <FilterComponent {...filterComponentProps} />
                    </div>
                </div>
            </Card>
            {listLoading ? <SectionLoader Size='20' /> :
                <Card padding="20px">
                    <div className="table_data">
                        <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <Title heading="LISTA"></Title>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                                <div className='link_grp mt-4'>
                                    <ul className='subnav_ul_block'>
                                        <li>
                                            <button type='button' className='site_btn primary_btn' style={{ minWidth: "300px" }}
                                                onClick={() => router.push("./gestione-promozioni/Aggiungi-promozioni-per-cliente")}>
                                                <FontAwesomeIcon icon={faPlus} />&nbsp;
                                                Aggiungi promozioni per cliente
                                            </button>
                                        </li>
                                        <li>
                                            <button type='button' className='site_btn primary_btn' style={{ minWidth: "300px" }}
                                                onClick={() => router.push("../promozioniAdd")}>
                                                <FontAwesomeIcon icon={faPlus} />&nbsp;
                                                Aggiungi nuova promozione
                                            </button>
                                        </li>
                                        {promozioniList?.length > 0 &&
                                            <li>
                                                <button type='button' className='site_btn primary_btn' style={{ minWidth: "100px" }}
                                                    onClick={refreshHandler}>
                                                    <FontAwesomeIcon icon={faArrowsRotate} />&nbsp;
                                                    Refresh
                                                </button>
                                            </li>
                                        }
                                        {currentPage == "gestione" &&
                                            <li>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="site_btn primary_btn"
                                                        style={{ minWidth: "100px" }}
                                                        onClick={exportExcelHandler}
                                                    >
                                                        <FontAwesomeIcon icon={faFileExcel} />&nbsp; Export
                                                    </button>
                                                </div>
                                            </li>
                                        }

                                    </ul>
                                </div>
                                {
                                    refreshing ? <SectionLoader Size='50px' />
                                        :
                                        <PromozioniTable {...promozioniTableProps} />
                                }
                            </div>
                        </div>
                    </div>
                </Card>
            }

            {showCampagnaPage && <div id="campagna_search" >
                <CampagnaSearch {...campagnaSearchProps} />
            </div>
            }


            {showClientSearch && <div id="cliente_search" >
                <ClienteSearch {...clienteSearchProps} />
            </div>
            }


            {showGruppopage && <div id="gruppo_link" >
                <GetioneListLink {...gruppoListLinkProps} CloseGruppoHandler={CloseGruppoHandler} />
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
            {showNavisionIntegration && <div id="navisionintegration_link">
                <NavisionIntegrationListLink  {...listNavisionLinkProps} CloseNavisionHandler={CloseNavisionHandler} />
            </div>
            }

        </>

    )
}

export default Page