
import React, { Dispatch, SetStateAction } from 'react'
import { filterType } from './page';
import SectionLoader from '../SectionLoader';
import Link from 'next/link';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import ViewText from '../ViewText';

type Props = {
    selectedCampagna: string;
    chooseCampagnaHandler: any;
    campagnaList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
    setShowReference: Dispatch<SetStateAction<boolean>>;
    setCampaignCode: Dispatch<SetStateAction<string>>;
    listMsg: string;
    sortingHandler: any;
    sorting: boolean;

}
const CampagnaTable = (props: Props) => {
    const selectedCampagna = props.selectedCampagna;
    const chooseCampagnaHandler = props.chooseCampagnaHandler;
    const campagnaList = props.campagnaList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    let setShowReference = props.setShowReference;
    let setCampaignCode = props.setCampaignCode;
    let listMsg = props.listMsg;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;


    let renderList = () => {
        if (campagnaList.length > 0) {
            return (
                <tbody>
                {campagnaList?.map((it: any, i: number) =>
                (
                    <tr key={i}>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id={`campagnaChecked_${i}`}
                                    value={it.code}
                                    onChange={(e) =>
                                        chooseCampagnaHandler(e.target.value)
                                    }
                                    checked={selectedCampagna === it.code}
                                />
                                <label className="form-check-label" htmlFor={`campagnaChecked_${i}`}></label>
                            </div>
                        </td>
                        <td>{it.code}</td>
                        <td>{it.description}</td>
                        <td>{it.linea}</td>
                        <td>{it.data_Inizio_Campagna}</td>
                        <td>{it.data_Fine_Campagna}</td>
                        <td>{it.sconto_1}</td>
                        <td>{it.sconto_2}</td>
                        <td>{it.sconto_3}</td>
                        <td>{it.sconto_4}</td>
                        <td>{it.sconto_Merce}</td>
                        <td><Link href={`#`} onClick={() => {
                            setShowReference(true)
                            setCampaignCode(it.code)
                        }
                        }>{it.itemsCount}</Link></td>
                        <td>{it.multicanalità}</td>
                        <td>{it.discount_Zero}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={13} style={{ textAlign: 'center' }}>
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

    let rowDetails: RowType[] = [{ id: 1, th: '-', index: '', orderable: false },
    { id: 2, th: 'Codice', index:'[Code]' , orderable: true },
    { id: 3, th: 'Descrizione campagna', index: '[Description]', orderable: true },
    { id: 4, th: 'Linea', index: '[Linea]', orderable: true },
    { id: 5, th: 'Data inizio', index:'[Data Inizio Campagna]' , orderable: true },
    { id: 6, th: 'Data fine', index:'[Data Fine Campagna]' , orderable: false },
    { id: 7, th: 'Sc.1', index:'[% Sconto 1]' , orderable: false },
    { id: 8, th: 'Sc.2', index: '[% Sconto 2]', orderable: false },
    { id: 9, th: 'Sc.3', index:'[% Sconto 3]' , orderable: false },
    { id: 10, th: 'Sc.4', index:'[% Sconto 4]' , orderable: false },
    { id: 11, th: 'Sconto Merce', index:'' , orderable: false },
    { id: 12, th: 'Ref.', index: '', orderable: false },
    { id: 13, th: 'Multi canalita', index: '[Multicanalità]', orderable: false },
    { id: 14, th: 'Sconto zero', index: '[Discount Zero]', orderable: false },
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

export default CampagnaTable