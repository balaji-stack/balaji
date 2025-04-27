import React, { useEffect } from 'react'
import { filterType } from './page'
import SERVER_URL from '@/helpers/common'
import axios from 'axios'
import SectionLoader from '@/app/components/shared/SectionLoader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dlticn from '@/img/trash.png';
import editicn from '@/img/pencil.png';
import Image from "next/image";
import ArrowDown from "../../../../img/arrow-down.png";

type Props = {
    userStatsList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
    orderByHandler: any;
    detailLinkFn : any;
}

const UserStatsTable = (props: Props) => {
    const userStatsList = props.userStatsList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    let orderByHandler = props.orderByHandler;
    let detailLinkFn = props.detailLinkFn;

    const router = useRouter();
    let tableFields = ['-', 'Nome', 'Cognome', 'Login', 'Dati', 'Totale pagine'];//names used to specify heading of each column
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                <tr>
                                        {tableFields?.map((colName: string) => {
                                            return (
                                                <th
                                                    onClick={(e) => orderByHandler(e, colName, tableFields)}>
                                                    <div className="thead_div">
                                                        <label>{colName}</label>
                                                        {tableFields.indexOf(colName) > 0 &&//to get arrow only after first column
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
                                    {userStatsList != undefined && 
                                    userStatsList?.map((obj: any,i :number) =>{
                                        return(
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{obj.userName}</td>
                                                <td>{obj.userSurname}</td>
                                                <td>{obj.userLogin}</td>
                                                <td>{obj.operationDate}</td>


                                                <td>
                                                    <Link href={''}
                                                        onClick={() => {
                                                            detailLinkFn(obj.userId, obj.operationDate);
                                                        }}
                                                    >{obj.totalPages}</Link>
                                                </td>





{/* 
                                                <td><Link href={{
                                                    pathname:`/user-stats/detail-lista`,
                                                    query: {userId :`${obj.userId}`,operationDate : `${obj.operationDate}`}
                                                    }}>{obj.totalPages}</Link></td>                                                */}
                                            </tr>
                                        )
                                    })}
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
                        onClick={loadmoreHandler}>Carica di più</button>
                }
            </div>
        </section>
    )
}

export default UserStatsTable