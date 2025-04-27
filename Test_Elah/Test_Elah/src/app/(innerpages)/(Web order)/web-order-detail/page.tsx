"use client"
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import SERVER_URL from '@/helpers/common';
import axios, { AxiosError } from 'axios';
import { popupMsg } from '@/helpers/messages';
import OrdineTestataTab from './ordine-testata-tab';
import OrdineRigheTab from './ordine-righe-tab';
import FullPageLoader from '@/app/components/shared/FullPageLoader';

type Props = {
}
let pg: number = 0;
const size: number = 5;
const Page = (props: Props) => {
    const [apiData, setApiData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
   // const detailparam = useSelector((state: any) => state.action.urlParamObject);
   const detailparam = {"pageNo": "1",
    "currentPage": 1,
    "orderId": 33,
    "codiceCliente": "C042954",
    "orderNumber": "100"}
    const getWebOrderDraftListDetail = async () => {
        const url = `${SERVER_URL}/orderEntry/getWebOrderDraftListDetail?page=${pg}&size=${size}`;
        // Using the AXIOS library to make a POST request
        await axios
            .post(url, detailparam, {
                withCredentials: true,
            })
            .then((response: any) => {
                setApiData(response.data);
            })
            .catch((e: AxiosError) => {
                let status = e.status;
                if (status === 401) {
                    popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
                    router.push('/login');
                } else {
                    popupMsg("qualcosa è andato storto", "error");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }


    useEffect(() => {
        setLoading(true);
        getWebOrderDraftListDetail();
    }, []);

    let ordineTestataTabProps = { apiData };
    return (
        <>
            {loading ? <FullPageLoader />
                :
                <main>
                    <div className="page_title">
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <Title heading="WEB ORDINI"></Title>
                            </div>
                            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                                <div className="btn_grp_header">
                                    <div className="link_grp">
                                        <ul className="subnav_ul" >
                                            <li>
                                                <Link href="#">Ritorna</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Primo</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Precedente</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Successivo</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Ultimo</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab_block">
                        <Tabs defaultActiveKey="ordine testata" id="uncontrolled-tab-example" className="button_tab_block" >
                            <Tab eventKey="ordine testata" title="ORDINE TESTATA">
                                <OrdineTestataTab {...ordineTestataTabProps} />
                            </Tab>
                            <Tab eventKey="ordine righe" title="ORDINE RIGHE (0 RECORDS)">
                                <OrdineRigheTab />
                            </Tab>
                        </Tabs>
                        <Card>
                            <div className="row">
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                    <button type="button" className="site_btn brdr_btn" style={{ padding: '0px 25px' }}>
                                        Conferma ordine
                                    </button>
                                </div>

                                <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{ display: 'flex', justifyContent: 'end' }}>
                                    <button type="button" className="site_btn brdr_btn"
                                        onClick={() => router.push('web-order-edit')}>
                                        Modifica
                                    </button>
                                </div>
                            </div>

                        </Card>
                    </div>






                </main>
            }
        </>
    )
}



export default Page