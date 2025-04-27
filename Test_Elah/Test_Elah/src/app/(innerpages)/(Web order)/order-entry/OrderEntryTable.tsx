import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import cartPng from "@/img/cart.png";
import ArrowDown from "@/img/arrow-down.png";
import { filterType } from './page';
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useDispatch } from 'react-redux';
import { updateUrlObject } from '@/redux/slices/action-slice';
import { useRouter } from 'next/navigation';
type Props = {
    filter: filterType;
    orderByList: any[];
    loadmoreHandler: any;
    listLastPage: boolean;
    moreLoading: boolean;
    sortingHandler: any;
    sorting: boolean;
    orderdraftListFn: any;
}

const OrderEntryTable = (props: Props) => {
    const filter = props.filter;
    let orderByList = props.orderByList;
    let loadmoreHandler = props.loadmoreHandler;
    let listLastPage = props.listLastPage;
    let moreLoading = props.moreLoading;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    const orderdraftListFn = props.orderdraftListFn;

    
  const dispatch = useDispatch();
  const router = useRouter();
    interface RowType {
        id: number;
        th: string;
        index: string;
        orderable: boolean;
    }
    let rowDetails: RowType[] = [{ id: 1, th: '', index: '', orderable: false },
    { id: 2, th: '', index: '', orderable: false }, { id: 3, th: 'Codice',index: 'CUST.[No_]', orderable: true },
    { id: 4, th: 'Ragione sociale', index: 'CUST.[Name]', orderable: true }, { id: 5, th: 'Cod Ricerca', index: 'CUST.[Search Name]', orderable: true },
    { id: 6, th: 'Citta', index: 'CUST.[City]', orderable: false }, { id: 7, th: 'Indirizzo', index: 'CUST.[Address]', orderable: true },
    { id: 8, th: 'Super Gruppo', index: 'CUST.[Criteria 4]', orderable: true }, { id: 9, th: 'Gruppo', index: 'CUST.[Criteria 5]', orderable: true },
    { id: 10, th: 'Sotto Gruppo', index: 'CUST.[Criteria 6]', orderable: true }, { id: 11, th: 'Agente', index: 'CUST.[Salesperson Code]', orderable: true },
    { id: 12, th: 'Area', index: 'CUST.[Criteria 1]', orderable: true }];
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
                                <tbody>
                                    {sorting ? <SectionLoader Size='5' /> :
                                        orderByList?.map((row, index: number) => {
                                            let keyId = index;
                                            const rowtextColor = row.Gestione_Web === 2 ? '#f57f17' : '#0000A0';
                                            return (
                                                <tr key={keyId} >
                                                    <td>
                                                        {row.OrderCount >= 1 && (
                                                            <Link href='' onClick={() => { orderdraftListFn(row.CustCode) }}>+</Link>
                                                        )}
                                                    </td>

                                                    <td>
                                                        <button onClick={()=> {
                                                            const urlParamObject = {codiceCliente:row.CustCode,ssupergruppo: row.SuperGruppo,gestioneWeb:row.Gestione_Web};
                                                            dispatch(updateUrlObject(urlParamObject));
                                                            router.push('order-entry/web-order-add');
                                                        }}>
                                                        <Image src={cartPng} className="img_col" alt="Image"/></button></td>
                                                    <td>{row.CustCode}</td>
                                                    <td style={{color: rowtextColor }}>{row.CustomerName}</td>
                                                    <td style={{color: rowtextColor }}>{row.CodRicerca}</td>
                                                    <td style={{color: rowtextColor }}>{row.Citta}</td>
                                                    <td >{row.Indirizzo}</td>
                                                    <td >{row.SuperGruppo}</td>
                                                    <td >{row.Gruppo}</td>
                                                    <td>{row.SottoGruppo}</td>
                                                    <td>{row.Agente}</td>
                                                    <td>{row.Area}</td>

                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {moreLoading ? <SectionLoader Size='20px' />
                        :
                        !listLastPage && orderByList?.length > 0 &&
                        <button id='LoadMoreBtn' className='site_btn primary_btn'
                            style={{ margin: '45px auto 0' }}
                            onClick={loadmoreHandler}>Carica di più</button>
                    }
                </div>

            </div>
        </section>
    )
}

export default OrderEntryTable