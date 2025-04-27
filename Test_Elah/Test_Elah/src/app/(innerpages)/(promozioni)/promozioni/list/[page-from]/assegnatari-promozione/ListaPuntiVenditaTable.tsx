
import React from 'react'
import { filterType } from './AssegnatariListLink';
import SectionLoader from '@/app/components/shared/SectionLoader';
import Image from 'next/image';
import ArrowDown from "@/img/arrow-down.png";
import ViewText from '@/app/components/shared/ViewText';

type Props = {
    TableLista: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    setIsLastPage: any;
    isSectionLoading: boolean;
    setIsLoading: any;
    listMsg: string;
    sortingHandler: any;
    sorting: boolean;

}
const ListaPuntiVenditaTable = (props: Props) => {
    const TableLista = props.TableLista;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let setIsLastPage = props.setIsLastPage;
    let isSectionLoading = props.isSectionLoading;
    let setIsLoading = props.setIsLoading;
    let listMsg = props.listMsg;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;


    
    interface RowType {
        id: number;
        th: string;
        index: string;
        orderable: boolean;
    }

    let rowDetails: RowType[] = [
    { id: 1, th: 'Codice', index: 'TAB.[NUM]' , orderable: true },
    { id: 2, th: 'Ragione sociale',  index: 'TAB.[Name]', orderable: true },
    { id: 3, th: 'Cod Ricerca',  index: 'TAB.[Search Name]', orderable: true },
    { id: 4, th: 'Città',  index: 'TAB.[City]', orderable: true },
    { id: 5, th: 'Indirizzo',  index: 'TAB.[Address]', orderable: true },
    { id: 6, th: 'Super Gruppo',  index: 'TAB.[Criteria 4]', orderable: true },
    { id: 7, th: 'Gruppo',  index:'TAB.[Criteria 5]' , orderable: true },
    { id: 8, th: 'Sotto Gruppo',  index: 'TAB.[Criteria 6]', orderable: true },
    { id: 9, th: 'Agente',  index:'TAB.[Salesperson Code]' , orderable: true },
    { id: 10, th: 'Area',  index: 'TAB.[Criteria 1]', orderable: true },



];

    let renderList = () => {
        if (TableLista?.length > 0) {
            return (
                <tbody>
                    {TableLista.length > 0 &&
                        TableLista?.map((it: any, i: number) => (
                            <tr key={i}>
                                <td>{it.Codice}</td>
                                <td>{it.CustomerName}</td>
                                <td>{it.CodRicerca}</td>
                                <td>{it.Citta}</td>
                                <td>{it.Indirizzo}</td>
                                <td>{it.SuperGruppo}</td>
                                <td>{it.Gruppo}</td>
                                <td>{it["Sotto Gruppo"]}</td>
                                <td>{it.Agente}</td>
                                <td>{it.Area}</td>
                            </tr>
                        ))
                    }

                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={10} style={{ textAlign: 'center' }}>
                            <ViewText txtColor="red" textSize="15"
                                text={listMsg} />
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                <tr>
                                        {rowDetails?.map((row: RowType, index: number) => {
                                            let keyId = index;
                                            return (
                                                <th key={keyId}
                                                    onClick={(e) => row.orderable && sortingHandler(e, row.index)}>
                                                    <div className="thead_div">
                                                        <label>{row.th}</label>
                                                        {row.orderable &&//to get arrow only after first column
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
                                {sorting ?
                                <tbody>
                                    <tr>
                                        <td colSpan={10} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                        </td>
                                    </tr>
                                </tbody> : renderList()}
                            </table>
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

            </div>
        </section>
    )
}

export default ListaPuntiVenditaTable