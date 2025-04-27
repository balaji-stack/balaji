import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React from 'react'
import Referenze_addFilterComponent from './Referenze_addFilterComponent'
import Referenze_addTable from './Referenze_addTable'
type Props = {}

const Referenze_addComponent = (props: Props) => {
  return (
    <div>
    <Card>
        <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                <Title heading="RICERCA"></Title>
            </div>
        </div>
        <Referenze_addFilterComponent />
    </Card>
    <Card>
        <div className="table_data">
            <div className="title_sec">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <Title heading="Lista"></Title>
                    </div>

                </div>
            </div>
           <Referenze_addTable/>
        </div>
    </Card>
</div>
  )
}

export default Referenze_addComponent