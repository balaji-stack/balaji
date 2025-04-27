"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import AssegnatariPromozioneTable from './AssegnatariPromozioneTable';
import ListaPuntiVenditaTable from './ListaPuntiVenditaTable';
import FilterComponent from './FilterComponent';
import SERVER_URL, { getOrderBy } from '@/helpers/common';
import axios, { AxiosError } from 'axios';
import closeImg from '@/img/close.png';
import Image from "next/image";
import { popupMsg } from '@/helpers/messages'
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from 'next/navigation';

type Props = {

    promoId: string,
    campaign: string,
    CloseAssegnatariHandler : any;
}

export type filterType = {
    codice: string,
    description: string,

}

let pg: number = 0;
const size: number = 3;
let colName: string = '';
let order: string = 'asc';

export const initialValue: filterType = {
    codice: '',
    description: '',

};



const AssegnatariListLink = (props: Props) => {

    const router =useRouter();
    const CloseAssegnatariHandler =props.CloseAssegnatariHandler;
    const promozioniId = props.promoId;
    const campaign = props.campaign;

    const [filter, setFilter] = useState<filterType>(initialValue);
    const [AssegnatariData, setAssegnatariData] = useState<any>({});
    const [TableLista, setTableLista] = useState<any>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [assegLoading,setAssegLoading] = useState<boolean>(false);
    const [assegTableLoading,setasssegTableLoading] = useState<boolean>(false);
    const [listMsg, setListMsg] = useState<string>('');
    const [sorting, setSorting] = useState<boolean>(false);


    let requestBodyValues = {promozioniId,pageFrom: 'promotion',campaignCode : campaign};
    useEffect(()=>{//update requestbody values if filter changed
        setFilter((prev: filterType)=>{
            requestBodyValues = {...prev,...requestBodyValues};
            return prev;
        });
    },[filter]);

    const getPDVList = async () => {
        const URL = `${SERVER_URL}/popup/getPDVPopUp?page=${pg}&size=${size}`;
        axios.post(URL, requestBodyValues, {
            withCredentials: true
        }).then((response) => {
            let data = response.data;
            if (Object.keys(data).length === 0) {
                popupMsg("Nessun dato disponibile dal server.", "info");
                return;
            }
                setAssegnatariData(data.initialLoadingListPage);
                pg > 0 ?
                setTableLista((prev: any) => [...prev, ...data.pvdetails]) : setTableLista(data.pvdetails);
                let lastPage = TableLista.length + data.pvdetails.length == data.count ||
                    data.pvdetails.length < size;
                TableLista.length == 0 && setListMsg('Nessun dato trovato');        
            setIsLastPage(lastPage);
            setIsLoading(false);
            setAssegLoading(false);
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
            setIsLoading(false);
            setIsSectionLoading(false);
            setAssegLoading(false);
            setasssegTableLoading(false);
            setSorting(false);
        });
    }

    useEffect(() => {
        setAssegLoading(true);
        setIsLoading(true);
        pg = 0;
        getPDVList();
    }, [promozioniId])

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }
    const resetHandler = () => {
        setFilter({ ...initialValue })
    }

    const searchHandler = () => {
        setasssegTableLoading(true);
        pg = 0;
        getPDVList();
    }

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getPDVList();
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
        getPDVList();//get sorted data from the api
        e.stopPropagation();
      
      }

    return (
        <>
        {assegLoading ?   <SectionLoader Size='50px' />
    :    
 
        <main>
            <Card>
                <div className="row">
                    <div className="title_block-arrow">
                      <button type="button" onClick={CloseAssegnatariHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading="ASSEGNATARI PROMOZIONE"></Title>
                        <AssegnatariPromozioneTable {...AssegnatariData} />
                    </div>
                </div>
                <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                    resetHandler={resetHandler} searchHandler={searchHandler} />
            </Card>

            <Card>
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="Lista Punti Vendita"></Title>
                            </div>
                        </div>
                    </div>
                    {assegTableLoading ?   <SectionLoader Size='50px' />
                    :
                    
                    <ListaPuntiVenditaTable TableLista={TableLista} 
                    loadmoreHandler={loadmoreHandler}
                    isLastPage={isLastPage} setIsLastPage={setIsLastPage}
                 isSectionLoading={isSectionLoading} setIsLoading={setIsLoading} listMsg={listMsg} sortingHandler={sortingHandler} sorting={sorting}/>
                }
                </div>
            </Card>

            </main>
}
        </>
            
      

    )
}

export default AssegnatariListLink