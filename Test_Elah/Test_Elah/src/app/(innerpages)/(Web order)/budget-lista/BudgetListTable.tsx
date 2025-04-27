import React from 'react'
import { filterType } from './page';
import Link from 'next/link';
import Image from "next/image";
import cartPng from "@/img/cart.png";
import { useRouter } from 'next/navigation';
import detail_page from "@/img/detail_page.png"
type Props = {
    filter :filterType;
    budgetValoriLinkFn : any;
}

const BudgetListTable = (props: Props) => {
    const filter = props.filter;
    const router = useRouter();
    const  budgetValoriLinkFn = props. budgetValoriLinkFn;

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
                                        <th>Anno</th>
                                        <th>Area</th>
                                        <th>Q.1 Budget</th>
                                        <th>Q.1 Used</th>
                                        <th>Q.2 Budget</th>
                                        <th>Q.2 Used</th>
                                        <th>Q.3 Budget</th>
                                        <th>Q.3 Used</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                          
                                        {/* Remove this images and give correct image */}
                                        <td onClick={() => router.push('budget-omaggi-area/budget-detail')}>
                                            <Image src={detail_page} className="img_col" alt="Image" />
                                        </td>
                                       
                                        <td>Anno</td>
                                        <td>Area</td>
                                        <td>Q.1 Budget</td>
                                        <td><Link href =''  onClick={() => { budgetValoriLinkFn()}}> Q.1 Used</Link></td>
                                        <td>Q.2 Budget</td>
                                        <td><Link href =''  onClick={() => { budgetValoriLinkFn()}}> Q.2 Used</Link></td>
                                        <td>Q.3 Budget</td>
                                        <td><Link href =''  onClick={() => { budgetValoriLinkFn()}}> Q.3 Used</Link></td>
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

export default BudgetListTable