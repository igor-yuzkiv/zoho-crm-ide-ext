import JSZip from 'jszip'

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function createZipAndDownload(items: Array<{ name: string; content: string }>) {
    const zip = new JSZip()

    items.forEach((item) => {
        zip.file(item.name, item.content)
    })

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'functions.zip'
    a.click()
}
