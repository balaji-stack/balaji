"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import GruppoTable from './GruppoTable';
import ListaTable from './ListaTable';
import SERVER_URL, { getOrderBy } from '@/helpers/common';
import axios, { AxiosError } from 'axios';
import FilterComponent from './FilterComponent';
import closeImg from '@/img/close.png';
import Image from "next/image";
import { popupMsg } from '@/helpers/messages'
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from 'next/navigation';

type Props = {
    pageFrom: string,
    pageName: string,
    promoId: string,
    campaign: string,
   CloseGruppoHandler : any
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

const GetioneListLink = (props: Props) => {

    const router = useRouter();
    const pageFrom = props.pageFrom
    const pageName = props.pageName;
    const promoId = props.promoId
    const campaign = props.campaign;
    const CloseGruppoHandler = props.CloseGruppoHandler;

    let title: string = ""
    switch (pageName) {
        case 'sottogruppo':
            title = 'SOTTO GRUPPO LISTA';
            break;

        case 'gruppo':
            title = 'GRUPPO LISTA';
            break;

    }
        const [Data, setData] = useState<any>({});
        const [tableList, setTableList] = useState<any>({});
        const [filter, setfilter] = useState<any>({});
        const [gruppoLoading,setGruppoLoading] = useState<boolean>(false);
        const [tableGruppoLoading,setTableGruppoLoading] = useState<boolean>(false);
        const [sorting, setSorting] = useState<boolean>(false);
        const [listMsg, setListMsg] = useState<string>('');

        useEffect(()=>{//update requestbody values if filter changed
           
            setfilter((prev: filterType)=>{
                requestBodyValues = {...prev,promozioniId: promoId,pageFrom: 'promotion',campaignCode : campaign};
                return prev;
            });
        },[filter]);


    const getPopUpList = async () => {
        const URl = pageName === 'gruppo'
        ? `${SERVER_URL}/popup/getGrouppoPopUp?page=${pg}&size=${size}`
        : `${SERVER_URL}/popup/getSottoGrouppoPopUp?page=${pg}&size=${size}`;
        
    axios.post(URl, requestBodyValues, {
        withCredentials: true
    }).then((response) => {
        let data = response.data;
        if (Object.keys(data).length === 0) {
            popupMsg("Nessun dato disponibile dal server.", "info");
            return;
        }
            setData(data.initialLoadingList);
            if (pageName === 'gruppo')
                setTableList(data.groups);       
            else
                setTableList(data.sottogroups);
        tableList.length == 0 && setListMsg('Nessun dato trovato');
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
        
        setGruppoLoading(false);
        setTableGruppoLoading(false);
        setSorting(false);
    });

    }

    useEffect(() => {
        setGruppoLoading(true);
        pg = 0;
        getPopUpList();
    }, [promoId])

    const onChangeHandler = (key: string, value: string) => {
        setfilter({ ...filter, [key]: value })
    }
    const resetHandler = () => {
        setfilter({ ...initialValue })
    }

    const searchHandler = () => {
        setTableGruppoLoading(true);
        pg = 0;
        getPopUpList();
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
        getPopUpList();//get sorted data from the api
        e.stopPropagation();
      }


    return (
        <>
        {gruppoLoading ?   <SectionLoader Size='50px' /> 
        :
        <main>
            <Card>
                <div className="row">
                <div className="title_block-arrow">
                      <button type="button" onClick={CloseGruppoHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>


                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading={title}></Title>
                        <GruppoTable {...Data} />
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
                    {tableGruppoLoading ?   <SectionLoader Size='50px' />
                    :
                    <ListaTable tableList={tableList}  sortingHandler = {sortingHandler} sorting ={sorting} listMsg={listMsg}  />
                }
                </div>

            </Card>

        </main>
 }
        </>
   
    )
}

export default GetioneListLink;

