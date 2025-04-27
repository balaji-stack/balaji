
import React from 'react'
import Image from "next/image";
import ArrowDown from "@/img/arrow-down.png";


type Props = {

    TableLista: any;
    TableHeadings :any;
    TableIdprops :any;
    ResultTypeprops : any;

}

const ListaTable = (props: Props) => {
    const TableLista         =  props.TableLista;
    const TableHeadings      =  props.TableHeadings;
    const TableId            =  props.TableIdprops;
    const ResultType         =  props.ResultTypeprops;

    return (
        
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                <tr>
                                        {TableHeadings?.map((colName: string,i: number) => {
                                            
                                            return (
                                                <th key={i}>
                                                    <div className="thead_div">
                                                        <label>{colName}</label>
                                                     
                                                            <span className="sort_sp">
                                                                <i className="ascending"><Image src={ArrowDown} alt="ascending" /></i>
                                                                <i className="descending"><Image src={ArrowDown} alt="descending" /></i>
                                                            </span>
                                  
                                                    </div>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>

                                {TableLista.length > 0 &&
                                        TableLista?.map((it: any,i: number) => (
                                            <tr key={i}>

                                     <td style={{display: TableId  == 1 ||  TableId == 2 ?"":"none"}}>{it.Code}</td>
                                               <td style={{display: TableId  == 2?"":"none"}}>{it.sales_code}</td>
                                               <td style={{display: TableId  == 3?"":"none"}}>{it.Line_Disc_Sequence_Codice}</td>
                                               <td style={{display: TableId  == 3?"":"none"}}>{it.Customer_Disc_Group_Codice}</td>
                                               <td style={{display: ResultType!= 1?"":"none"}}>{it.Error_Description}</td>          

                                               
                                            </tr>
                                        ))
                                    }

                                                         
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ListaTable