import React from 'react'
import Title from '@/app/components/shared/Title';
import Card from '@/app/components/shared/Card';
import CodProdottoTable from "./CodProdottoTable"




type Props = {}

const Page = (props: Props) => {
    return (
        <main>
            <Card>
              {/*   <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading="Cod.prodotto del cliente"></Title>
                    </div>
                </div> */}
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="Cod.prodotto del cliente"></Title>
                            </div>
                        </div>
                    </div>
                    <CodProdottoTable />
                </div>
            </Card>
        </main>
    )
}

export default Page