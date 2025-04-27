"use client"

import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl';
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {

    onchangeHandler: any;
    closeEsportaReportHandler: any;
}

const page = (props: Props) => {

    const onchangeHandler = props.onchangeHandler;
    const closeEsportaReportHandler = props.closeEsportaReportHandler;
   

    const AreaOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const AgenteOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const SuperOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const GruppoOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const SottoOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];




    const esporta = [{ id: 1, 'fieldType': 'input', 'label': 'Anno', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler },
    { id: 2, 'fieldType': 'select', 'label': 'Area', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: AreaOptions },
    { id: 3, 'fieldType': 'select', 'label': 'Agente', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: AgenteOptions },
    { id: 4, 'fieldType': 'select', 'label': 'Super Gruppo', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: SuperOptions },
    { id: 5, 'fieldType': 'select', 'label': 'Gruppo', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: GruppoOptions },
    { id: 6, 'fieldType': 'select', 'label': 'Sotto Gruppo', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: SottoOptions }];

  return (
    <main>
            <Card>
                <div className="row">
                <div className="title_block-arrow">
                        <button type="button" onClick={closeEsportaReportHandler}><Image src={closeImg} alt="Image" /></button>
                    </div>
                  
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="Esporta report budget"></Title>
                    </div>

                </div>
                <div className="row">

                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            {esporta?.map((it) => {
                                return (
                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                        label={it.label} value={it.value}
                                        colArr={it.colArr} field={''} onchangeHandler={it.onchangeHandler} options={it.options} />
                                )
                            })}
                        </div>
                    </div>

                </div>
            </Card>
        </main>
  )
}

export default page