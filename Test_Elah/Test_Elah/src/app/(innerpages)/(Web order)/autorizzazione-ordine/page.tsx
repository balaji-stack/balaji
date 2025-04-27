"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title';
import React, { useState } from 'react';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import FilterComponent from './FilterComponent';
import AutorizzazioneTable from './AutorizzazioneTable';
import ClienteSearch from '@/app/components/shared/ClienteSearch';
import AgenteSearch from '@/app/components/shared/AgenteSearch';
type Props = {}
export type filterType = {
  tclientcode: string;
  torderdate: Date;
  trequestdate: Date;
  tagentname: string;
  sfilter: string;
  tclientreff: string;
}

export const initialValue: filterType = {
  tclientcode: "",
  torderdate: new Date(),
  trequestdate: new Date(),
  tagentname: "",
  sfilter: "",
  tclientreff: "",
}
const Page = (props: Props) => {
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
  const searchHandler = () => {

  }
  const resetHandler = () => {
    setFilter(initialValue);
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

  let clienteSearchProps = {selectedCliente: filter.tclientcode, chooseClienteHandler, closeClienteHandler };
  let filterComponentProps = { filter, onChangeHandler, resetHandler, searchHandler, showAgenteHandler, showClienteHandler };
  let agenteSearchProps = { selectedAgent: filter.tagentname, chooseAgenteHandler, closeAgenteHandler };

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
        <div className={`form_block ${filterOpen ? "filter_show" : ""}`}
          style={{ 'display': 'none' }}>
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
                <Title heading="LISTA WEB ORDINI"></Title>
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
          <div className={`form_block ${listOpen ? "filter_show" : ""}`} style={{ display: 'none' }}>
            <div className="content_form content_form-filter">

              <AutorizzazioneTable filter={filter} />
            </div>
          </div>
        </div>
      </Card>


      {showClientePage && <div id="cliente_search" >
        <ClienteSearch {...clienteSearchProps} />
      </div>
      }

      {showAgentePage && <div id="agente_search" >
        <AgenteSearch {...agenteSearchProps} />
      </div>
      }

    </main>
  )
}

export default Page