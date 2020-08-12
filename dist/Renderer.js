class Renderer {
    render = (data, str) => {
        const source = $(`#${str}Template`).html()
        const template = Handlebars.compile(source)
        let dataHTML = template({ data })
        $(`.${str}`).empty().append(dataHTML)
    }
}
