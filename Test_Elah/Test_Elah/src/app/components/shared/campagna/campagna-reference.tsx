
"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Card from "@/app/components/shared/Card";
import Title from '@/app/components/shared/Title'
import SERVER_URL from '@/helpers/common';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { popupMsg} from '@/helpers/messages';
import SectionLoader from '../SectionLoader';

type Props = {
    setShowReference: Dispatch<SetStateAction<boolean>>;
    campaignCode: string;
}
let pg: number = 0;
const size: number = 7;
let isLastPage: boolean = false

const CampagnaReference = (props: Props) => {

    const router = useRouter();
    let setShowReference = props.setShowReference;
    let campaignCode = props.campaignCode;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);

    const [campagnaReferenceList,setcampagnaReferenceList] = useState<any>([]);

    const getCampagnaReferenceList = async () => {
        const url = `${SERVER_URL}/popup/getCampaignItemListPopup?page=${pg}&size=${size}`;

        await axios
            .post(url, { campaignCode }, {
                withCredentials: true,
            })

            .then((response) => {
                let apiData = response.data;
                    pg > 0
                        ? setcampagnaReferenceList((prev: any) => [...prev, ...apiData.campaignItemList])
                         : setcampagnaReferenceList(apiData.campaignItemList);

                    let lastPage = campagnaReferenceList.length + apiData.campaignItemList.length == apiData.count ||
                        apiData.campaignItemList.length < size;
                    setIsLastPage(lastPage);
                    setIsLoading(false);
                    setIsSectionLoading(false);
            })
            .catch((error) => {
                popupMsg(error.message,"error");

            })
            .finally(()=>{              
                setIsLoading(false);
                setIsSectionLoading(false);
            });
    }
    useEffect(() => {
        pg=0;
        getCampagnaReferenceList();
    }, [])

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getCampagnaReferenceList();
      }
    return (
        <>
            <main>
                {/* <button onClick={() => setShowReference(false)}>Back</button> */}    
                <Card>
                <div className="link_grp">
                        <ul className="subnav_ul">
                            <li>
                                <button type="button" className="site_btn primary_btn" onClick={() => setShowReference(false)}>
                                Back
                                </button>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="table_data">
                        <div className="title_sec">
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <Title heading="LISTA REFERENZE PER LA CAMPAGNA"></Title>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div className="table_section">
                            <div className="inner-content">
                                <div className="inner-table-content">
                                    <div className="table-responsive">
                                        <table className="table-main table table-striped table-borderless">
                                            <thead className="sticky-thead">
                                                <tr>
                                                    <th>Codice</th>
                                                    <th>Descrizione </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {campagnaReferenceList !=undefined && campagnaReferenceList?.map((it: any, i: number) =>
                                                (
                                                    <tr key={i}>
                                                        <td>{it.No_}</td>
                                                        <td>{it.Description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
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
                </Card>
            </main>
        </>
    )
}
export default CampagnaReference