
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//type Props = {}

const AuthorizioneResiTable = () => {

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
                                        <th>Data reso</th>
                                        <th>Valorizzazione</th>
                                        <th>Ag.</th>
                                        <th>Area</th>
                                        <th>Codice Cliente</th>
                                        <th>Ragione sociale</th>
                                        <th>Indirizzo</th>
                                        <th>Localita</th>
                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td onClick={() => router.push('autorizzazione-resi/authorize-resi')}><Link href={''}>click</Link></td>
                                        <td>Data reso</td>
                                        <td>Valorizzazione</td>
                                        <td>Ag.</td>
                                        <td>Area</td>
                                        <td>Codice Cliente</td>
                                        <td>Ragione sociale</td>
                                        <td>Indirizzo</td>
                                        <td>Localita</td>
                                        
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

export default AuthorizioneResiTable