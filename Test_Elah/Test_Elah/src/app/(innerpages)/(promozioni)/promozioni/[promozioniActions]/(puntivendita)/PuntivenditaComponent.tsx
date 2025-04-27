import React, { useState } from 'react'
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import PuntivenditaFilterComponent from './PuntivenditaFilterComponent'
import PuntivenditaTable from './PuntivenditaTable'
import AgenteSearch from '@/app/components/shared/AgenteSearch';

type Props = {}
type selectField = { label: string, value: string };
export type filterType = {

    //datas of pundivendita
    tcodicerep: string,
    tsocialerep: string,
    tSearchName: string,
    tcity: string,
    tpv: string,
    tagentname: string,
    ssupergruppo: selectField,
    sgruppo: selectField,
    ssottogruppo: selectField

}

export const initialValue = {
  //datas of pundivendita
  tcodicerep: '',
  tsocialerep: '',
  tSearchName: '',
  tcity: '',
  tpv: '',
  tagentname: '',
  ssupergruppo:  { label: '', value: '' },
  sgruppo:  { label: '', value: '' },
  ssottogruppo:  { label: '', value: '' }
}



const PuntivenditaComponents = (props: Props) => {
    
  const [filter, setFilter] = useState<filterType>(initialValue);
  const [showAgenteSearch, setshowAgenteSearch] = useState<boolean>(false);

  const onchangeHandler = (key: string, value: string) => {
      setFilter({ ...filter, [key]: value })
  }

  const resetHandler = () => {
      setFilter({ ...initialValue });
  }

  const searchHandler = () => {
  }

  const chooseAgentHandler = (value: any) => {
    setFilter({ ...filter, 'tagentname': value });
    setshowAgenteSearch(false);
}

  return (
    <div>
    {!showAgenteSearch ? (
      <div>
        <Card>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
              <Title heading="RICERCA" />
            </div>
          </div>
          <PuntivenditaFilterComponent filter={filter} onchangeHandler={onchangeHandler} resetHandler={resetHandler} searchHandler={searchHandler} setshowAgenteSearch={setshowAgenteSearch} />
        </Card>
        <Card>
          <div className="table_data">
            <div className="title_sec">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <Title heading="Lista" />
                </div>
              </div>
            </div>
            <PuntivenditaTable />
          </div>
        </Card>
      </div>
    ) : (
      <AgenteSearch chooseAgentHandler={chooseAgentHandler} setshowAgentSearch={setshowAgenteSearch} />
    )}
  </div>
  )
}

export default PuntivenditaComponents