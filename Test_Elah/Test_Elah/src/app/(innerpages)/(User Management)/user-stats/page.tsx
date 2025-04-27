"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import ArrowDown from "../../../../img/arrow-down.png";
import Image from 'next/image'
import UserStatsTable from './UserStatsTable'
import SERVER_URL, { getOrderBy } from '@/helpers/common'
import axios from 'axios';
import { popupMsg } from '@/helpers/messages'
import DetailListaLink from '@/app/(innerpages)/(User Management)/user-stats/detail-lista/DetailListaLink';
import { ToastContainer } from 'react-toastify'
import SectionLoader from '@/app/components/shared/SectionLoader'

type Props = {}
export type filterType = {
    logname: string;
    // operationDateDisplay: Date;
    operationDate: Date;
    //  formattedOperationDate?: string;
    sord: string;
    // userId: Number;
}
let pg: number = 0;
const size: number = 10;
let orderBy: number = 0;
let fieldNames = ['userName', 'userSurname', 'userLogin', 'operationDate'];
export const initialValue = {
    logname: '',
    // operationDateDisplay: new Date,
    operationDate: new Date,
    sord: ''
    //userId : 0
};
const Page = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isSectionLoading, setIsSectionLoading] = useState<boolean>(false);
    const [filterOpen, setFilterOpen] = useState<boolean>(true);
    const [listOpen, setListOpen] = useState<boolean>(true);
    const [filter, setFilter] = useState<filterType>(initialValue);
    const [userStatsList, setUserStatsList] = useState<any>([]);

    const [showDetailListaPage, setShowDetailListaPage] = useState<boolean>(false);



    const filterToggle = () => {
        setFilterOpen(!filterOpen);
    };
 
    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value });
    }


    const getUserStatsList = async () => {
        const URL = `${SERVER_URL}/user-stats/getUserStatiticsList?page=${pg}&size=${size}`;

        await axios
            .post(URL, filter, {
                withCredentials: true,
            })
            .then((response) => {
                let apiData = response.data;
                    pg > 0
                        ? setUserStatsList((prev: any) => [...prev, ...apiData.users]) : setUserStatsList(apiData.users);
                    let lastPage = userStatsList.length + apiData.users.length == apiData.count ||
                        apiData.users.length < size;
                    setIsLastPage(lastPage);
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
        setIsLoading(true);
        pg = 0;
        getUserStatsList();
    }, [])
   


    const searchHandler = () => {
        setIsLoading(true);
        setIsLastPage(false);
        pg = 0;
        getUserStatsList();
    }

    const loadmoreHandler = () => {
        setIsSectionLoading(true);
        pg++;
        getUserStatsList();
    }

    const resetHandler = () => {
        setFilter({ ...initialValue })
    }

    const CloseDetailHandler = () => {
        setShowDetailListaPage(false);
        setFilterOpen(true);
        setListOpen(true);
    }

    const [detailLinkProps, setDetailLinkProps] = useState<any>({
        userId: "",
        operationDate: ""
    })

    const detailLinkFn = (userId: string, operationDate: string) => {
        setDetailLinkProps({ userId, operationDate });
        setShowDetailListaPage(true);
        setFilterOpen(false);
        setListOpen(false);
    }


    const orderByHandler = (e: any, colName: string, tableFields: string[]) => {
        orderBy = getOrderBy(colName, tableFields.slice(1), fieldNames, userStatsList, setUserStatsList, orderBy);//getting orderBy function
        if (orderBy < 1) {
            return false;
        }
        const EL = e.target;//getting current element 
        const thEl = EL.closest('th');
        const activeEl = thEl.closest('tr').querySelector('.sort_active');
        activeEl?.classList.remove("sort_active");
        if (orderBy % 2 != 0) {
            const ascEL = thEl.querySelector(".ascending");
            ascEL.classList.add("sort_active");
        } else {
            const descEL = thEl.querySelector(".descending");
            descEL.classList.add("sort_active");
        }
        e.stopPropagation();
    }


    return (
        <>
      
                <Card padding="20px">
                    <div className={`title_filter_block ${filterOpen ? "filter_title_tog" : ""}`}>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                 <Title heading="RICERCA"></Title>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                                <div className="title_block-arrow">
                                    <button
                                        type="button"
                                        className="filter-arrow"
                                        onClick={filterToggle}
                                    > <Image src={ArrowDown} alt="Image" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`form_block ${filterOpen ? "filter_show" : ""}`}
                        style={{ 'display': 'none' }}
                    >
                        <div className="content_form content_form-filter">
                           <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                    resetHandler={resetHandler} searchHandler={searchHandler} />
                        </div>
                    </div>
                </Card>
                <Card padding="20px">
                    <div className="table_data">
                        <div className={`title_sec title_filter_block ${listOpen ? "filter_title_tog" : ""}`}>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                     <Title heading="LISTA"></Title>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="title_block-arrow" style={{ paddingBottom: '10px' }}>
                                        <button
                                            type="button"
                                            className="filter-arrow"
                                            onClick={() => setListOpen(!listOpen)}
                                        >
                                            <Image src={ArrowDown} alt="Image" />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div
                            className={`form_block ${listOpen ? "filter_show" : ""}`}
                            style={{ display: 'none' }}
                        >
                            <div className="content_form content_form-filter">
                               
                            {isLoading ? <SectionLoader Size='50px' />
                            :
                        
                                   <UserStatsTable userStatsList={userStatsList} loadmoreHandler={loadmoreHandler}
                            isLastPage={isLastPage} isSectionLoading={isSectionLoading} orderByHandler={orderByHandler}
                            detailLinkFn ={detailLinkFn} />

                        }
                            </div>
                        </div>
                    </div>

                    <ToastContainer />
                </Card>


               {showDetailListaPage && <div id="detailLista_link" >
                    <DetailListaLink {...detailLinkProps} CloseDetailHandler={CloseDetailHandler} />
                </div>
                }
         
    </>

    )
}

export default Page