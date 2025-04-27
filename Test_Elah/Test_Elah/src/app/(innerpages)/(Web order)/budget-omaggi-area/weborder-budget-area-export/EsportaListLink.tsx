"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl';
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {
    onchangeHandler: any;
    closeEsportaHandler: any;
}

const page = (props: Props) => {
    const onchangeHandler = props.onchangeHandler;
    const closeEsportaHandler = props.closeEsportaHandler;
    const AreaOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const QuadrimestreOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
    const AnnoOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];



    const esporta = [{ id: 1, 'fieldType': 'select', 'label': 'Area', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: AreaOptions },
    { id: 2, 'fieldType': 'select', 'label': 'Quadrimestre', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: QuadrimestreOptions },
    { id: 2, 'fieldType': 'select', 'label': 'Anno', 'value': '', 'field': '', 'colArr': [4, 4, 4, 12, 12, 12], onchangeHandler: onchangeHandler, options: AnnoOptions }];



    return (
        <main>
               <Card>
            <div className="row">
                <div className="title_block-arrow">
                    <button type="button" onClick={closeEsportaHandler}><Image src={closeImg} alt="Image" /></button>
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