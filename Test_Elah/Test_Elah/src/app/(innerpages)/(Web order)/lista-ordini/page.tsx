"use client"
import React, { useEffect, useState } from 'react'
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import axios, { AxiosError } from 'axios';
import SERVER_URL from '@/helpers/common';
import FilterComponent from './FilterComponent';
import ListOrdiniTable from './ListaOrdiniTable';
import AgenteSearch from '@/app/components/shared/AgenteSearch';
import ClienteSearch from '@/app/components/shared/ClienteSearch';
import { popupMsg } from '@/helpers/messages';
import { useRouter } from 'next/navigation';

export type filterType = {
  tordernumber: string,
  torderdate: null | Date,
  torderTodate: null | Date,
  tagentname: string,
  tclientcode: string,
  omaggiFilter: string,
  dallarichiesta: null | Date, 
  allarichiesta : null | Date,
  sfilter: string,
  spromotion: string,
  tclientreff: string,
  titemnumber: string,
  tshipmentddt: string
}

export const initialValue = {
  tordernumber: "",
  torderdate: new Date(),
  torderTodate: new Date(),
  tagentname: "",
  tclientcode: "",
  omaggiFilter: "",
  dallarichiesta: new Date(),
  allarichiesta :  new Date(),
  sfilter: "",
  spromotion: "",
  tclientreff: "",
  titemnumber: "",
  tshipmentddt:""

}

let offset: number = 0;
const limit: number = 3;
let pg: number = 0;
const size: number = 5;
type Props = {}

const Page = (props: Props) => {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [showClientePage, setShowClientePage] = useState<boolean>(false);
  const [showAgentePage, setShowAgentePage] = useState<boolean>(false);


  const filterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  const [filter, setFilter] = useState<filterType>(initialValue);
  const onChangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value })
  }

  // const paramvalue = {
  //   tordernumber: "",
  //   torderdate: new Date(),
  //   torderTodate: new Date(),
  //   tagentname: "",
  //   tclientcode: "",
  //   omaggiFilter: "",
  //   dallarichiesta: new Date(),
  //   allarichiesta :  new Date(),
  //   sfilter: "",
  //   spromotion: "",
  //   tclientreff: "",
  //   titemnumber: "",
  //   tshipmentddt:""
  
  // }
  
  const getListaordini = async () => {
    const url = `${SERVER_URL}/listaOrdini/getWebOrderList?page=${pg}&size=${size}`;

    // Using the AXIOS library to make a POST request
    await axios
        .post(url, filter, {
            withCredentials: true,
        })
        .then((response: any) => {
            let apiData = response.data;
            console.log(apiData);
          
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
           
        });
}

  useEffect(()=>{
    getListaordini();
},[]);



  const resetHandler = () => {
    setFilter(initialValue);
  }

  const searchHandler = () => {
    getListaordini();
  }

  const showAgenteHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowAgentePage(true);
  }

  const chooseAgenteHandler = (value: any) => {
    setFilter({ ...filter, tagentname: value });
    setShowAgentePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const closeAgenteHandler = () => {
    setShowAgentePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const showClienteHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowClientePage(true);
  }
  const chooseClienteHandler = (value: any) => {
    setFilter({ ...filter, tclientcode: value });
    setShowClientePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }
  const closeClienteHandler = () => {
    setShowClientePage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  let agenteSearchProps = { selectedAgent: filter.tagentname, chooseAgenteHandler, closeAgenteHandler };
  let clienteSearchProps = {selectedCliente: filter.tclientcode, chooseClienteHandler, closeClienteHandler };
  let filterComponentProps = { filter, onChangeHandler, resetHandler, searchHandler, showAgenteHandler, showClienteHandler };



  return (
    <main>
      <Card>

        <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA WEB ORDINI"></Title>
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

            <div className="content_form content_form-filter">
              <FilterComponent {...filterComponentProps} />
            </div>

          </div>
        </div>
      </Card>


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
              <ListOrdiniTable />

            </div>
          </div>
        </div>
      </Card>

      {showAgentePage && <div id="agente_search" >
        <AgenteSearch {...agenteSearchProps} />
      </div>
      }

      {showClientePage && <div id="cliente_search" >
        <ClienteSearch {...clienteSearchProps} />
      </div>
      }


    </main>
  )
}

export default Page