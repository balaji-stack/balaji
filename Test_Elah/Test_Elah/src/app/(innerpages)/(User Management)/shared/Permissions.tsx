import SubPermission from "./SubPermission"
import {
    AssortimentiSub, MerchandisingSub, PromozioniSub, URLesternoSub,
    WebOrdiniIndependentiSub, handlePermissions, notificationSub, reportsSub, webordiniSub
} from "../helper/UserUtils"
// import Card from "@/app/components/shared/Card";
import Title from "@/app/components/shared/Title";
// import { Form } from "react-bootstrap";

type Props = {
    register: any;
    control: any;
    setValue: any;
}

const Permissions = (props: Props) => {
    return (
        // <Card bgColor="#ffffff" padding={30} borderRadius={15} marginBottom={30}>
        <>
            <div className="title_block mb-5">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <Title
                        heading="Autorizzazioni"
                        textColor="#3e3c4f"
                        fontSize={20}
                        fontWeight={600}
                        bottomSpace={15}
                    />
                </div>
            </div>
            <div className="check_items_block">
                <div className='row'>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='check_grp'>
                            {/* ---------------------------------------------  \/  | User Management |   \/    --------------------------------------------- */}
                            <div className="mb-4">
                                <input id="Gestione" className="form-check-input" type="checkbox" {...props.register('cusermgtperm')} />
                                <label htmlFor="Gestione" className="form-check-label " > Gestione utenti </label>
                                {/* <Form.Check // prettier-ignore
                                    {...props.register('cusermgtperm')}
                                    type="checkbox"
                                    className="form-group-check"
                                    id="Gestione"
                                    label="Gestione utenti"
                                /> */}
                            </div>
                            {/* --------------------------------------------  /\ | User Management |  /\    ---------------------------------------------- */}

                            {/* ---------------------------------------------  \/  | Documents Nav |   \/    --------------------------------------------- */}
                            <div className="mb-4">
                                <input id="Documenti" className="form-check-input" type="checkbox" {...props.register('cnavdocperm')} />
                                <label htmlFor="Documenti" className="form-check-label " > Documenti Nav </label>
                            </div>
                            {/* --------------------------------------------  /\ | Documents Nav |  /\    ---------------------------------------------- */}

                            {/* ---------------------------------------------  \/  | External URL |   \/    --------------------------------------------- */}
                            <div className="mb-4">
                                <input id="URLesterno" className="form-check-input " type="checkbox" {...props.register('URLesterno')}
                                    onChange={(e) => handlePermissions(e, props.setValue, true)} />
                                <label htmlFor="URLesterno" className="form-check-label "  > URL esterno </label>
                                {/* {URLesternoSub?.map((obj, i) => {
                                    return (<SubPermission key={i} child='URLesterno-child' id={obj.id} name={obj.name} register={props.register}
                                        setValue={props.setValue} control={props.control} label={obj.label} />)
                                })} */}
                                {URLesternoSub?.map((obj, i) => {
                                    return (
                                        <div key={i} className="mt-2 ps-4">
                                            <input id={obj.id} className={`form-check-input URLesterno-child`} type="checkbox"
                                                {...props.register(obj.name)}
                                                onChange={(e) => handlePermissions(e, props.setValue, true)} />
                                            <label htmlFor={obj.id} className="form-check-label " >{obj.label}</label>
                                        </div>
                                    )
                                })}

                            </div>
                            {/* --------------------------------------------  /\ | External URL |  /\    ---------------------------------------------- */}

                            {/* ---------------------------------------------  \/  | Assortment |   \/    --------------------------------------------- */}
                            <div className="mb-4">
                                <input id="Assortimenti" className="form-check-input " type="checkbox" {...props.register('sassortimentiportalperm')} onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="Assortimenti" className="form-check-label " > Assortimenti </label>
                                {AssortimentiSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='Assortimenti-child' id={obj.id} name='portalassortment' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}
                            </div>
                            {/* --------------------------------------------  /\ | Assortment |  /\    ---------------------------------------------- */}


                            {/* ---------------------------------------------  \/  | Promotions |   \/    --------------------------------------------- */}
                            <div className="mb-4">
                                <input id="promozioni" className="form-check-input " type="checkbox" {...props.register('spromozioiportalperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="promozioni" className="form-check-label "  > Promozioni </label>
                                {PromozioniSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='promozioni-child' id={obj.id} name='portalpromozioni' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}

                            </div>

                            <div className="mb-4">
                                <input id="WebOrdini" className="form-check-input " type="checkbox" {...props.register('swebordiniperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="WebOrdini" className="form-check-label "  > Web Ordini </label>
                                {webordiniSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='WebOrdini-child' id={obj.id} name='webordini' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}

                            </div>
                            {/* --------------------------------------------  /\ | Web Orders |  /\    ---------------------------------------------- */}


                        </div>
                    </div>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='check_grp'>
                            {/* --------------------------------------------  \/ | Web Independent Orders  |  \/   ---------------------------------------------- */}
                            <div className="mb-4">
                                <input id="WebOrdiniIndependenti" className="form-check-input " type="checkbox" {...props.register('swebordiniindependentiperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="WebOrdiniIndependenti" className="form-check-label "  > Web Ordini Independenti </label>
                                {WebOrdiniIndependentiSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='WebOrdiniIndependenti-child' id={obj.id} name='webordiniindependenti' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}
                            </div>
                            {/* --------------------------------------------  /\  | Web Independent Orders  |  /\    ---------------------------------------------- */}

                            {/* --------------------------------------------   \/  |   Merchandising   |   \/     ---------------------------------------------- */}
                            <div className="mb-4">
                                <input id="Merchandising" className="form-check-input " type="checkbox" {...props.register('smerchandisingperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="Merchandising" className="form-check-label "  > Merchandising </label>
                                {MerchandisingSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='Merchandising-child' id={obj.id} name='merchant' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}
                            </div>
                            <div className="mb-4">
                                <input id="reports" className="form-check-input" type="checkbox" {...props.register('creportsperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="reports" className="form-check-label "  > Reports </label>
                                {reportsSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='reports-child' id={obj.id} name='csubreportperm' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}
                            </div>
                            <div className="mb-4">
                                <input id="notifications" className="form-check-input " type="checkbox" {...props.register('snotifyperm')}
                                    onChange={(e) => handlePermissions(e, props.setValue)} />
                                <label htmlFor="notifications" className="form-check-label "  > Notifications </label>
                                {notificationSub?.map((obj, i) => {
                                    return (<SubPermission key={i} index={i} child='notifications-child' id={obj.id} name='notifications' register={props.register}
                                        value={obj.value} setValue={props.setValue} control={props.control} label={obj.label} />)
                                })}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        {/* </Card> */}
        </>
    )
}

export default Permissions