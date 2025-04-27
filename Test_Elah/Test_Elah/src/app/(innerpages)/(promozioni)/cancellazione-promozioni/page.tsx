"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, {  useEffect, useState } from 'react'
import ArrowDown from "../../../../img/arrow-down.png";
import Image from 'next/image'
import SERVER_URL, { dateBeforeThreeMonth } from '@/helpers/common';
import FilterComponent from './FilterComponent';
import CancellazionePromozioniTable from './cancellazionepromozioniTable';
import CampagnaSearch from '@/app/components/shared/campagna/page';
import { ToastContainer } from 'react-toastify';
import { popupMsg } from '@/helpers/messages';
import axios, { AxiosError } from 'axios';
import PromoInfoListLink from '@/app/(innerpages)/(promozioni)/cancellazione-promozioni/promozione-informazione/PromoInfoListLink'
import ReferenzeListLink from '../promozioni/list/[page-from]/referenze-promozione/ReferenzeListLink';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from 'next/navigation';
import { Alert } from 'react-bootstrap';

type Props = {}

type selectField = { label: string, value: string };

export type filterType = {

  code: string,
  description: string,
  sStatus: selectField,
  sCampagna: string,
  txtpromoCreatedFromDate: null | Date,
  txtPromoCreatedToDate: null | Date,
  sautorizza: selectField,
  sStatusCancella: selectField,
  sArea: selectField,
 

}

let pg: number = 0;
const size: number = 10;
let colName: string = '';
let order: string = 'asc';

export const initialValue: filterType = {

  code: '',
  description: '',
  sStatus:  { label: '', value: '' },
  sCampagna: '',
  txtpromoCreatedFromDate: new Date(dateBeforeThreeMonth),
  txtPromoCreatedToDate: new Date(),
  sautorizza:  { label: '', value: '' },
  sStatusCancella:  { label: '', value: '' },
  sArea:  { label: '', value: '' },
 

};


