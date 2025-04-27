import React from "react";
import textBoxSearch from "@/img/txt_box_search.png";
import Image from "next/image";
import { OrdiniDataType } from "./page";

import { watch } from "fs";
import { register } from "module";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale";

type properties = {
  Ordini: any;
  changeHandler: any;
  searchHandler: any;
  resetHandler: any;
  agentSearchHandler :any;
};

registerLocale("it", it);
const OrdiniForm = (props: properties) => {
  const Ordini = props.Ordini;
  const changeHandler = props.changeHandler;
  const searchHandler = props.searchHandler;
  const resetHandler = props.resetHandler;
  const agentSearchHandler = props.agentSearchHandler;
 
  return (
    <main>
      <div className="row">
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Numero ordine</label>
            <div className="cntrl_grp">
              <input
                type="text"
                className="form-control"
                name="numeroOrdine"
                onChange={(e) => changeHandler("numeroOrdine", e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group grp_cntrls">
            <label>Data ordine</label>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                  <DatePicker
                    locale="it"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                    selected={Ordini.Order_Date_from}
                    onChange={(date: any) => {
                      changeHandler("Order_Date_from", date);
                    }}
                  />
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                <DatePicker
                    locale="it"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                    selected={Ordini.Order_Date_to}
                    onChange={(date: any) => {
                      changeHandler("Order_Date_to", date);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Agente</label>
            <div className="cntrl_grp">
            <input
                                type="text"
                                value={Ordini.Agent}
                                className="form-control"
                                placeholder="Enter Agente"
                                onChange={(e) => changeHandler('userAgentCode', e.target.value)}
                            />
                            <button type="button" className="icon_txtbox" onClick={agentSearchHandler}>
                                <Image src={textBoxSearch} alt="Image" />
                            </button>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Stato</label>
            <div className="cntrl_grp">
              <select className="form-control">
                <option>Seleziona</option>
                <option>Tutti</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group grp_cntrls">
            <label>Nota</label>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                  <select className="form-control">
                    <option>Seleziona</option>
                    <option>Tutti</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group grp_cntrls">
            <label>Cliente</label>
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                  <input type="text" className="form-control" />
                  <span className="icon_txtbox">
                    <Image src={textBoxSearch} alt="Image" />
                  </span>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="cntrl_grp">
                  <select className="form-control">
                    <option>Seleziona</option>
                    <option>Tutti</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Cond. Pag.</label>
            <div className="cntrl_grp">
              <select className="form-control">
                <option>Seleziona</option>
                <option>Tutti</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Met. Pag.</label>
            <div className="cntrl_grp">
              <select className="form-control">
                <option>Seleziona</option>
                <option>Tutti</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="btn_grp">
        <div className="btn_grp_inner">
          <button
            type="button"
            className="site_btn primary_btn"
            onClick={resetHandler}
          >
            Resettare
          </button>
          <button
            type="button"
            className="site_btn brdr_btn"
            onClick={searchHandler}
          >
            Cerca
          </button>
        </div>
      </div>
    </main>
  );
};

export default OrdiniForm;
