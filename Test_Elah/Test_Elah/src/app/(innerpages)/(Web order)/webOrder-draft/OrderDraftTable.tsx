
"use client"
import React from 'react'
import Image from "next/image";
import eyeImg from '@/img/eye.png';
import dlticn from '@/img/trash.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowDown from "@/img/arrow-down.png";
import SectionLoader from '@/app/components/shared/SectionLoader';
import { useDispatch } from 'react-redux';
import { updateUrlObject } from '@/redux/slices/action-slice';

type Props = {
    orderDraftList: any[];
    loadmoreHandler: any;
    listLastPage: boolean;
    moreLoading: boolean;
    sortingHandler: any;
    sorting: boolean;
    codiceCliente : any;
}

const OrderDraftTable = (props: Props) => {
    const orderDraftList = props.orderDraftList;
    let loadmoreHandler = props.loadmoreHandler;
    let listLastPage = props.listLastPage;
    let moreLoading = props.moreLoading;
    let sortingHandler = props.sortingHandler;
    let sorting = props.sorting;
    const router = useRouter();
    const dispatch = useDispatch();
    const codiceCliente = props.codiceCliente ;

    interface RowType {
        id: number;
        th: string;
        name: string;
        index: string;
        orderable: boolean;
    }

    let rowDetails: RowType[] = [{ id: 1, th: '', name: '', index: '', orderable: false },
    { id: 2, th: '', name: '', index: '', orderable: false },
    { id: 3, th: 'Data ins.', name: 'CreatedDate', index: 'TAB.[created_date]', orderable: true },
    { id: 4, th: 'Data ordine', name: 'OrderDate', index: 'TAB.[order_date]', orderable: true },
    { id: 5, th: 'Data Consegna', name: 'RichestaDate', index: 'TAB.[richiesta_date]', orderable: true },
    { id: 6, th: 'Rif.Ord.cl.', name: 'CustRef', index: 'TAB.[rif_order_cliente]', orderable: true },
    { id: 7, th: 'Totale ordine', name: 'Total', index: 'TAB.[total]', orderable: false },
    { id: 8, th: 'Totali righe', name: 'Lines', index: 'TAB.[lines]', orderable: false }];




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
                                        orderDraftList?.map((draft, index) => {
                                            let keyId = index;
                                            return (
                                                <tr key={keyId}>
                                                    {/* <td onClick={() => router.push('web-order-view')}>
                                                    <Image width={15} src={eyeImg} alt="Image" />
                                                </td> */}
                                                    {/* <td><Link href='' ><Image src={eyeImg} className="img_col" alt="eye icon" /></Link></td> */}


                                                    <td>
                                                        <button onClick={() => {
                                                            //const urlParamObject = {codiceCliente,orderid : draft.OrderId};
                                                            const urlParamObject = {
                                                                // codiceCliente: 'C042954', // hardcoded value
                                                                // orderid: '33',
                                                                // orderNumber: '100'        // hardcoded value

                                                                pageNo:"1",  
                                                                currentPage:1,
                                                                orderId:33,
                                                                codiceCliente:"C042954",
                                                                orderNumber :"100"

                                                            };
                                                            dispatch(updateUrlObject(urlParamObject));
                                                            router.push('web-order-detail');
                                                        }}>
                                                            <Image src={eyeImg} className="img_col" alt="eye icon" /></button>
                                                    </td>
                                                    <td><Link href='' ><Image src={dlticn} className="img_col" alt="delete icon" /></Link></td>
                                                    <td>{draft.CreatedDate}</td>
                                                    <td>{draft.OrderDate}</td>
                                                    <td>{draft.RichestaDate}</td>
                                                    <td>{draft.CustRef}</td>
                                                    <td>{draft.Total}</td>
                                                    <td>{draft.Lines}</td>
                                                </tr>
                                            )
                                        }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {moreLoading ? <SectionLoader Size='20px' />
                        :
                        !listLastPage && orderDraftList?.length > 0 &&
                        <button id='LoadMoreBtn' className='site_btn primary_btn'
                            style={{ margin: '45px auto 0' }}
                            onClick={loadmoreHandler}>Carica di più</button>
                    }
                </div>
            </div>
        </section>
    )
}

export default OrderDraftTable