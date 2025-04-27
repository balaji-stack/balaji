import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const DdtTable = (props: Props) => {
    const pathname = usePathname()
    function test() {
        console.log(pathname);
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
                                        <th>-</th>
                                        <th>Agent Code</th>
                                        <th>Area Code</th>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Login</th>
                                        <th>Type</th>
                                        <th>E-mail</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>-</td>
                                        <td>Agent Code</td>
                                        <td>Area Code</td>
                                        <td>Name</td>
                                        <td>Surname</td>
                                        <td>Login</td>
                                        <td>Type</td>
                                        <td>E-mail</td>
                                        <td onClick={test}>Active</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* {props.isSectionLoading ? <SectionLoader Size='20px' />
                    :
                    !props.isLastPage &&
                    <button id='LoadMoreBtn' className='site_btn primary_btn'
                        style={{ position: 'absolute', left: '45%', marginTop: '50px' }}
                        onClick={props.loadmoreHandler}>load more</button>
                } */}
            </div>
        </section>
    )
}

export default DdtTable