"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import ArrowDown from "@/img/arrow-down.png";
import Image from 'next/image'
import VisualizzazionePromozioniTable from './VisualizzazionePromozioniTable'
import SERVER_URL, {getOrderBy } from '@/helpers/common'
import ClienteSearch from '@/app/components/shared/ClienteSearch'
import CampagnaSearch from '@/app/components/shared/campagna/page'
import { ToastContainer } from 'react-toastify'
import FullPageLoader from '@/app/components/shared/FullPageLoader'
import { popupMsg } from '@/helpers/messages'
import axios from 'axios'

type Props = {}
type selectField = { label: string, value: string };
export type filterType = {
  
    code: string,
    description: string,
    sStatus: string,
    sArea: string,
    sCampagna: string,
    sautorizza: string,
    tclientname: string,
    promoCreatedFromDate: null|Date,
    promoCreatedToDate: null|Date
    pageFrom : string
 
}
let pg: number = 0;
const size: number = 3;
let orderBy: number = 0;
let fieldNames = ['Codice', 'campaign', 'Description', 'Data', 'DataIn', 'gruppo', 'sotto', 'pvCounts','ItemsCount','authorization','status','Nav_Promotion_Code'];//names used for showing value of each column from backend
export const initialValue = {
    
    code :'',
    description :'',
    sStatus :'',
    sArea :'',
    sCampagna :'',
    sautorizza :'',
    tclientname :'',
      //  promoCreatedFromDate: new Date(dateBeforeThreeMonth),
    promoCreatedFromDate : new Date('2010-02-01'),
    promoCreatedToDate :new Date(),
    pageFrom : 'visualizzazione' 
   
};

const Page = (props: Props) => {


    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [showCampagnaPage, setShowCampagnaPage] = useState<boolean>(false);
    const [showClientSearch, setShowClientSearch] = useState<boolean>(false);
    
    const [visualizzazionePromozioniList, setVisualizzazionePromozioniList] = useState<any>([]);
    const [promozoniCapoArealist, setPromozoniCapoArealist] = useState<selectField[]>([]);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [listOpen, setListOpen] = useState<boolean>(true);

    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };
    
    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }
    const resetHandler = () => {
        setFilter({ ...initialValue })      
    }


    const getVisualizzazioneList = async () =>{
        const URL = `${SERVER_URL}/promozioni/getPromozioniList?page=${pg}&size=${size}`;
        
        // Using the AXIOS library to make a POST request
        await axios
            .post(URL, filter, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    let areaList :selectField[] = apiData.PromozoniCapoArealist?.map((it: any) => {
                        return { label: `(${it.code}) ${it.description}`, value: it.code }
                    })
                    setPromozoniCapoArealist(areaList);
                    pg > 0  ? setVisualizzazionePromozioniList((prev: any) => [...prev, ...apiData.promodatalist]) : setVisualizzazionePromozioniList(apiData.promodatalist);

                    let lastPage = visualizzazionePromozioniList.length + apiData.promodatalist.length == apiData.count ||
                                    apiData.promodatalist.length < size;
                    setIsLastPage(lastPage);
                    setIsLoading(false);
                    setIsSectionLoading(false);
            })
            .catch((error) => {
                popupMsg(error.message,"error");

            })
            .finally(()=>{              
                setIsLoading(false);
                setIsSectionLoading(false);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        pg = 0;
        getVisualizzazioneList();
    }, [])
   
    const searchHandler = () => {

        setIsLoading(true);
        pg = 0;
        getVisualizzazioneList();
    }


    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getVisualizzazioneList();
    }

    const showCampagnaHandler = () => {
        setShowCampagnaPage(true);
        setShowClientSearch(false);
        setFilterOpen(false);
        setListOpen(false);

    }
    const chooseCampagnaHandler = (value: any) => {
        setFilter({ ...filter, sCampagna: value });
        setShowCampagnaPage(false);
        setFilterOpen(true);
    }
   
    const closeCampagnaHandler = ()=>{
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
        setFilter({ ...filter, tclientname: value });
        setShowClientSearch(false);
        setFilterOpen(true);
    }

    const closeClienteHandler = ()=>{
        setShowClientSearch(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const orderByHandler = (e: any, colName: string, tableFields: string[]) => {
        orderBy = getOrderBy(colName, tableFields.slice(1), fieldNames, visualizzazionePromozioniList, setVisualizzazionePromozioniList, orderBy);//getting orderBy function
        if (orderBy < 1) {
            return false;
        }
        const EL = e.target;//getting current element 
        const thEl = EL.closest('th');
        const activeEl = thEl.closest('tr').querySelector('.sort_active');
        activeEl?.classList.remove("sort_active");
        if (orderBy % 2 != 0) {
            const ascEL = thEl.querySelector(".ascending");
            ascEL.classList.add("sort_active");
        } else {
            const descEL = thEl.querySelector(".descending");
            descEL.classList.add("sort_active");
        }
        e.stopPropagation();
    }


    return (
        <>
        {isLoading ? <FullPageLoader />
            :
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
                               <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                    resetHandler={resetHandler} searchHandler={searchHandler}
                                    showCampagnaHandler={showCampagnaHandler}
                                    showClienteHandler={showClienteHandler} promozoniCapoArealist={promozoniCapoArealist} />
                            </div>
                        </div>
                    </Card>
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
                                
                                <VisualizzazionePromozioniTable filter={filter}  loadmoreHandler={loadmoreHandler}
                            isLastPage={isLastPage} isSectionLoading={isSectionLoading} orderByHandler={orderByHandler} 
                            visualizzazionePromozioniList ={visualizzazionePromozioniList}/>
                                </div>
                            </div>
                        </div>
                   
                    <ToastContainer />
                    </Card>
                    
                
                <div id="campagna_search" style={{ display: showCampagnaPage ? 'contents' : 'none' }}>
                    <CampagnaSearch selectedCampagna={filter.sCampagna} chooseCampagnaHandler={chooseCampagnaHandler}
                        closeCampagnaHandler={closeCampagnaHandler} />
                </div>


                <div id="cliente_search" style={{ display: showClientSearch ? 'contents' : 'none' }}>
                    <ClienteSearch selectedCliente={filter.tclientname} chooseClienteHandler={chooseClienteHandler}
                        closeClienteHandler={closeClienteHandler} />
                </div>
                
            </>
        }
    </>

    )
}

export default Page