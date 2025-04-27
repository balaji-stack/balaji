"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
    ordiniList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
}

const OrdiniListTable = (props: Props) => {
    const router = useRouter();
    let searchParams = useSearchParams();
   // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
    return (
        <div className="table_section">
            <div className="inner-content">
                <div className="inner-table-content">
                    <table className="table-main table table-striped table-borderless">
                        <thead className="sticky-thead">
                            <tr>
                                <th>Ord</th>
                                <th>Data Ordine</th>
                                <th>Ag.</th>
                                <th>Cli.</th>
                                <th>Cli.Fatt</th>
                                <th>Ragione sociale</th>
                                <th>Città spedizione</th>
                                <th>Indirizzo</th>
                                <th>Totale ordine</th>
                                <th>Rich. Cons.</th>
                                <th>Nr. ddt</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.ordiniList?.map((obj: any, i: number) => {
                                return (
                                    <tr key={i}>
                                       
                                        <td>{obj.no}</td>
                                        <td>{obj.order_Date_from}</td>
                                        <td>{obj.salesperson_Code}</td>
                                        <td>{obj.sell_to_Customer_No_}</td>
                                        <td>{obj.bill_to_Customer_No}</td>
                                        <td>{obj.customer_Name}</td>
                                        <td>{obj.ship_to_city}</td>
                                        <td>{obj.ship_to_Address}</td>
                                        <td>{obj.total_Amount}</td>
                                        <td>{obj.requested_Delivery_Date}</td>
                                        <td>{obj.shipping_No}</td>
                                        
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {!props.isLastPage &&
                <button id='LoadMoreBtn' className='site_btn primary_btn'
                    style={{ position: 'absolute', left: '45%', marginTop: '50px' }}
                    onClick={props.loadmoreHandler}>caricare di più</button>
            }
        </div>
    )
}

export default OrdiniListTable