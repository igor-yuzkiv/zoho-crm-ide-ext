;(() => {
    setTimeout(() => {
        console.log('__ext_crmoz_zoho_ide', Object.keys(window.org))

        localStorage.setItem('__ext_crmoz_zoho_ide:crm_organization_id', window.crmZgid)
    }, 1000)
})()
