
import React from 'react'
import Image from "next/image";
import ArrowDown from "@/img/arrow-down.png";
import SectionLoader from '@/app/components/shared/SectionLoader';


type Props = {
    nrprListLoading: boolean;
    tableLista: any;
    orderByHandler: any;
    loadmoreLoading: boolean;
    isLastPage: boolean;
    loadmoreHandler: any;
}

const NrprTable = (props: Props) => {
    const tableLista = props.tableLista;
    const orderByHandler = props.orderByHandler;
    const nrprListLoading = props.nrprListLoading;
    const loadmoreLoading = props.loadmoreLoading;
    const isLastPage = props.isLastPage;
    const loadmoreHandler = props.loadmoreHandler;

    let tableFields = ['Codice', 'Camp.', 'Descrizione promozione', 'Data rev.', 'Sell-in periodo',
        'Gr.', 'S. Gr.', 'PDV', 'Ref', 'Status autorizzazione', 'Status'];//names used to specify heading of each column

    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>
                                        {tableFields?.map((colName: string) => {

                                            return (
                                                <th
                                                    onClick={(e) => orderByHandler(e, colName, tableFields)}>
                                                    <div className="thead_div">
                                                        <label>{colName}</label>

                                                        <span className="sort_sp">
                                                            <i className="ascending"><Image src={ArrowDown} alt="ascending" /></i>
                                                            <i className="descending"><Image src={ArrowDown} alt="descending" /></i>
                                                        </span>

                                                    </div>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                {nrprListLoading ?<SectionLoader Size='50px'/>:
                                    <tbody>
                                        {tableLista.length > 0 &&
                                            tableLista?.map((it: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{it.Codice}</td>
                                                    <td>{it.campaign}</td>
                                                    <td>{it.Description}</td>
                                                    <td>{it.Data}</td>
                                                    <td>{it.DataIn}</td>
                                                    <td>{it.gruppo}</td>
                                                    <td>{it.sotto}</td>
                                                    <td>{it.pvCounts}</td>
                                                    <td>{it.ItemsCount}</td>
                                                    <td>{it.authorization}</td>
                                                    <td>{it.status}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                {loadmoreLoading ? <SectionLoader Size='20px' />
                    :
                    !isLastPage && tableLista?.length > 0 &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ margin: '45px auto 0' }}
                        onClick={loadmoreHandler}>Carica di più</button>
                }

            </div>
        </section>
    )
}

export default NrprTable;