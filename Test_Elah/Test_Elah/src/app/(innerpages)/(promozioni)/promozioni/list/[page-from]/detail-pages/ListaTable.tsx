import React from 'react'
import Image from 'next/image';
import ArrowDown from "@/img/arrow-down.png";
import ViewText from '@/app/components/shared/ViewText';
import SectionLoader from '@/app/components/shared/SectionLoader';


interface GruppoType {
    Description: string,
    Code: string
}

type Props = {
    tableList: GruppoType[];
    sortingHandler: any;
    sorting: boolean;
    listMsg : string;
}
const ListaTable = (props: Props) => {
    const tableList = props.tableList;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    let listMsg = props.listMsg;

    let renderList = () => {
        if (tableList?.length > 0) {
            return (
                <tbody>
                {tableList.length > 0 && 
                    tableList?.map((it) => (
                        <tr key={it.Code}>
                            <td>{it.Code}</td>
                            <td>{it.Description}</td>
                        </tr>
                    ))
                 }
            </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={2} style={{ textAlign: 'center' }}>
                            <ViewText txtColor="red" textSize="15"
                                text={listMsg} />
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    interface RowType {
        id: number;
        th: string;
        index: string;
        orderable: boolean;
    }

    let rowDetails: RowType[] = [
    { id: 1, th: 'Codice', index: '[code]', orderable: true },
    { id: 2, th: 'Descrizione',  index: 'convert(nvarchar(max),description)', orderable: true },
];

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
                                        <td colSpan={2} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                        </td>
                                    </tr>
                                </tbody> : renderList()}

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ListaTable