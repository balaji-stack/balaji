import React from 'react'
import { filterType } from './page';
import Link from 'next/link';
import Image from "next/image";
import cartPng from "@/img/cart.png";
import { useRouter } from 'next/navigation';

type Props = {
    filter: filterType;
}

const ResiCustomersTable = (props: Props) => {
    const filter = props.filter;
    const router = useRouter();
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
                                        <th>Codice</th>
                                        <th>Ragione Sociale</th>
                                        <th>Code Ricerca</th>
                                        <th>Città</th>
                                        <th>Indrizzio</th>
                                        <th>Super Gruppo</th>
                                        <th>Gruppo</th>
                                        <th>Sotto Gruppo</th>
                                        <th>Agente</th>
                                        <th>Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td onClick={() => router.push('resi/webresi-draft-list')}><Link href={''}>+</Link></td>
                                        <td><Link href={`/common/web-reso-edit`}>
                                            <Image src={cartPng} className="img_col" alt="Image" />
                                        </Link></td>
                                        <td onClick={() => router.push('resi/webresi-puntivendita-detail')}><Link href={''}>Agent Code</Link></td>
                                        <td>Codice</td>
                                        <td>Ragione Sociale</td>
                                        <td>Code Ricerca</td>
                                        <td>Città</td>
                                        <td>Indrizzio</td>
                                        <td>Super Gruppo</td>
                                        <td>Gruppo</td>
                                        <td>Sotto Gruppo</td>
                                        <td>Agente</td>
                                        <td>Area</td>
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

export default ResiCustomersTable