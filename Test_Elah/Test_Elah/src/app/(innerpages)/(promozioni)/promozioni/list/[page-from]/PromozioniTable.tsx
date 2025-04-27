
import React from 'react';
import Image from 'next/image';
import eyeImg from '@/img/eye.png';
import editImg from '@/img/pencil.png';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import ArrowDown from "@/img/arrow-down.png";
import { filterType } from './page';
import ViewText from '@/app/components/shared/ViewText';
type Props = {
    filter: filterType;
    promozioniList: any[];
    loadmoreHandler: any;
    isLastPage: boolean;
    moreLoading: boolean;
    listLinkFn: any;
    referenzeLinkFn: any;
    assegnatariLinkFn: any;
    navintegrationLinkFn: any;
    sortingHandler: any;
    sorting: boolean;
    listMsg: string;

}

const PromozioniTable = (props: Props) => {
    const filter = props.filter;
    const promozioniList = props.promozioniList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let moreLoading = props.moreLoading;
    let listLinkFn = props.listLinkFn;
    let referenzeLinkFn = props.referenzeLinkFn;
    let assegnatariLinkFn = props.assegnatariLinkFn;
    let navintegrationLinkFn = props.navintegrationLinkFn;
    let pageFrom = filter.pageFrom;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    let listMsg = props.listMsg;

    const router = useRouter();
    const txtLimit: React.CSSProperties | undefined = {
        maxHeight: "200px",
        overflow: "hidden",
        overflowY: "auto"
    }

    function actionImgComponent(obj: any) {
        if ((obj.pvCounts > 0 && obj.ItemsCount > 0 && pageFrom == "authorize"
            && obj.promotionUsedCount == 0 && obj.campaignStatus == 1) || (pageFrom == "" &&
                obj.Nav_process_status != '1' && obj.Authorization_status != '2' && obj.promotionUsedCount == 0 && obj.campaignStatus == 1)
            || (pageFrom == "" && obj.Authorization_status == '2' &&
                obj.sendForAuthorization == '0' && obj.promotionUsedCount == 0 && obj.campaignStatus == 1))
            return (
                <button type="button" className="" onClick={() => { router.push('/promozioni/promozioniEdit') }}>
                    <Image width={25} src={editImg} alt="Image" />
                </button>
            )
        else if (pageFrom == 'visualizzazione' || (pageFrom == "" &&
            (obj.Authorization_status == '2' || obj.promotionUsedCount != 0 || obj.Nav_process_status == '1' || obj.campaignStatus == 0)))
            return (
                <button type="button" className="" onClick={() => { router.push('/promozioni/promozioniView') }}>
                    <Image width={25} src={eyeImg} alt="Image" />
                </button>
            )
        else
            return null;
    }
    const tableLegends = [{ id: 1, color: '#82EC82', legend: 'Attiva' }, { id: 2, color: '#ffffff', legend: 'Pronto per attivazione' },
    { id: 3, color: '#B1FFD2', legend: 'Autorizzato' }, { id: 4, color: '#FFA581', legend: 'Non autorizzato' }, { id: 5, color: '#fbe08f', legend: 'Da autorizzare' },
    { id: 6, color: '#dfdfdf', legend: 'Dati incompleti' }, { id: 7, color: '#faa9c8', legend: 'ERRORE INTEGRAZIONE NAV' }, { id: 8, color: '#FFFFB0', legend: 'INVIATA PER INTEGRAZIONE NAV' }
    ];


    interface RowType { id: number; th: string; index: string; orderable: boolean; }

    let rowDetails: RowType[] = [{ id: 1, th: '-', index: '', orderable: false },
    { id: 2, th: 'Codice', index: '[code]', orderable: true },
     { id: 3, th: 'Camp.', index: 'USERS.[user_agent_code]', orderable: true },
    { id: 4, th: 'Descrizione promozione', index: 'convert(nvarchar(max),description)', orderable: true },
     { id: 5, th: 'Data rev.', index: '[promozioni_data_ultima_revizione]', orderable: true },
    { id: 6, th: 'Sell-in periodo', index: 'data', orderable: false }, 
    { id: 7, th: 'Gr.', index: '', orderable: false },
    { id: 8, th: 'S. Gr.', index: '', orderable: false },
     { id: 9, th: 'PDV', index: '', orderable: false },
     { id: 10, th: 'Ref', index: '', orderable: false },
     { id: 11, th: 'Status autorizzazione', index:'promozioni_authorize' , orderable: true },
     { id: 12, th: 'Status', index: 'promozioni_status', orderable: true },
     { id: 13, th: `${pageFrom == 'authorize' ? 'Motivazione autorizzazione' : 'Nav integration status'}`, 
     index: 'promozioni_nav_process_status' , orderable: true },

    ];

    let tableFields = ['-', 'Codice', 'Camp.', 'Descrizione promozione', 'Data rev.', 'Sell-in periodo', 'Gr.', 'S. Gr.', 'PDV', 'Ref', 
    'Status autorizzazione', 'Status'];//names used to specify heading of each column
    pageFrom == 'authorize' ? tableFields.push("Motivazione autorizzazione") : tableFields.push("Nav integration status");




    let renderList = () => {
        if (promozioniList.length > 0) {
            return (
                <tbody>
                    {promozioniList?.map((obj: any, i: number) => {
                        let keyId = i;
                        let displayGruppo = obj.gruppo == "1" ? (obj.gruppoID.split("#")[0]) : obj.gruppo;
                        let displaySottoGruppo = obj.sotto == "1" ? (obj.sottoGroupID.split("#")[0]) : obj.sotto;
                        let displayPv = obj.pvCounts == "1" ? obj.pdvID : obj.pvCounts;

                        return (
                            <tr key={keyId}>
                            <td style={{ width: '3%' }}>{actionImgComponent(obj)}
                                <input className='obj_status' value={obj.status} type='hidden' />
                                <input className='obj_authorization_status' value={obj.Authorization_status} type='hidden' />
                                <input className='obj_nav_status' value={obj.Nav_status} type='hidden' />
                            </td>
                            <td style={{ width: '5%' }}>{obj.Codice}</td>
                            <td style={{ width: '8%' }}>{obj.campaign}</td>

                            <td style={txtLimit}>
                                {obj.Description}
                            </td>
                            <td style={{ width: '10%' }}>{obj.Data}</td>
                            <td style={{ width: '12%' }}>{obj.DataIn}</td>
                            <td style={{ width: '3%' }} className='list_number_td'><Link href={'#'} onClick={() => {
                                listLinkFn(pageFrom, 'gruppo', obj.PromoId, obj.campaign);
                            }}
                            >{displayGruppo}</Link>

                            </td>


                            <td style={{ width: '3%' }} className='list_number_td'><Link href={'#'} onClick={() => {

                                listLinkFn(pageFrom, 'sottogruppo', obj.PromoId, obj.campaign);

                            }}
                            >{displaySottoGruppo}</Link>
                            </td>
                            <td style={{ width: '7%' }} className='list_number_td'>
                                <Link href={''}
                                    onClick={() => {
                                        assegnatariLinkFn(obj.PromoId, obj.campaign);
                                    }}
                                >{displayPv}</Link>
                            </td>

                            <td style={{ width: '5%' }} className='list_number_td'>
                                <Link href={''}
                                    onClick={() => {
                                        referenzeLinkFn(obj.PromoId, obj.campaign);
                                    }}
                                >{obj.ItemsCount}</Link>

                            </td>


                            <td style={{ width: '5%' }}>{obj.authorization}</td>
                            <td style={{ width: '5%' }}>{obj.status}</td>

                            <td onClick={() => obj.Nav_Promotion_Code == 'Eseguito' && navintegrationLinkFn(obj.PromoId, obj.posting_date)}>

                                {obj.Nav_Promotion_Code == 'Eseguito' ? <Link href={""}>{obj.Nav_Promotion_Code}</Link> : obj.Nav_Promotion_Code}

                            </td>


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
        <section className='mt-3'>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table id='listTable' className="table-main table table-borderless notify_table">
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
                        promozioniList.length > 0 && !isLastPage &&
                        <button id='LoadMoreBtn' className='site_btn primary_btn'
                            style={{ margin: '10px auto 0' }}
                            onClick={loadmoreHandler}>caricare di più</button>
                    }
                    <div className='table_legends'>
                        <ul>
                            {tableLegends?.map((tableLegend) => {
                                return (
                                    <li key={tableLegend.id}>
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

export default PromozioniTable;