"use client"
import React, { useEffect, useState } from 'react'
import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import axios from 'axios';
import SERVER_URL from '@/helpers/common';
import FilterComponent from './FilterComponent';
import BudgetListClientiTable from './BudgetListClientiTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import RiepilogoBudgetClientiListLink from './weborder-budget-clienti-list-export/RiepilogoBudgetClientiListLink';
import EsportafilebudgetListLink from './weborder-budget-clienti-export/EsportafilebudgetListLink';
import EsportaReportBudgetListLink from './weborder-budget-clienti-annual-export/EsportaReportBudgetListLink';

type selectField = { label: string, value: string };

export type filterType = {
  tcodice: string,
  tsocialerep: string,
  tagentname: string,
  budgetyear: string,
  causaleFilter: selectField,
  area: selectField,
  supergrupo: selectField,
  gruppo: selectField,
  sottogruppo: selectField,

}

export const initialValue = {
  tcodice: "",
  tsocialerep: "",
  tagentname: "",
  budgetyear: "",
  causaleFilter: { label: '', value: '' },
  area: { label: '', value: '' },
  supergrupo: { label: '', value: '' },
  gruppo: { label: '', value: '' },
  sottogruppo: { label: '', value: '' },


}
const buttonWidth = {
  minWidth: "200px"
}
let offset: number = 0;
const limit: number = 3;

type Props = {}

const Page = (props: Props) => {

  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [filter, setFilter] = useState<filterType>(initialValue);
  const [showRiepilogoBudget, setShowRiepilogoBudget] = useState<boolean>(false);
  const [showEsportaFileBudget, setShowEsportaFileBudget] = useState<boolean>(false);
  const [showEsportaReportBudget, setShowEsportaReportBudget] = useState<boolean>(false);



  const filterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  const onChangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value })
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

  const closeOrdineBudgetHandler = () => {
    setShowRiepilogoBudget(false);
    setFilterOpen(true);
    setListOpen(true);
  }
  const showRiepilogoBudgetHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowRiepilogoBudget(true);
  }

  const closeEsportaFileHandler = () => {
    setShowEsportaFileBudget(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const showEsportaFileBudgetHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowEsportaFileBudget(true);
  }


  const closeEsportaReportHandler = () => {
    setShowEsportaReportBudget(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const showEsportaReportBudgetHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowEsportaReportBudget(true);
  }






  return (
    <main>
      <Card>

        <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA BUDGET"></Title>
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

            <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
              resetHandler={resetHandler} searchHandler={searchHandler}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="table_data">
          <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>

            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="BUDGET LIST"></Title>
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
              <div className='link_grp'>
                <ul className='subnav_ul'>
                  <li>
                    <button type='button' className='site_btn primary_btn' style={buttonWidth}
                      onClick={showRiepilogoBudgetHandler}>
                      <FontAwesomeIcon icon={faPlus} />&nbsp;
                      Riepilogo ordini budget clienti
                    </button>
                  </li>
                  <li>
                    <button type='button' className='site_btn primary_btn' style={buttonWidth}>
                      <FontAwesomeIcon icon={faPlus} />&nbsp;
                      importa file budget
                    </button>
                  </li>

                  <li>
                    <button type='button' className='site_btn primary_btn' style={buttonWidth}
                      onClick={showEsportaFileBudgetHandler}>
                      <FontAwesomeIcon icon={faPlus} />&nbsp;
                      Esporta file budget
                    </button>
                  </li>

                  <li>
                    <button type='button' className='site_btn primary_btn' style={buttonWidth}
                    onClick={showEsportaReportBudgetHandler}>
                      <FontAwesomeIcon icon={faPlus} />&nbsp;
                      Esporta report budget
                    </button>
                  </li>
                </ul>
              </div>

              <BudgetListClientiTable filter={filter} />

            </div>
          </div>
        </div>
      </Card>

      {showRiepilogoBudget && <div id="riepilogoBudgetpage_link" >
        <RiepilogoBudgetClientiListLink closeOrdineBudgetHandler={closeOrdineBudgetHandler} onchangeHandler={undefined} />
      </div>
      }

      {showEsportaFileBudget && <div id="esportafileBudgetpage_link" >
        <EsportafilebudgetListLink closeEsportaFileHandler={closeEsportaFileHandler} onchangeHandler={undefined} />
      </div>
      }

      {showEsportaReportBudget && <div id="esportaReportBudgetpage_link" >
        <EsportaReportBudgetListLink closeEsportaReportHandler={closeEsportaReportHandler} onchangeHandler={undefined}  />
      </div>
      }


    </main>
  )
}

export default Page