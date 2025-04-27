
import React from 'react'
import { filterType } from './page';
import SectionLoader from '@/app/components/shared/SectionLoader';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";
import Link from 'next/link';
import ViewText from '@/app/components/shared/ViewText';

type Props = {
    filter: filterType;
    cambiaPeriodiPromozioniList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    moreLoading: boolean;
    listLinkFn: any;
    referenzeLinkFn: any;
    assegnatariLinkFn: any;
    listMsg: string;
    sortingHandler: any;
    sorting: boolean;
}
const CambiaPeriodiTable = (props: Props) => {

    const filter = props.filter;
    const cambiaPeriodiPromozioniList = props.cambiaPeriodiPromozioniList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let moreLoading = props.moreLoading;
    let listLinkFn = props.listLinkFn;
    let referenzeLinkFn = props.referenzeLinkFn;
    let assegnatariLinkFn = props.assegnatariLinkFn;
    let listMsg = props.listMsg;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;

    const txtLimit: React.CSSProperties | undefined = {
        maxHeight: "200px",
        overflow: "hidden",
        overflowY: "auto"
    }

    const tableLegends = [{ color: '#82EC82', legend: 'Attiva' }, { color: '#ffffff', legend: 'Pronto per attivazione' },
    { color: '#B1FFD2', legend: 'Autorizzato' }, { color: '#FFA581', legend: 'Non autorizzato' }, { color: '#fbe08f', legend: 'Da autorizzare' },
    { color: '#dfdfdf', legend: 'Dati incompleti' }, { color: '#faa9c8', legend: 'ERRORE INTEGRAZIONE NAV' }, { color: '#FFFFB0', legend: 'INVIATA PER INTEGRAZIONE NAV' }
    ];


    interface RowType {
            id: number;
        th: string;
        index: string;
        orderable: boolean;
    }

    let rowDetails: RowType[] = [{ id: 1, th: '-', index: '', orderable: false },
    { id: 2, th: 'Codice', index: '[code]', orderable: true },
    { id: 3, th: 'Camp.', index: '[campaign]', orderable: true },
    { id: 4, th: 'Descrizione promozione', index: 'convert(nvarchar(max),description)', orderable: true },
    { id: 5, th: 'Data rev.', index: '[promozioni_data_ultima_revizione]', orderable: true },
    { id: 6, th: 'Sell-in periodo', index: 'data', orderable: false },
    { id: 7, th: 'Gr.', index: '', orderable: false },
    { id: 8, th: 'S. Gr.', index: '', orderable: false },
    { id: 9, th: 'PDV', index: '', orderable: false },
    { id: 10, th: 'Ref', index: '', orderable: false },
    { id: 11, th: 'Status autorizzazione', index: 'promozioni_authorize', orderable: true },
    { id: 12, th: 'Status', index: 'promozioni_status', orderable: true },
    { id: 13, th: 'Nav integration status', index: 'promozioni_nav_process_status', orderable: true },
    ];

    let renderList = () => {
        if (cambiaPeriodiPromozioniList.length > 0) {
            return (
                <tbody>
                    {cambiaPeriodiPromozioniList?.map((obj: any, i: number) => {
                        let keyId = i;
                        let sottoGroupID = () => {
                            return obj.sottoGroupID.includes("#") ? obj.sottoGroupID.split("#")[0] : obj.sottoGroupID;
                        }
                        let gruppoID = () => {
                            return obj.gruppoID.includes("#") ? obj.gruppoID.split("#")[0] : obj.gruppoID;
                        }
                        let displayGruppo = obj.gruppo == "1" ? sottoGroupID : obj.gruppo;
                        let displaySottoGruppo = obj.sotto == "1" ? gruppoID : obj.sotto;
                        let displayPv = obj.pvCounts == "1" ? obj.pdvID : obj.pvCounts;
                        return (
                            <tr key={keyId}>
                                {/* <td style={{ width: '3%' }}>{actionImgComponent(obj)}
                                <input className='obj_status' value={obj.status} type='hidden' />
                                <input className='obj_authorization_status' value={obj.Authorization_status} type='hidden' />
                                <input className='obj_nav_status' value={obj.Nav_status} type='hidden' />
                            </td> */}
                                <td>-</td>
                                <td style={{ width: '5%' }}>{obj.Codice}</td>
                                <td style={{ width: '8%' }}>{obj.campaign}</td>

                                <td style={txtLimit}>
                                    {obj.Description}
                                </td>
                                <td style={{ width: '10%' }}>{obj.Data}</td>
                                <td style={{ width: '12%' }}>{obj.DataIn}</td>
                                <td style={{ width: '3%' }}><Link href={'#'} onClick={() => {
                                    listLinkFn('gruppo', obj.campaign, obj.PromoId, obj.campaign);
                                }}
                                >{displayGruppo}</Link>

                                </td>


                                <td style={{ width: '3%' }}><Link href={'#'} onClick={() => {

                                    listLinkFn('sottogruppo', obj.campaign, obj.PromoId, obj.campaign);

                                }}
                                >{displaySottoGruppo}</Link>
                                </td>
                                <td style={{ width: '7%' }}>
                                    <Link href={''}
                                        onClick={() => {
                                            assegnatariLinkFn(obj.PromoId, obj.campaign);
                                        }}
                                    >{displayPv}</Link>
                                </td>

                                <td style={{ width: '5%' }}>
                                    <Link href={''}
                                        onClick={() => {
                                            referenzeLinkFn(obj.PromoId, obj.campaign);
                                        }}
                                    >{obj.ItemsCount}</Link>

                                </td>


                                <td style={{ width: '5%' }}>{obj.authorization}</td>
                                <td style={{ width: '5%' }}>{obj.status}</td>
                                <td style={{ width: '5%' }}>{obj.Nav_Promotion_Code}</td>

                            </tr>
                        )
                    })}
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
                                            <td colSpan={13} style={{ textAlign: 'center' }}> <SectionLoader Size='5' />
                                            </td>
                                        </tr>
                                    </tbody> : renderList()}
                            </table>
                        </div>
                    </div>
                    {moreLoading ? <SectionLoader Size='20px' />
                        :
                        cambiaPeriodiPromozioniList.length > 0 && !isLastPage &&
                        <button id='LoadMoreBtn' className='site_btn primary_btn'
                            style={{ margin: '10px auto 0' }}
                            onClick={loadmoreHandler}>caricare di più</button>
                    }
                    <div className='table_legends'>
                        <ul>
                            {tableLegends?.map((tableLegend, i) => {
                                return (
                                    <li key={i}>
                                        <span style={{ backgroundColor: tableLegend.color }}></span>
                                        <label>{tableLegend.legend}</label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CambiaPeriodiTable