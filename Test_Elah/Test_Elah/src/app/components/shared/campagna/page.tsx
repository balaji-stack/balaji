"use client"
import React, { useState, useEffect } from 'react'
import axios, { AxiosError } from "axios"
import Card from "@/app/components/shared/Card";
import FilterComponent from './FilterComponent';
import Title from '@/app/components/shared/Title'
import CampagnaTable from './CampagnaTable';
import SERVER_URL, { dateBeforeThreeMonth } from '@/helpers/common';
import CampagnaReference from './campagna-reference';
import { popupMsg } from '@/helpers/messages';
import closeImg from '@/img/close.png';
import Image from "next/image";
import SectionLoader from '../SectionLoader';
import { useRouter } from 'next/navigation';


type Props = {
  selectedCampagna: string;
  chooseCampagnaHandler: any;
  closeCampagnaHandler :any;

}

let pg: number = 0;
const size: number = 10
let colName: string = '';
let order: string = 'asc';
//let isLastPage: boolean = false

export type filterType = {
  campagnaCode: string,
  campagnaDescription: string,
  campagnaDateFrom: null | Date,
  campagnaDateTo: null | Date,
}

const CampagnaSearch = (props: Props) => {
  let initialFilter: any = {
    campagnaCode: "",
    campagnaDescription: "",
    campagnaDateFrom: new Date(dateBeforeThreeMonth),
    campagnaDateTo: new Date(),
  }
  const router = useRouter();
  const selectedCampagna = props.selectedCampagna;
  const chooseCampagnaHandler = props.chooseCampagnaHandler;
  const closeCampagnaHandler = props.closeCampagnaHandler;

  const [filters, setFilters] = useState<filterType>(initialFilter);
  const [campagnaList, setCampagnaList] = useState<any>([]);


  const [campagnaLoading, setCampagnaLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);
  const [campaignCode, setCampaignCode] = useState<string>("");
  const [listMsg, setListMsg] = useState<string>('');
  const [sorting, setSorting] = useState<boolean>(false);
  const onChangeHandler = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  async function getCampagnaList() {
    const url = `${SERVER_URL}/promozioni/getCampagnaList?page=${pg}&size=${size}`;

    await axios
      .post(url, filters, {
        withCredentials: true,
      })
      .then((response) => {
        let apiData = response.data;
        if (Object.keys(apiData).length === 0) {
          popupMsg("Nessun dato disponibile dal server.", "info");
          return;
      }
          pg > 0
            ? setCampagnaList((prev: any) => [...prev, ...apiData.campaignList]) : setCampagnaList(apiData.campaignList);
          let lastPage = campagnaList.length + apiData.campaignList.length == apiData.count ||
            apiData.campaignList.length < size;
          setIsLastPage(lastPage);
          campagnaList.length == 0 && setListMsg('Nessun dato trovato in base al filtro precedente');
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
      setCampagnaLoading(false);
        setIsSectionLoading(false);
        setSorting(false);
    });
  }


  useEffect(() => {
    setCampagnaLoading(true);
    getCampagnaList();

  }, []);

  const searchHandler = () => {
    setCampagnaLoading(true);
    setIsLastPage(false);
    pg = 0;
    getCampagnaList();
  }

  const loadmoreHandler = () => {
    setIsSectionLoading(true);
    pg++;
    getCampagnaList();
  }

  const resetHandler = () => {
    setFilters({ ...initialFilter });
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
    getCampagnaList();//get sorted data from the api
    e.stopPropagation();
  }


  return (

    <>
      {campagnaLoading ? <SectionLoader Size='20' /> :
        showReference ?
          <CampagnaReference setShowReference={setShowReference} campaignCode={campaignCode} /> :
            <Card>
              <div className="form_block">
                <div className="content_form content_form-filter">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <Title heading="Lista campagne" />
                    </div>

                <div className="title_block-arrow">
                      <button type="button" onClick={closeCampagnaHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>

                  <FilterComponent filter={filters} onChangeHandler={onChangeHandler}
                    searchHandler={searchHandler} resetHandler={resetHandler} />
                </div>
              </div>
            
              <div className="table_data">
                <div className="title_sec">
                  <div className="row">
                   
                  </div>
                </div>
                <CampagnaTable selectedCampagna={selectedCampagna} chooseCampagnaHandler={chooseCampagnaHandler}
                  campagnaList={campagnaList} loadmoreHandler={loadmoreHandler}
                  isLastPage={isLastPage} isSectionLoading={isSectionLoading}
                  setShowReference={setShowReference} setCampaignCode={setCampaignCode} listMsg={listMsg} sortingHandler ={sortingHandler} sorting ={sorting}/>
              </div>
            </Card>
      }
    </>
  )
}

export default CampagnaSearch