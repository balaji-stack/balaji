'use client'
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useEffect, useState } from 'react'
import DetailListaTable from './DetailListaTable'
import SERVER_URL from '@/helpers/common'
import axios from 'axios'
import { popupMsg } from '@/helpers/messages'
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {

    userId: string,
    operationDate: string,

    CloseDetailHandler : any;
}
let pg: number = 0;
const size: number = 10;
const Page = (props: Props) => {
    const CloseDetailHandler = props.CloseDetailHandler;
    const filter ={userId: props.userId,operationDate: props.operationDate}
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [userStatsDetailsList, setUserStatsDetailsList] = useState<any>([]);

   
 
 
    //getting user-stats details list
    const getUserStatsDetailsList = async () => {
        const URL = `${SERVER_URL}/user-stats/getUserStatsdetaillist?page=${pg}&size=${size}`;

        // Using the AXIOS library to make a POST request
        await axios
            .post(URL,filter, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    pg > 0
                        ? setUserStatsDetailsList((prev: any) => [...prev, ...apiData.users]) : setUserStatsDetailsList(apiData.users);                  

                    let lastPage = userStatsDetailsList.length + apiData.users.length == apiData.count ||
                                    apiData.users.length < size;
                        setIsLastPage(lastPage);
                        setIsSectionLoading(false);
            })
            .catch((error) => {
                popupMsg(error.message,"error");
            })
            .finally(()=>{          
                setIsSectionLoading(false);
            });
    }

    useEffect(() => {
        pg = 0;
        getUserStatsDetailsList();
    }, [])

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getUserStatsDetailsList();
    }

    return (
        <main>
            <Card>
            
            <div className='row'>


            <div className="title_block-arrow">
                      <button type="button" onClick={CloseDetailHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>

                    <Title heading="DETAIL LISTA"></Title>
          
                <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{"width": "57%"}}>
                    <div className="btn_grp_header">
                        <div className="link_grp">
                            <ul className="subnav_ul">
                                <li>
                                    <h1 className='ms-20'>Statistica per sezioni</h1>
                                </li>
                                <li>
                                    <p>Periodo : {filter.operationDate}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>         
            </div>
            
           
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="LISTA"></Title>
                            </div>
                        </div>
                    </div>
                    <DetailListaTable userStatsDetailsList={userStatsDetailsList} 
                    loadmoreHandler={loadmoreHandler} isLastPage={isLastPage} isSectionLoading={isSectionLoading}/>
                </div>
            </Card>
        </main>
    )
}

export default Page