const Page = (props: Props) => {
    const router = useRouter();
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const [listLoading, setListLoading] = useState<boolean>(false);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [showCampagnaPage, setShowCampagnaPage] = useState<boolean>(false);
    const [cancellazionePromozioniList, setCancellazionePromozioniList] = useState<any>([]);
    const [promozoniCapoArealist, setPromozoniCapoArealist] = useState<selectField[]>([]);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [listOpen, setListOpen] = useState<boolean>(true);
    const [listMsg, setListMsg] = useState<string>('Cerca con filtro per ottenere i dati');
    const [showReferenzepage, setShowReferenzepage] = useState<boolean>(false);
    const [showPromoInfopage, setShowPromoInfopage] = useState<boolean>(false);
    const [sorting, setSorting] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
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
    useEffect(()=>{//to get capoarealist at initial loading
           getCapoAreaList();
       },[]);

    const getCancelPromozioniList = async () => {
        const URL = `${SERVER_URL}/promozioni/getPromozioniCancellazioneList?page=${pg}&size=${size}`;
        // Using the AXIOS library to make a POST request
        await axios
            .post(URL,filter,//sorting is done in this page
                 // { ...filter, sortField: colName, sortOrder: order },
                   {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    pg > 0 ? setCancellazionePromozioniList((prev: any) => [...prev, ...apiData.promotionCancel]) : setCancellazionePromozioniList(apiData.promotionCancel)
                    cancellazionePromozioniList.length == 0 && setListMsg('Nessun dato trovato');
                    let lastPage = cancellazionePromozioniList.length + apiData.promotionCancel.length == apiData.count ||
                        apiData.promotionCancel.length < size;
                    setIsLastPage(lastPage);
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
                setSorting(false);
            });
    }

    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }


    const resetHandler = () => {
        setFilter({ ...initialValue })
    }



    const searchHandler = () => {

        const isFilterEmpty =
        filter.code === '' &&
        filter.description === '' &&
        filter.sStatus?.value === '' &&
        filter.sautorizza?.value === '' &&
        filter.sStatusCancella?.value === '' &&
        filter.sArea?.value === '' &&
        filter.sCampagna === '' &&
        filter.txtpromoCreatedFromDate === null &&
        filter.txtPromoCreatedToDate === null 

        if (isFilterEmpty) {
            setAlertMessage('Inserisci almeno un filtro prima di cercare');
            return;
          }


        setListLoading(true);
        pg = 0;
        getCancelPromozioniList();
        setAlertMessage('');

    }

    const loadmoreHandler = () => {
        setMoreLoading(true);
        pg++;
        getCancelPromozioniList();
    }

    const showCampagnaHandler = () => {
        setShowCampagnaPage(true);
        setFilterOpen(false);
        setListOpen(false);

    }
    const chooseCampagnaHandler = (value: any) => {
        setFilter({ ...filter, sCampagna: value });
        setShowCampagnaPage(false);
        setFilterOpen(true);
    }

    const closeCampagnaHandler = () => {
        setShowCampagnaPage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const [listLinkProps, setListLinkProps] = useState<any>({
        promoId: "",
        campaign: ""
    })

    const referenzeLinkFn = (promoId: string, campaign: string) => {
        setListLinkProps({ promoId, campaign });
        setShowReferenzepage(true);
        setFilterOpen(false);
        setListOpen(false);
    }


    const CloseReferenzeHandler = () => {
        setShowReferenzepage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const ClosePromoInfoHandler = () => {
        setShowPromoInfopage(false);
        setShowReferenzepage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const promoInfoLinkFn = (promoId : string,posting_date : string,Codice : string ) => {
        setPromoInfolistLinkProps({promoId,posting_date,Codice});
        setShowPromoInfopage(true);
        setShowReferenzepage(false);
        setFilterOpen(false);
        setListOpen(false);
    }

    const [promoInfolistLinkProps, setPromoInfolistLinkProps] = useState<any>({
        
        promoId: "",
        posting_date: "",
        Codice:""
    })

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
        getCancelPromozioniList();//get sorted data from the api
        e.stopPropagation();
        setListOpen(true);
      }
      let cancellazionePromozioniTableProps = {loadmoreHandler,isLastPage, moreLoading,sortingHandler, sorting,
      cancellazionePromozioniList,referenzeLinkFn,promoInfoLinkFn,listMsg}
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
                                <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                    resetHandler={resetHandler} searchHandler={searchHandler}
                                    showCampagnaHandler={showCampagnaHandler} promozoniCapoArealist={promozoniCapoArealist}
                                />
                            </div>  
                        </div>
                    </Card>
                    {  listLoading ? <SectionLoader Size='20'/>:
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

                                    <CancellazionePromozioniTable loadmoreHandler={loadmoreHandler}
                                        isLastPage={false} moreLoading ={moreLoading}  sortingHandler={sortingHandler} sorting ={sorting}
                                        CancellazionePromozioniList={cancellazionePromozioniList} referenzeLinkFn={referenzeLinkFn} 
                                        promoInfoLinkFn = {promoInfoLinkFn} listMsg={listMsg}/>
                                </div>
                            </div>
                        </div>

                        <ToastContainer />
                    </Card>
                        }

                    <div id="campagna_search" style={{ display: showCampagnaPage ? 'contents' : 'none' }}>
                        <CampagnaSearch chooseCampagnaHandler={chooseCampagnaHandler} showCampagnaHandler={showCampagnaHandler}
                            closeCampagnaHandler={closeCampagnaHandler} />
                    </div>

                    {showReferenzepage && <div id="referenze_link">
                        <ReferenzeListLink  {...listLinkProps} CloseReferenzeHandler={CloseReferenzeHandler} />
                    </div>
                    }

                    {showPromoInfopage && <div id="promoInfo_link">
                        <PromoInfoListLink  {...promoInfolistLinkProps}  ClosePromoInfoHandler={ClosePromoInfoHandler}  />
                    </div>
                    }


                </>

    )
}

export default Page