"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useState } from 'react';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import FilterComponent from './FilterComponent';
import BudgetListTable from './BudgetListTable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import BudgetValoriListLink from '../budget-omaggi-area/budget-valori-utilizzati/BudgetValoriListLink';
import EsportaListLink from '../budget-omaggi-area/weborder-budget-area-export/EsportaListLink';

type selectField = { label: string, value: string };


export type filterType = {
  budgetyear: string;
  budgetarea: selectField;

}

export const initialValue: filterType = {
  budgetyear: "",
  budgetarea: { label: "", value: "" },

}

const buttonWidth = {
  minWidth: "200px"
}

type Props = {}

const Page = (props: Props) => {

  const router = useRouter()

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [showBudgetValoriPage, setShowBudgetValoriPage] = useState<boolean>(false);
  const [showEsportaPage, setShowEsportaPage] = useState<boolean>(false);

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


  const closeBudgetValoriHandler = () => {
    setShowBudgetValoriPage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const budgetValoriLinkFn = () => {
    setShowBudgetValoriPage(true);
    setFilterOpen(false);
    setListOpen(false);
  }

  const closeEsportaHandler = () => {
    setShowEsportaPage(false);
    setFilterOpen(true);
    setListOpen(true);
  }

  const showEsportaHandler = () => {
    setFilterOpen(false);
    setListOpen(false);
    setShowEsportaPage(true);
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
              <div className='link_grp mt-4'>
                <ul className='subnav_ul'>
                  <li>
                    <button type='button' className='site_btn primary_btn' style={buttonWidth}
                      onClick={showEsportaHandler}>

                      <FontAwesomeIcon icon={faPlus} />&nbsp;
                      Esporta Report Budget
                    </button>
                  </li>

                </ul>
              </div>

              <BudgetListTable filter={filter} budgetValoriLinkFn={budgetValoriLinkFn} />

            </div>
          </div>
        </div>
        <ToastContainer />
      </Card>

      {showBudgetValoriPage && <div id="budgetvalori_link">
        <BudgetValoriListLink closeBudgetValoriHandler={closeBudgetValoriHandler} />
      </div>
      }


      {showEsportaPage && <div id="esportapage_link" >
        <EsportaListLink closeEsportaHandler={closeEsportaHandler} onchangeHandler={undefined} />
      </div>
      }



    </main>
  )
}

export default Page
