"use client";
import SERVER_URL from "@/helpers/common";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SectionLoader from "./SectionLoader";
import Title from "./Title";
import closeImg from '@/img/close.png';
import Image from "next/image";
import { popupMsg } from "@/helpers/messages";
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';




type Props = {
  selectedAgent: string ;
  chooseAgenteHandler: any;
  closeAgenteHandler: any;
};

let page: number = 0;
const size: number = 10;
let isLastPage: boolean = false;
interface SelectType {
  label: string,
  value: string,
}
interface FilterType {
  code: string,
  name: string,
  capoArea: SelectType,
  // capoAreaList: capoAreaType[]
}


let initialFilter: FilterType = {
  code: "",
  name: "",
  capoArea: { label: '', value: '' },
  // capoAreaList: []
};


const AgenteSearch = (props: Props) => {
  const selectedAgent: string = props.selectedAgent;
  const chooseAgenteHandler = props.chooseAgenteHandler;
  const closeAgenteHandler = props.closeAgenteHandler;
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [agentsList, setAgentsList] = useState<any[]>([{}]);
  const [capoAreaList, setCapoAreaList] = useState<any[]>([{}]);
  const [filter, setFilter] = useState<FilterType>(initialFilter);

  const onchangeHandler = (key: string, value: string) => {
    setFilter({ ...filter, [key]: value });
  };

  async function getAgents() {
    const url = `${SERVER_URL}/Common/agentSearch?page=${page}&size=${size}`;
    // Using the AXIOS library to make a POST request
    await axios
      .post(url, filter, {
        withCredentials: true,
      })
      .then((response) => {
        let apiData = response.data;
        page > 0
          ? setAgentsList((prev: any) => [...prev, ...apiData.agents])
          : setAgentsList(apiData.agents);
        isLastPage =
          agentsList.length + apiData.agents.length == apiData.total ||
          apiData.agents.length >= apiData.total;
      })
      .catch((error) => {
        popupMsg(error.message, "error");
      })
      .finally(() => {
        setListLoading(false);
        setMoreLoading(false);
      });
  }

  const getArea = async () => {
    const url = `${SERVER_URL}/Common/capoArea`;

    // Using the AXIOS library to make a POST request
    await axios
      .post(url,null, {
        withCredentials: true,
      })
      .then((response) => {
        let data = response.data
        let capoAreas = data.flatMap((item: any) => ({
          label: item,
          value: item,

        }));
        setCapoAreaList(capoAreas);
      })
      .catch((error) => {
        popupMsg(error.message, "error");

      })
      .finally(() => {
        setListLoading(false);
        setMoreLoading(false);
      });
  };

  useEffect(() => {
    setListLoading(true);
    page = 0;
    getAgents();
    getArea();
  }, []);
  const searchAgents = () => {
    setListLoading(true);
    page = 0;
    isLastPage = false;
    getAgents();
  };
  const loadmoreHandler = () => {
    setMoreLoading(true);
    page++;
    getAgents();
  };

  const filterFields = [
    {
        id: 1, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'code', value: filter.code,
        placeholder: 'Inserisci il codice', onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        id: 2, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'name', value: filter.name,
        placeholder: 'Inserisci il codice agente', onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        id: 3, fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Capo Area', field: 'capoArea', value: filter.capoArea,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: capoAreaList
    }];

  return (
    <>
      {listLoading ? <SectionLoader />
        :
        <Card>
          <div className="form_block">
            <div className="content_form content_form-filter">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                  <Title heading="Agent Lista"></Title>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                  <div className="title_block-arrow">
                    <button type="button" onClick={closeAgenteHandler}><Image src={closeImg} alt="Image" /></button>
                  </div>
                </div>

              </div>
              <div className="row">
              {filterFields?.map((it: any) => {
                    return (
                        <FilterFieldEl key={it.id} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                            field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                            clickHandler={it.clickHandler} options={it.options} />
                    )
                })}
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="btn_grp">
                    <div className="btn_grp_inner">
                      <button
                        type="button"
                        className="site_btn primary_btn"
                        onClick={searchAgents}
                      >
                        Cerca
                      </button>

                      <button
                        type="button"
                        className="site_btn primary_btn"
                        onClick={() => setFilter(initialFilter)}
                      >
                        Resettare
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table_data ordini_tbl">
            <div className="table_section">
              <div className="inner-content">
                <div className="inner-table-content">
                  <table className="table-main table table-striped table-borderless">
                    <thead className="sticky-thead">
                      <tr>
                        <th>-</th>
                        <th>Codice</th>
                        <th>Agente</th>
                        <th>Capo Area</th>
                      </tr>
                    </thead>

                    <tbody>
                      {agentsList?.map((agent) => {
                        let agentCode = agent.code;
                        return (
                          <tr key={agent.code}>
                            <td>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault"
                                   id={`agentChecked_${agentCode}`}
                                   value={agent.code}
                                  onChange={(e) =>
                                   chooseAgenteHandler(e.target.value)
                                  }
                                  checked={selectedAgent === agentCode}
                                  />
                                    <label className="form-check-label" htmlFor={`agentChecked_${agentCode}`}></label> 
                                </div>
                            </td>
                            <td>{agent.code}</td>
                            <td>{agent.name}</td>
                            <td>{agent.area}</td>
                          </tr>
                        );
                      })}
                    </tbody>


                  </table>
                </div>
                {moreLoading ? <SectionLoader Size='20px' />
                  :
                  !isLastPage && (
                    <button
                      id="LoadMoreBtn"
                      className="site_btn primary_btn"
                      style={{
                        position: "absolute",
                        left: "45%",
                        marginTop: "50px",
                      }}
                      onClick={loadmoreHandler}
                    >
                      caricare di più
                    </button>
                  )}
              </div>
            </div>
          </div>
        </Card>
      }
    </>
  );
};

export default AgenteSearch;
