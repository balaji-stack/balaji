"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import ReferenzeTable from './ReferenzeTable';
import ListaTable from './ListaTable';
import FilterComponent from './FilterComponent';
import SERVER_URL, { getOrderBy } from '@/helpers/common';
import axios, { AxiosError } from 'axios';
import closeImg from '@/img/close.png';
import Image from "next/image";
import { popupMsg } from '@/helpers/messages';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from 'next/navigation';


type Props = {
    promoId: string,
    campaign: string,

    CloseReferenzeHandler: any;
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
let requestBodyValues = {};

const ReferenzeListLink = (props: Props) => {

    const router = useRouter();
    const CloseReferenzeHandler = props.CloseReferenzeHandler;
    const promozioniId = props.promoId;
    const campaign = props.campaign;
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [RefData, setRefData] = useState<any>({});
    const [TableLista, setTableLista] = useState<any>({});
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [moreLoading, setMoreLoading] = useState<boolean>(false);
    const [refLoading, setRefLoading] = useState<boolean>(false);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [listMsg, setListMsg] = useState<string>('');
    const [sorting, setSorting] = useState<boolean>(false);

    useEffect(() => {//update requestbody values if filter changed
        setFilter((prev: filterType) => {
            requestBodyValues = { ...prev, promozioniId, pageFrom: 'promotion', campaignCode: campaign };
            return prev;
        });
    }, [filter]);


    const getReferenceList = async () => {
        const URL = `${SERVER_URL}/popup/getREFPopUp?page=${pg}&size=${size}`;
        axios.post(URL, requestBodyValues, {
            withCredentials: true
        }).then((response) => {
            let data = response.data;
            if (Object.keys(data).length === 0) {
                popupMsg("Nessun dato disponibile dal server.", "info");
                return;
            }
                pg == 0 && setRefData(data.initialLoadingListPage);
                pg > 0 ? setTableLista((prev: any) => [...prev, ...data.refitems]) : setTableLista(data.refitems);

                let lastPage = TableLista.length + data.refitems.length == data.count ||
                    data.refitems.length < size;

                TableLista.length == 0 && setListMsg('Nessun dato trovato');    
                setIsLastPage(lastPage);
                setRefLoading(false);
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

                setRefLoading(false);
                setMoreLoading(false);
                setTableLoading(false);
                setSorting(false);

            });
    }
    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }


    useEffect(() => {
        setRefLoading(true);
        pg = 0;
        getReferenceList();
    }, [promozioniId])

    const searchHandler = () => {
        setTableLoading(true);
        pg = 0;
        getReferenceList();
        
    }

    const resetHandler = () => {
        setFilter({ ...initialValue })
    }

    const loadmoreHandler = () => {
        setMoreLoading(true);
        pg++;
        getReferenceList();
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
        getReferenceList();//get sorted data from the api
        e.stopPropagation();
      
      }




    return (
        <>
            {refLoading ?
                <SectionLoader Size='50px' />
                :
                <main>
                    <Card>

                        <div className="row">

                            <div className="title_block-arrow">
                                <button type="button" onClick={CloseReferenzeHandler}><Image src={closeImg} alt="Image" /></button>
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                <Title heading="REFERENZE PROMOZIONE"></Title>
                                <ReferenzeTable {...RefData} />
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
                                            <Title heading="Lista"></Title>
                                        </div>

                                    </div>
                                </div>
                                {tableLoading ? <SectionLoader Size='50px' />
                        :  <ListaTable TableLista={TableLista}  loadmoreHandler={loadmoreHandler}
                                    isLastPage={isLastPage} moreLoading={moreLoading} listMsg={listMsg} sortingHandler={sortingHandler} sorting={sorting}/>
            }
                            </div>
                        </Card>
                    



                </main>
            }
        </>
    )
}

export default ReferenzeListLink