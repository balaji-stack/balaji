import React from 'react'
import { filterType } from './page';
import Link from 'next/link';
import Image from "next/image";
import cartPng from "@/img/cart.png";

type Props = {
    filter :filterType;
}

const BudgetListClientiTable = (props: Props) => {
    const filter = props.filter;
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>
                                        <th>-</th>
                                        <th>-</th>
                                        <th>Causale Omaggio</th>
                                        <th>Anno</th>
                                        <th>Codice cliente</th>
                                        <th>Rag Sociale</th>
                                        <th>1° semestre Nota</th>
                                        <th>1° Semstre Budget </th>
                                        <th>1° Semstere Usato </th>
                                        <th>1° Semstere Rimasto </th>
                                        <th>2° semestre Nota</th>
                                        <th>2° Semstre Budget </th>
                                        <th>2° Semstere Usato </th>
                                        <th>2° Semstere Rimasto </th>
                                        <th>Responsabile</th>
                                        <th>Super Gruppo</th>
                                        <th> Gruppo</th>
                                        <th>Sotto Gruppo</th>
                                        <th>Agente</th>
                                        <th>Area</th>
                                        <th>Creato da</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>Causale Omaggio</td>
                                        <td>Anno</td>
                                        <td>Codice cliente</td>
                                        <td>Rag Sociale</td>
                                        <td>1 semestre Nota</td>
                                        <td>1 Semstre Budget </td>
                                        <td>1 Semstere Usato </td>
                                        <td>1 Semstere Rimasto </td>
                                        <td>2 semestre Nota</td>
                                        <td>2 Semstre Budget </td>
                                        <td>2 Semstere Usato </td>
                                        <td>2 Semstere Rimasto </td>
                                        <td>Responsabile</td>
                                        <td>Super Gruppo</td>
                                        <td> Gruppo</td>
                                        <td>Sotto Gruppo</td>
                                        <td>Agente</td>
                                        <td>Area</td>
                                        <td>Creato da</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* {props.isSectionLoading ? <SectionLoader Size='20px' />
                    :
                    !props.isLastPage &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ position: 'absolute', left: '45%', marginTop: '50px' }}
                        onClick={props.loadmoreHandler}>caricare di più</button>
                } */}
            </div>
        </section>
    )
}

export default BudgetListClientiTable