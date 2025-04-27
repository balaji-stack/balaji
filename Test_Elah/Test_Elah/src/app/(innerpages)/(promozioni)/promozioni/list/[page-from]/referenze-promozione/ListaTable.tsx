
import React from 'react'
import Image from "next/image";
import ArrowDown from "@/img/arrow-down.png";
import SectionLoader from '@/app/components/shared/SectionLoader';
import ViewText from '@/app/components/shared/ViewText';


type Props = {

    TableLista: any;
    moreLoading : boolean;
    isLastPage : boolean;
    loadmoreHandler : any;
    listMsg: string;
    sortingHandler: any;
    sorting: boolean;

}

const ListaTable = (props: Props) => {
    const TableLista = props.TableLista;
    const loadmoreHandler = props.loadmoreHandler;
    const isLastPage = props.isLastPage;
    const moreLoading = props.moreLoading;
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
    { id: 1, th: 'Codice', index: 'ITEM.[No_]', orderable: true },
    { id: 2, th: 'Descrizione',  index: 'ITEM.[Description]', orderable: true },
    { id: 3, th: 'Marchio',  index: 'TAB.[Criteria 1]', orderable: true },
    { id: 4, th: 'Linea',  index: 'TAB.[Criteria 3]', orderable: true },
    { id: 5, th: 'Macro-famiglia',  index: 'TAB.[Criteria 2]', orderable: true },
];


    let renderList = () => {
        if (TableLista?.length > 0) {
            return (
                <tbody>

                {TableLista.length > 0 &&
                    TableLista?.map((it: any,i: number) => (
                        <tr key={i}>
                            <td>{it.Codice}</td>
                            <td>{it.Description}</td>
                            <td>{it.Marchio}</td>
                            <td>{it.Linea}</td>
                            <td>{it.MacroFamiglia}</td>
                        </tr>
                    ))
                }

            </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
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
                                        <td colSpan={5} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                        </td>
                                    </tr>
                                </tbody> : renderList()}
                            </table>
                        </div>
                    </div>
                </div>

                {moreLoading ? <SectionLoader Size='20px' />
                    :
                    TableLista.length > 0 && !isLastPage &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ margin: '45px auto 0' }}
                        onClick={loadmoreHandler}>caricare di più</button>
                }

            </div>
        </section>
    )
}

export default ListaTable