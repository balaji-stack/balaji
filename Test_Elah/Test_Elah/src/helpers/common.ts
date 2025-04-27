
const SERVER_URL = `${process.env.SERVER_URL}`;
const saveUserInfo = (data: any) => {
    let logininfo = data;
    let permissions = data.permission.permission;
    let portalPermissions = Object.keys(permissions).filter(key => permissions[key] == 1);
    let assortimentiPermissionsObj = data.permission.portalAssortimentiPermission.assortimentiPermission;
    let assortimentiPermissions = Object.keys(assortimentiPermissionsObj).filter(key => assortimentiPermissionsObj[key]);
    let promozioniPermissionsObj = data.permission.portalPromozioniPermission.promozioniPermission;
    let promozioniPermissions = Object.keys(promozioniPermissionsObj).filter(key => promozioniPermissionsObj[key]);
    let ordiniPermissionsObj = data.permission.portalOrdiniPermission.ordiniPermission;
    let ordiniPermissions = Object.keys(ordiniPermissionsObj).filter(key => ordiniPermissionsObj[key]);
    let ordiniIndependentiPermissionsObj = data.permission.portalOrdiniIndependentiPermission.ordiniIndependentiPermission;
    let ordiniIndependentiPermissions = Object.keys(ordiniIndependentiPermissionsObj).filter(key => ordiniIndependentiPermissionsObj[key]);
    let merchandisingPermissionsObj = data.permission.portalmerchandisingPermission.merchandisingPermission;
    let merchandisingPermissions = Object.keys(merchandisingPermissionsObj).filter(key => merchandisingPermissionsObj[key]);
    let reportPermissionsObj = data.permission.subreportPermission.reportPermission;
    let reportPermissions = Object.keys(reportPermissionsObj).filter(key => reportPermissionsObj[key]);
    let UrlEsternoPermissions: string[] = [];
    let menuObj = {};
    portalPermissions.forEach((each: string) => {
        switch (each) {
            case 'permission_user_management':
                menuObj = { ...menuObj, [each]: [] };
                break;
            case 'permission_nav_documents':
                menuObj = { ...menuObj, [each]: [] };
                break;
            case 'permission_assortimenti':
            case 'permission_promozioni':
            case 'permission_order_entry':
                UrlEsternoPermissions = [...UrlEsternoPermissions, each]
                menuObj = { ...menuObj, 'UrlEsterno': UrlEsternoPermissions };
                break;
            case 'permission_portal_assortimenti':
                menuObj = { ...menuObj, [each]: assortimentiPermissions };
                break;
            case 'permission_portal_promozioni':
                menuObj = { ...menuObj, [each]: promozioniPermissions };
                break;
            case 'permission_portal_ordini':
                menuObj = { ...menuObj, [each]: ordiniPermissions };
                break;
            case 'permission_portal_ordini_independenti':
                menuObj = { ...menuObj, [each]: ordiniIndependentiPermissions };
                break;
            case 'permission_portal_merchandising':
                menuObj = { ...menuObj, [each]: merchandisingPermissions };
                break;
            case 'permission_report':
                menuObj = { ...menuObj, [each]: reportPermissions };
                break;
            case 'permission_notification':
                menuObj = { ...menuObj, [each]: ['notifications-NAV_LOCK_MAIL'] };
                break;
        }
    });

    return {logininfo,menuObj}
}



//to return three months before date from current date 
const dateBeforeThreeMonth = new Date().setMonth(new Date().getMonth() - 3);



const getOrderBy = (e: any,colName: string, tableFields: string[], fieldNames: string[], list: any, setList: any, orderBy: number) => {
    const collator = new Intl.Collator('en', { sensitivity: 'base' });
    let sortedList: any = []
    let columnIndex = tableFields.indexOf(colName);
    let desc = (columnIndex + 1) * 2;
    let asc = desc - 1;
    let ifAsc = orderBy == asc ? desc : asc;
    orderBy = (orderBy == 0 || orderBy == desc) ? asc : ifAsc;
    sortedList = orderBy == asc ?
        list.toSorted((a: any, b: any) => collator.compare(a[fieldNames[columnIndex]], b[fieldNames[columnIndex]]))
        : list.toSorted((a: any, b: any) => collator.compare(b[fieldNames[columnIndex]], a[fieldNames[columnIndex]]));
    setList(sortedList);
    //classList manipulation
    const EL = e.target;//getting current element
        const thEl = EL.closest('th');
        const activeEl = thEl.closest('tr').querySelector('.sort_active');
        activeEl?.classList.remove("sort_active");
        if (orderBy % 2 != 0) {
            const ascEL = thEl.querySelector(".ascending");
            ascEL.classList.add("sort_active");
        } else {
            const descEL = thEl.querySelector(".descending");
            descEL.classList.add("sort_active");
        }
    return orderBy;
}


export type selectFieldType = {
    label: string,
    value: string
};

export {
    saveUserInfo,
    dateBeforeThreeMonth,
    getOrderBy
};
export default SERVER_URL