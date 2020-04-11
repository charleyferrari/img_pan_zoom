# AUTO GENERATED FILE - DO NOT EDIT

imgPanZoom <- function(id=NULL, height=NULL, width=NULL, src=NULL) {
    
    props <- list(id=id, height=height, width=width, src=src)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ImgPanZoom',
        namespace = 'img_pan_zoom',
        propNames = c('id', 'height', 'width', 'src'),
        package = 'imgPanZoom'
        )

    structure(component, class = c('dash_component', 'list'))
}
