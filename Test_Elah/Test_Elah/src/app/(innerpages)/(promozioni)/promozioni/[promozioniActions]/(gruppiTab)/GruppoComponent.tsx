import React from 'react'
import GruppoFilterComponent from './GruppoFilterComponent'
import GruppoVisualizzaTable from './GruppoVisualizzaTable'
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'

type Props = {}

const GruppoComponent = (props: Props) => {
    return (
        <div>
            <Card>
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading="RICERCA"></Title>
                    </div>
                </div>
                <GruppoFilterComponent />
            </Card>
            <Card>
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="LISTA"></Title>
                            </div>

                        </div>
                    </div>
                   <GruppoVisualizzaTable/>
                </div>
            </Card>
        </div>
    )
}

export default GruppoComponent