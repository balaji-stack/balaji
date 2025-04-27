import React, { useState } from 'react'
import { filterType} from './page';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale";
import Image from 'next/image';
import textBoxSearch from "@/img/txt_box_search.png";
type Props = {
    filter :filterType;
    onChangeHandler :any;
    resetHandler :any;
    searchHandler :any;
}
registerLocale("it", it);
const FilterComponent = (props :Props) => {
    const onchangeHandler= props.onChangeHandler;
    const filter = props.filter;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;
    return (
        <section>
            <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Numero ddt</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                value={filter.numeroDdt}
                                className="form-control"
                                onChange={(e)=>onchangeHandler("numeroDdt",e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group grp_cntrls">
                        <label>Data ddt</label>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="cntrl_grp">
                                    <DatePicker
                                        locale="it"
                                        className="form-control"
                                        dateFormat="dd-MM-yyyy"
                                        selected={filter.dataDdtFrom}
                                        onChange={(date: any) =>onchangeHandler("dataDdtFrom",date)}
                                        onKeyDown={(e) =>e.preventDefault()}
                                    />
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="cntrl_grp">
                                    <DatePicker
                                        locale="it"
                                        className="form-control"
                                        dateFormat="dd-MM-yyyy"
                                        selected={filter.dataDdtTo}
                                        onChange={(date: any) => onchangeHandler("dataDdtTo",date)}
                                        onKeyDown={(e) =>e.preventDefault()}
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
                                value={filter.agente}
                                className="form-control"
                                placeholder="Enter Agente"
                                onChange={(e) =>  onchangeHandler("agente",e.target.value)}
                            />
                            <button type="button" className="icon_txtbox" onClick={() => {alert("clicked") }}>
                                <Image src={textBoxSearch} alt="Image" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Stato</label>
                        <div className="cntrl_grp">
                            <select className="form-control"
                             defaultValue="" value={filter.stato}
                            onChange={(e)=>onchangeHandler("stato",e.target.value)}>
                                <option value="">Select</option>
                                 <option value="Seleziona">Seleziona</option>
                                <option value="Tutti">Tutti</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group grp_cntrls">
                        <label>Cliente</label>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="cntrl_grp">
                            <input
                                type="text"
                                value={filter.cliente}
                                className="form-control"
                                placeholder="Enter Cliente"
                                onChange={(e) =>  onchangeHandler("cliente",e.target.value)}
                            />
                            <button type="button" className="icon_txtbox" onClick={() => {alert("clienteclicked") }}>
                                <Image src={textBoxSearch} alt="Image" />
                            </button>
                        </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="cntrl_grp">
                            <select className="form-control"
                             defaultValue="" value={filter.sellType}
                                onChange={(e)=>onchangeHandler("sellType",e.target.value)}>
                                <option value="">Select</option>
                                <option value="Sell-to-customer">Sell to customer</option>
                            </select>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Numero ordine</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                value={filter.numeroOrdine}
                                className="form-control"
                                onChange={(e)=>onchangeHandler("numeroOrdine",e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Numero fattura</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                value={filter.numeroFattura}
                                className="form-control"
                                onChange={(e)=>onchangeHandler("numeroFattura",e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn_grp">
                <div className="btn_grp_inner">
                    <button type="button" className="site_btn primary_btn" onClick={resetHandler}>
                    Resettare
                    </button>
                    <button type="button" className="site_btn brdr_btn" onClick={searchHandler}>
                        Cerca
                    </button> 
                   
                </div>
            </div>
        </section>
    )
                }
            

export default FilterComponent