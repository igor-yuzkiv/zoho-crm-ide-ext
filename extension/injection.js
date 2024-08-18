;(() => {
    setTimeout(() => {
        console.log('--> Zoho CRM IDE Extension is running...')
        localStorage.setItem('ext_zoho_crm_ide:orgId', window.crmZgid)
    }, 1000)
})()
