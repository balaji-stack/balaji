import SectionLoader from '@/app/components/shared/SectionLoader';
import React from 'react'

type Props = {
    userStatsDetailsList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
}

const DetailListaTable = (props: Props) => {
    const userStatsDetailsList = props.userStatsDetailsList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>
                                        <th>Sezione</th>
                                        <th>Visite</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userStatsDetailsList?.map((it: any,i: number) => {
                                        return (
                                        <tr key={i}>
                                            <td>{it.sectionName}</td>
                                            <td>{it.totalPages}</td>
                                        </tr>)
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
                        onClick={loadmoreHandler}>caricare di più</button>
                }
            </div>
        </section>
    )
}

export default DetailListaTable