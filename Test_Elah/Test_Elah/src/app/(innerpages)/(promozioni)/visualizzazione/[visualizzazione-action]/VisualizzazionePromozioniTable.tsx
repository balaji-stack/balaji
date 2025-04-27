
import React from 'react'
import { filterType } from './page';
import SectionLoader from '@/app/components/shared/SectionLoader';
import Image from "next/image";
import ArrowDown from "@/img/arrow-down.png";

//import ArrowDown from "../../../../img/arrow-down.png";

type Props = {
    filter :filterType;
    loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
    orderByHandler:any;
    visualizzazionePromozioniList : any;
}

const VisualizzazionePromozioniTable = (props: Props) => {
    const filter = props.filter;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    let orderByHandler =props.orderByHandler;
    let visualizzazionePromozioniList =props.visualizzazionePromozioniList;

    let tableFields = ['-', 'Codice', 'Camp.', 'Descrizione promozione', 'Data rev.', 'Sell-in periodo', 'Gr.', 'S. Gr.', 'PDV','Ref','Status autorizzazione','Status','Nav integration status'];//names used to specify heading of each column
    let unorderFields = ['Sell-in periodo','Gr.', 'S. Gr.', 'PDV', 'Ref'];
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
                                             let isOrderable: boolean = !unorderFields.includes(colName);
                                            return (
                                                <th
                                                    onClick={(e) => isOrderable && orderByHandler(e, colName, tableFields)}>
                                                    <div className="thead_div">
                                                        <label>{colName}</label>
                                                        {tableFields.indexOf(colName) > 0 && isOrderable && //to get arrow only after first column
                                                            <span className="sort_sp">
                                                                <i className="ascending"><Image src={ArrowDown} alt="ascending" /></i>
                                                                <i className="descending"><Image src={ArrowDown} alt="descending" /></i>
                                                            </span>
                                                        }
                                                    </div>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                {visualizzazionePromozioniList != undefined && visualizzazionePromozioniList?.map((obj: any, i: number) => {
                                    return(
                                        <tr key={i}>
                                        <td></td>
                                        <td>{obj.Codice}</td>
                                        <td>{obj.campaign}</td>
                                        <td>{obj.Description}</td>
                                        <td>{obj.Data}</td>
                                        <td>{obj.DataIn}</td> 
                                        <td>{obj.gruppo}</td>
                                        <td>{obj.sotto}</td>
                                        <td>{obj.pvCounts}</td>
                                        <td>{obj.ItemsCount}</td>
                                        <td>{obj.authorization}</td>
                                        <td>{obj.status}</td>
                                        <td>{obj.Nav_Promotion_Code}</td>
                                    </tr>
                                    )
                                })}
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {isSectionLoading ? <SectionLoader Size='20px' />
                    :
                    !isLastPage &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ position: 'absolute', left: '45%', marginTop: '50px' }}
                        onClick={loadmoreHandler}>caricare di più</button>
                }
                
            </div>
        </section>
    )
}

export default VisualizzazionePromozioniTable 