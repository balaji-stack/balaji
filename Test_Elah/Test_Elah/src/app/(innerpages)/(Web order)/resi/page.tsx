"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useState } from 'react';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import FilterComponent from './FilterComponent';
import ResiCustomersTable from './ResiCustomersTable';



export type filterType = {
  tcodice:string,
  tsocialerep:string,
   tagentname:string,
   tcity:string,
   tpv:string,
   ssupergruppo:string,
   sgruppo:string,
   ssottogruppo:string,
}

export const initialValue: filterType = {
  tcodice:"",
  tsocialerep:"",
  tagentname:"",
  tcity:"",
  tpv:"",
  ssupergruppo:"",
  sgruppo:"",
  ssottogruppo:"",
}

const buttonWidth ={
  minWidth:"200px"
}

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
  const searchHandler = () => {

  }
  const resetHandler = () => {
    setFilter(initialValue);
  }
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
                  onClick={filterToggle}>
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
              <FilterComponent filter={filter} onChangeHandler={onChangeHandler} resetHandler={resetHandler} searchHandler={searchHandler} />
            </div>
          </div>
        </div>
      </Card>
      


      <Card>
        <div className="table_data">
          <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="Lista clienti"></Title>
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
            <ResiCustomersTable filter={filter}/>

            </div>
          </div>
        </div>
      </Card>


    </main>
  
  )
}

export default Page
