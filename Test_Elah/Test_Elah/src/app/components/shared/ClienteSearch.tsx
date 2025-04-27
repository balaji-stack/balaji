"use client";
import SERVER_URL, { selectFieldType } from '@/helpers/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import SectionLoader from './SectionLoader';
import CreatableSelect from 'react-select/creatable';
import Title from './Title';
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {
    selectedCliente: string;
    chooseClienteHandler: any;
    closeClienteHandler: any;

}

interface ClienteType {

    rowNumLi: Number;
    noLi: string;
    nameLi: string;
    searchNameLi: string;
    salesPersonCodeLi: string;
    areaLi: string;
    addressLi: string;
    cityLi: string;
    /*
        sagentcode: string;
        tclientcode: string;
        tclientname: string;
        codiceno: string;
        address: string;
        city: string;
    */
}


let page: number = 0;
const size: number = 10;
const ClienteSearch = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);


    const selectedCliente = props.selectedCliente;
    const chooseClienteHandler = props.chooseClienteHandler;
    const closeClienteHandler = props.closeClienteHandler;
    const [clienteList, setClienteList] = useState<ClienteType[]>([]);
    const [agenteList, setAgenteList] = useState<selectFieldType[]>([]);

    type filterType = {
        tclientname: string;
        tclientcode: string;
        sagentcode: { label: string, value: string };
        codiceno: string;
        address: string;
        city: string;
    }
    const initialFilter = {
        tclientname: '',
        tclientcode: '',
        sagentcode: { label: '', value: '' },
        codiceno: '',
        address: '',
        city: '',
    }
    const [filters, setFilters] = useState<filterType>(initialFilter);

    const changeHandler = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };
    async function getClients() {
        const url = `${SERVER_URL}/Common/clientSearch?page=${page}&size=${size}`;
        // const url = `${SERVER_URL}/ordini/clientSearch`;
        // Using the AXIOS library to make a POST request
        await axios.post(url, filters, {
            withCredentials: true,
        }).then(response => {
            let apiData = response.data;
            page > 0 ? setClienteList((prev: any) => [...prev, ...apiData.clientsearch]) : setClienteList(apiData.clientsearch);
            let lastPage = clienteList.length + apiData.clientsearch.length == apiData.count ||
                apiData.clientsearch.length < size;
            setIsLastPage(lastPage);
            setIsLoading(false);
            setIsSectionLoading(false);
        })
            .catch(error => {
                console.log(error);
            });
    }

    const getAgeneteList = async () => {
        const url = `${SERVER_URL}/Common/getAgenetelist`;
        // Using the AXIOS library to make a POST request
        await axios.post(url, filters, {
            withCredentials: true,
        })
            .then(response => {
                let agents = response.data.agente.flatMap((item: any) => { return { "label": item.code, "value": item.code } });
                setAgenteList(agents);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        setIsLoading(true);
        page = 0;
        getClients();
        getAgeneteList();
    }, []);
    const searchClients = () => {
        setIsLoading(true);
        setIsLastPage(false);
        page = 0;
        getClients();
    }

    const resetHandler = () => {

        setFilters({ ...initialFilter })
    }

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        page++;
        getClients();
    }
    return (
        <>
            {isLoading ? <SectionLoader />
                :
                <Card>
                    <div className="form_block" >
                        <div className="content_form content_form-filter">
                            <div className="row">

                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                    <Title heading="Cliente Lista "></Title>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                    <div className="title_block-arrow">
                                        <button type="button" onClick={closeClienteHandler}><Image src={closeImg} alt="Image" /></button>
                                    </div>
                                </div>

                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Codice</label>
                                        <div className="cntrl_grp">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter code"
                                                value={filters.codiceno}
                                                onChange={(e) => changeHandler('codiceno', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Cliente</label>
                                        <div className="cntrl_grp">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter code"
                                                value={filters.tclientname}
                                                onChange={(e) => changeHandler('tclientname', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Agente</label>
                                        <div className="cntrl_grp">
                                            <CreatableSelect isClearable className='custom-select-picker'
                                                classNamePrefix="nw"
                                                options={agenteList}
                                                value={filters.sagentcode} onChange={(value: any) => {
                                                    changeHandler('sagentcode', value)
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Citta</label>
                                        <div className="cntrl_grp">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter citta"
                                                value={filters.city}
                                                onChange={(e) => changeHandler('city', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Indirizzo</label>
                                        <div className="cntrl_grp">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter indirizzo"
                                                value={filters.address}
                                                onChange={(e) => changeHandler('address', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label>Cod. ricerca</label>
                                        <div className="cntrl_grp">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter cod. ricerca"
                                                value={filters.tclientcode}
                                                onChange={(e) => changeHandler('tclientcode', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

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
                                                onClick={searchClients}
                                            >
                                                Cerca
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
                                                <th>Cliente</th>
                                                <th>Cod.ricerca</th>
                                                <th>Agente</th>
                                                <th>Area</th>
                                                <th>Indirizzo</th>
                                                <th>Citta</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clienteList.length > 0 ? clienteList?.map((Cliente, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                                    id={`agentChecked_${i}`}
                                                                    value={Cliente.noLi}
                                                                    onChange={(e) =>
                                                                        chooseClienteHandler(e.target.value)
                                                                    }
                                                                    checked={selectedCliente === Cliente.noLi}
                                                                />
                                                                <label className="form-check-label" htmlFor={`agentChecked_${i}`}></label>
                                                            </div>
                                                        </td>
                                                        <td>{Cliente.noLi}</td>
                                                        <td>{Cliente.nameLi}</td>
                                                        <td>{Cliente.searchNameLi}</td>
                                                        <td>{Cliente.salesPersonCodeLi}</td>
                                                        <td>{Cliente.areaLi}</td>
                                                        <td>{Cliente.addressLi}</td>
                                                        <td>{Cliente.cityLi}</td>
                                                    </tr>
                                                )
                                            }) :
                                                <tr>
                                                    No Clients
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                {isSectionLoading ? <SectionLoader Size='20px' />
                                    :
                                    !isLastPage &&
                                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                                        style={{ position: 'absolute', left: '45%', marginTop: '50px' }}
                                        onClick={loadmoreHandler}>caricare di più</button>
                                }
                            </div>
                        </div>
                    </div>

                </Card>
            }
        </>

    )
}

export default ClienteSearch;

