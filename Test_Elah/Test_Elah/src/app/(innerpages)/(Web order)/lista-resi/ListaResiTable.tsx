import React from 'react'
import { filterType } from './page';
import Link from 'next/link';
import Image from "next/image";
import cartPng from "@/img/cart.png";
import { useRouter } from 'next/navigation';
import detail_page from "@/img/detail_page.png"

type Props = {
    filter :filterType;
}

const ListaResiTable = (props: Props) => {
    const filter = props.filter;
    const router = useRouter()
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
                                        <th>-</th>
                                        <th>Data ins.</th>
                                        <th>Numero Ordine</th>
                                        <th>Data Reso</th>
                                        <th>Ag.</th>
                                        <th>Area</th>
                                        <th>Codice Cliente</th>    
                                        <th>Ragione Sociale</th>
                                        <th>Indrizzo</th>
                                        <th>Localita</th>
                                        <th>Tot. Reso</th>

                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                         {/* Remove this images and give correct image */}
                                         <td onClick={() => router.push('/common/web-reso-view')}>
                                            <Image src={detail_page} className="img_col" alt="Image" />
                                        </td>
                                        <td><Link href={`/#`}> </Link></td>
                                        <td>Data ins.</td>
                                        <td onClick={() => router.push('common/ordini')}><Link href={''}>Numero Ordine</Link></td>
                                        <td>Data Reso</td>
                                        <td>Ag.</td>
                                        <td>Area</td>
                                        <td>Codice Cliente</td>
                                        <td>Ragione Sociale</td>
                                        <td>Indrizzo</td>
                                        <td>Localita</td>
                                        <td>Tot. Reso</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              
            </div>
        </section>
    )
}

export default ListaResiTable