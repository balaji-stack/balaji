import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import Link from 'next/link';
import React, { useEffect } from 'react'

type Props = {
    RefData :any;
	postingdate :any;
	linkDetailFn: any;
	
}
const NavisionIntegrationTable = (props: Props) => {
const TableData = props.RefData;
const linkDetailFn = props.linkDetailFn;


const successCustDiscGroup 			= TableData?.countCustDiscountGroup?.SuccessCustDiscGroup;
const failCustDiscGroup    			= TableData?.countCustDiscountGroup?.FailCustDiscGroup;
const successSalesLine     			= TableData?.countSuccessSalesLine?.SuccessSalesLine;
const FailSalesLine        			= TableData?.countSuccessSalesLine?.FailSalesLine;
const successLineDiscSeq  	 		= TableData?.countSuccessLineDiscSeq?.SuccessLineDiscSeq;	
const FailLineDiscSeq				= TableData?.countSuccessLineDiscSeq?.FailLineDiscSeq;


  return (
    <section>
	 <Title fontSize={16}
	  heading={`Navision Integration Log- ${TableData.promozioniCode} - ( ${TableData.promozioniDescription} ) Eseguito il ${props.postingdate}`}></Title>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">

				
				<table className='table-main table table-striped table-borderless'>
					<thead>
						<tr>
							<th>Table Name</th>
							<th>Success</th>
							<th>Failure</th>
						</tr>
						
					</thead>
					<tbody>
						<tr>
							<td> Customer discount group </td>
							<td onClick={() => successCustDiscGroup != 0 && linkDetailFn("1", "1")}>
   											 
        											{successCustDiscGroup == 0 ? '-' : <Link href={""}>{successCustDiscGroup}</Link>}
    									
											</td>


											<td onClick={() => failCustDiscGroup != 0 && linkDetailFn("1", "0")}>
   											 
        											{failCustDiscGroup == 0 ? '-' : <Link href={""}> {failCustDiscGroup}</Link>}
    										
											</td>
						</tr>
						<tr>
							<td colSpan={3}>
								<table className='subtable place_center'>
									<tbody>
										<tr>
											<td>Discount %</td>
											<td>Navision Code</td>
											
										</tr>
										{TableData.discGroupCodes?.length>0 && TableData.discGroupCodes?.map((it :any)=>(
														<tr>
															<td>{it.Discount}</td>
															<td>{it.Nav_Promotion_Code}</td>
														</tr>

                                                   ))}
				  
									</tbody>
								</table>
							</td>
							
						</tr>
						<tr>

								<td>Sales line discount</td>
								<td onClick={() => successSalesLine != 0 && linkDetailFn("2", "1")}>
   											 
        											{successSalesLine == 0 ? '-' :<Link href={""}>{successSalesLine}</Link>} 
    										
								</td>

								<td onClick={() => FailSalesLine != 0 && linkDetailFn("2", "0")}>
   											 
        											{FailSalesLine == 0 ? '-' : <Link href={""}>{FailSalesLine}</Link>}
    										
								</td>
						</tr>
						<tr>
								<td>Line disc sequence line</td>

								<td onClick={() => successLineDiscSeq != 0 && linkDetailFn("3", "1")}>
   											 
        											{successLineDiscSeq == 0 ? '-' :<Link href={""}> {successLineDiscSeq}</Link>}
    										
								</td>

								<td onClick={() => FailLineDiscSeq != 0 && linkDetailFn("3", "0")}>
   										{FailLineDiscSeq == 0 ? '-' :<Link href={""}>{FailLineDiscSeq}</Link>}
    										
								</td>

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

export default NavisionIntegrationTable


