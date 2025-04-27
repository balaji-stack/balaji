"use client"
import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import DdtTable from './DdtTable';
import axios from 'axios';
import SERVER_URL from '@/helpers/common';

export type filterType = {
  numeroDdt: string,
  dataDdtFrom: any,
  dataDdtTo: any,
  agente: string,
  stato: string,
  cliente: string,
  sellType: string,
  numeroOrdine: string,
  numeroFattura: string,
}

export const initialValue = {
  numeroDdt: "",
  dataDdtFrom: "",
  dataDdtTo: "",
  agente: "",
  stato: "",
  cliente: "",
  sellType: "",
  numeroOrdine: "",
  numeroFattura: "",
}

let offset: number = 0;
const limit: number = 3;

type Props = {}

const Page = (props: Props) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const filterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  const [filter, setFilter] = useState<filterType>(initialValue);
  const onChangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value })
  }

  const getDdtList = async() => {
    const url = `${SERVER_URL}/documentidispendizione/getdocdispendizionelist?offset=${offset}&limit=${limit}`;
    await axios.post(url, filter,{
      withCredentials: true,
  }).then((res) => {
      console.log(res.data);
    })
  }

  useEffect(() => {
    
  }, [])

  const resetHandler = () => {
    console.log("on reset Handler");
    setFilter(initialValue);
  }

  const searchHandler = () => {
    console.log("on search handler");
  }

  function getUsers() {
    getDdtList();
  }
  return (
    <main>
      <Card>

        <div
          className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""
            }`}
        >
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA USER"></Title>
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

            <FilterComponent filter={filter} onChangeHandler={onChangeHandler} resetHandler={resetHandler} searchHandler={searchHandler} />
          </div>
        </div>
      </Card>
      <Card>
        <div className="table_data">
          <div className="title_sec">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="DDT LISTA"></Title>
              </div>

            </div>
          </div>
          <DdtTable />
        </div>
      </Card>
      <button type="button" className="site_btn brdr_btn" onClick={getUsers}>
        Get values
      </button>
    </main>
  )
}

export default Page