import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React from 'react'
import BudgetValoriTable from './BudgetValoriTable'
import ListaTable from './ListaTable';
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {

  closeBudgetValoriHandler : any;

}

const page = (props: Props) => {

 const closeBudgetValoriHandler = props.closeBudgetValoriHandler;

  return (
    <>

      <Card>
        <div className="row">
          <div className="title_block-arrow">
            <button type="button" onClick={closeBudgetValoriHandler}><Image src={closeImg} alt="Image" /></button>
          </div>

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
            <Title heading="BUDGET VALORI UTILIZZATI"></Title>
            <BudgetValoriTable />
          </div>
        </div>

      </Card>

      <Card>
        <div className="table_data">
          <div className="title_sec">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="Lista righe ordine"></Title>
              </div>
            </div>
          </div>


          <ListaTable />

        </div>
     
      </Card>





    </>
  )
}

export default page