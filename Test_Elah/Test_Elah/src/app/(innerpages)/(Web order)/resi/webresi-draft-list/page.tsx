"use client"

import Card from '@/app/components/shared/Card';
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from "next/image";
import trashCpyPng from "@/img/trash - Copy.png";
import detail_page from "@/img/detail_page.png"
import Link from 'next/link';


type Props = {}

const page = (props: Props) => {
        const router =useRouter();


  return (
   <main>
     <Card>
       <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Data ins.</th>
                                        <th>Data reso</th>
                                        <th>Valorizzazione</th>
                                        <th>Totali righe</th>
                                        

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* Remove this images and give correct image */}
                                        <td onClick={() => router.push('/common/web-reso-view')}>
                                            <Image src={detail_page} className="img_col" alt="Image" />
                                        </td>
                                        <td><Link href=''> <Image src={trashCpyPng} className="img_col" alt="Image" /></Link></td>
                                        <td>Data ins.</td>
                                        <td>Data reso</td>
                                        <td>Valorizzazione</td>
                                        <td>Totali righe</td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
      
      </Card>
   </main>
  )
}

export default page