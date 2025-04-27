"use client"
import React, { useState } from 'react'
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import FilterComponent from './FilterComponent';
import OrderEntryTable from './OrderEntryTable';
import SERVER_URL from '@/helpers/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { popupMsg } from '@/helpers/messages';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { Alert } from 'react-bootstrap';
import AgenteSearch from '@/app/components/shared/AgenteSearch';
import OrderdraftList from '../webOrder-draft/OrderdraftList';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation';

type selectField = { label: string, value: string };
export type filterType = {
  codiceCliente: string,
  ragSociale: string,
  agente: string,
  citta: string,
  pv: string,
  superGruppo: selectField,
  gruppo: selectField,
  sottoGruppo: selectField,
  sortField: string,
  sortOrder: string,
}

export const initialValue: filterType = {
  codiceCliente: "",
  ragSociale: "",
  agente: "",
  citta: "",
  pv: "",
  superGruppo: { label: '', value: '' },
  gruppo: { label: '', value: '' },
  sottoGruppo: { label: '', value: '' },
  sortField: "",
  sortOrder: "",
}

let pg: number = 0;
const size: number = 10;
let colName: string = '';
let order: string = 'asc';
let customerCode: string = "";
type Props = {}
const Page = (props: Props) => {
  const router = useRouter();
  /////////////////////////////usestate fields //////////////////////////
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [filter, setFilter] = useState<filterType>(initialValue);
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [orderByList, setOrderByList] = useState<any[]>([]);
  const [listLastPage, setListLastPage] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAgentePage, setShowAgentePage] = useState<boolean>(false);
  const [showOrderdraftPage, setShowOrderdraftPage] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getOrderEntryList = async () => {
    const URL = `${SERVER_URL}/orderEntry/getWebOrdPuntiVenditaList?page=${pg}&size=${size}`;
    // Using the AXIOS library to make a POST request
    await axios
      .post(URL, { ...filter, sortField: colName, sortOrder: order}, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        let apiData = response.data;
        pg > 0 ? setOrderByList((prev: any) => [...prev, ...apiData.list]) : setOrderByList(apiData.list);
        let lastPage = orderByList.length + apiData.list.length == apiData.count || apiData.list.length < size;
        setListLastPage(lastPage);
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
        setRefreshing(false);
      });
  }

  ////////////////////////////Handlers //////////////////////////////////////////////////////////////////
  const resetHandler = () => {
    setFilter(initialValue);
  }

  const searchHandler = () => {

    const isFilterEmpty =
      filter.codiceCliente === '' &&
      filter.ragSociale === '' &&
      filter.agente === '' &&
      filter.citta === '' &&
      filter.pv === '' &&
      filter.superGruppo?.value === '' &&
      filter.gruppo?.value === '' &&
      filter.sottoGruppo?.value === '';

    if (isFilterEmpty) {
      setAlertMessage('Inserisci almeno un filtro prima di cercare');
      return;
    }


    setAlertMessage('');
    setListLoading(true);
    setListLastPage(false);
    setFilterOpen(true);
    setListOpen(true);
    pg = 0;
    getOrderEntryList();


  }
  const onChangeHandler = (key: string, value: string) => {
    setAlertMessage('');
    setFilter({ ...filter, [key]: value })
  }
  const loadmoreHandler = () => {
    setMoreLoading(true);
    pg++;
    getOrderEntryList();
  }

  const refreshHandler = () => {
    setRefreshing(true);
    setFilterOpen(false);
    pg = 0;
    getOrderEntryList();
  }

 
  //////////////////////////////////////////////////////////////
  const showAgenteHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowAgentePage(true);
  }
  const chooseAgenteHandler = (value: any) => {
    setFilter({ ...filter, agente: value });
    setShowAgentePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }
  const closeAgenteHandler = () => {
    setShowAgentePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const orderdraftListFn = (custCode: string) => {
    customerCode = custCode;
    setShowOrderdraftPage(true);
    setFilterOpen(false);
    setListOpen(false);
  }

  const closeOrderdraftHandler = () => {
    setShowOrderdraftPage(false);
    setFilterOpen(true);
    setListOpen(true);
  }



  ///////////////////////////////////////////////Sorting Function/////////////////////////////////////////////////////////////////////////////////////
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
    getOrderEntryList();//get sorted data from the api
    e.stopPropagation();
    setListOpen(true);
  }
  //////////////////////////////////////////////////Props for components//////////////////////////////////////////////////////////////////////////////////////////
  let filterComponentProps = { filter, onChangeHandler, resetHandler, searchHandler, showAgenteHandler };
  let orderByTableProps = { filter, orderByList, loadmoreHandler, listLastPage, moreLoading, sortingHandler, sorting, orderdraftListFn };
  let agenteSearchProps = { selectedAgent: filter.agente, chooseAgenteHandler, closeAgenteHandler };
  let orderdraftListProps = { customerCode, closeOrderdraftHandler }
  return (
    <main>
      <Card>
        <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA PUNTI VENDITA"></Title>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
              <div className="title_block-arrow">
                <button
                  type="button"
                  className="filter-arrow"
                  onClick={() => setFilterOpen(!filterOpen)}
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
            <FilterComponent {...filterComponentProps} />
          </div>
        </div>
      </Card>
      {listLoading ? <SectionLoader Size='20' /> :
        <Card>
          <div className="table_data">
            <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <Title heading="LISTA CLIENTE"></Title>
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

                <div className='link_grp mt-4'>
                  <ul className='subnav_ul'>
                   
                    {orderByList.length > 0 &&
                      <li>
                        <button type='button' className='site_btn primary_btn' style={{ minWidth: "100px" }}
                          onClick={refreshHandler}>
                          <FontAwesomeIcon icon={faArrowsRotate} />&nbsp;
                          Refresh
                        </button>
                      </li>
                    }
                   
                  </ul>
                </div>
                {
                  refreshing ? <SectionLoader Size='50px' />
                    :
                    <OrderEntryTable {...orderByTableProps} />
                }
              
              </div>
            </div>
          </div>
        </Card>
      }

      {showAgentePage && <div id="agente_search" >
        <AgenteSearch {...agenteSearchProps} />
      </div>
      }

      {showOrderdraftPage && <div id="orderdraft_list">
        <OrderdraftList {...orderdraftListProps} />
      </div>
      }


    </main>
  )
}
export default Page