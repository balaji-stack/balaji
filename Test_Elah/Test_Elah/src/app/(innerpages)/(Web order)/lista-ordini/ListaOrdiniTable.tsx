import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Image from "next/image";
import detail_page from "@/img/detail_page.png"

//type Props = {}

const OrderEntryTable = () => {
    const pathname = usePathname()
    const router = useRouter();

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
                                        <th>Data Ins</th>
                                        <th>Numero Ordine</th>
                                        <th>Data ordine</th>
                                        <th>Data Consegna</th>
                                        <th>Rif.Ord.Cl.</th>
                                        <th>Ag.</th>
                                        <th>Area</th>
                                        <th>Codice Cliente</th>
                                        <th>Ragione sociale</th>
                                        <th>Indirizzo</th>
                                        <th>Localitta</th>
                                        <th>Tot.Ordine</th>
                                        <th>Messaggio</th>
                                        <th>Nr. ddt</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* Remove this images and give correct image */}
                                    <td onClick={() => router.push('web-order-view')}>
                                            <Image src={detail_page} className="img_col" alt="Image" />
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                        onClick={props.loadmoreHandler}>caricare di più</button>
                } */}
            </div>
        </section>
    )
}

export default OrderEntryTable