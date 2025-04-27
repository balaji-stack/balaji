import React from 'react'
import { filterType } from './page';
import Image from "next/image";
import cartPng from "@/img/cart.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
    filter :filterType;
}

const AutorizzazioneTable = (props: Props) => {

    const router = useRouter();
    const filter = props.filter;
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
                                        <th>Data ins.</th>
                                        <th>Numero Ordine</th>
                                        <th>Data ordine</th>
                                        <th>Data Consegna</th>
                                        <th>Rif. Ord. cl.</th>
                                        <th>Ag.</th>
                                        <th>Area</th>
                                        <th>Codice cliente</th>
                                        <th>Ragione sociale</th>
                                        <th>Indirizzo</th>
                                        <th>Località</th>
                                        <th>Tot. ordine</th>
                                        <th>Motivazione autorizzazione</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td onClick={() => router.push('autorizzazione-ordine/web-order-authorize')}><Link href={''}>click</Link></td>
                                        <td>Data ins.</td>
                                        <td>Numero Ordine</td>
                                        <td>Data ordine</td>
                                        <td>Data Consegna</td>
                                        <td>Rif. Ord. cl.</td>
                                        <td>Ag.</td>
                                        <td>Area</td>
                                        <td>Codice cliente</td>
                                        <td>Ragione sociale</td>
                                        <td>Indirizzo</td>
                                        <td>Località</td>
                                        <td>Tot. ordine</td>
                                        <td>Motivazione autorizzazione</td>
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

export default AutorizzazioneTable