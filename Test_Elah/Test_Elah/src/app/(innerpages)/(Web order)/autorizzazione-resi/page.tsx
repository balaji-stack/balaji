"use client"
import React, { useEffect, useState } from 'react'
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import axios from 'axios';
import SERVER_URL from '@/helpers/common';
import FilterComponent from './FilterComponent';
import ListOrdiniTable from './AuthorizioneResiTable';

type selectField = { label: string, value: string };

export type filterType = {

  tclientcode: string,
  torderdate: null | Date,
  tagentname: string,
  sfilter: selectField,
  tclientreff: string,

}

export const initialValue = {

  tclientcode: "",
  torderdate: new Date(),
  tagentname: "",
  sfilter: { label: '', value: '' },
  tclientreff: "",


}

let offset: number = 0;
const limit: number = 3;

type Props = {}

const Page = (props: Props) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listOpen, setListOpen] = useState<boolean>(true);
  const filterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  const [filter, setFilter] = useState<filterType>(initialValue);
  const onChangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value })
  }


  useEffect(() => {
    
  }, [])

  const resetHandler = () => {
    setFilter(initialValue);
  }

  const searchHandler = () => {
    
  }


  return (
    <main>
      <Card>

        <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA WEB RESI"></Title>
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
              <FilterComponent filter={filter} onChangeHandler={onChangeHandler} searchHandler={searchHandler} resetHandler={resetHandler} />
            </div>

          </div>
        </div>
      </Card>
     


      <Card>
        <div className="table_data">
          <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="LISTA WEB RESI"></Title>
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









    </main>
  )
}

export default Page