import React from 'react'
import { filterType } from './page';
import SectionLoader from '@/app/components/shared/SectionLoader';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import Link from 'next/link';
import ViewText from '@/app/components/shared/ViewText';


type Props = {
    loadmoreHandler: any;
    isLastPage: boolean;
    CancellazionePromozioniList: any[];
    referenzeLinkFn : any;
    promoInfoLinkFn : any;
    moreLoading : boolean;
    sortingHandler: any;
    sorting: boolean;
    listMsg: string;
}

const cancellazionepromozioniTable = (props: Props) => {
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let CancellazionePromozioniList = props.CancellazionePromozioniList;
    let referenzeLinkFn = props.referenzeLinkFn;
    let promoInfoLinkFn = props.promoInfoLinkFn;
    let moreLoading = props.moreLoading;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    let listMsg = props.listMsg;

    let renderList = () => {
        if (CancellazionePromozioniList?.length > 0) {
            return (
                <tbody>
                    { CancellazionePromozioniList?.map((row: any) => {
                                        return (
                                            <tr key={row.id}>
                                            <td></td>
                                            <td>{row.Codice}</td>
                                            <td>{row.campaign}</td>
                                            <td>{row.Description}</td>
                                            <td>{row.Datarev}</td>
                                            <td>{row.DataIn}</td>
                                            <td><Link href =''
                                             onClick={() => {
                                                referenzeLinkFn(row.PromoId, row.campaign);
                                            }}>{row.ItemsCount}</Link>
                                            </td>
                                            
                                            <td>{row.authorization}</td>
                                            <td>{row.status}</td>
                                            <td><Link href =''
                                             onClick={() => {
                                                promoInfoLinkFn(row.PromoId,row.posting_date,row.Codice);
                                            }}>{row.Nav_Promo_Code}</Link>
                                            </td>
                                            <td>{row.Nav_Promotion_Code}</td>
                                          
                                            </tr>
                                        )
                                    })
                                }
                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td colSpan={11} style={{ textAlign: 'center' }}>
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
    { id: 2, th: 'Codice', index: '[code]', orderable: true },
    { id: 3, th: 'Camp.',  index: '[campaign]', orderable: true },
    { id: 4, th: 'Descrizione promozione', index: 'description', orderable: true },
    { id: 5, th: 'Data rev.', index: '[promozioni_data_ultima_revizione]', orderable: true },
    { id: 6, th: 'Sell-in periodo', index: 'data', orderable: false },
    { id: 7, th: 'Ref', index: '', orderable: false },
    { id: 8, th: 'Status autorizzazione', index: 'promozioni_authorize', orderable: true },
    { id: 9, th: 'Status', index: 'promozioni_status', orderable: true },
    { id: 10, th: 'promozione Info', index: 'promozioni_nav_process_status', orderable: true },
    { id: 11, th: 'Delete log', index: '', orderable: true }];


    return (
        <section >
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
                                        <td colSpan={11} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                        </td>
                                    </tr>
                                </tbody> : renderList()}
                        </table>
                    </div>
                    </div>
                </div>
               {moreLoading ? <SectionLoader Size='20px' />
                    :
                    CancellazionePromozioniList?.length > 0 && !isLastPage &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ margin: '45px auto 0' }}
                        onClick={loadmoreHandler}>caricare di più</button>
                }
            </div>
        </section>
    )
}

export default cancellazionepromozioniTable