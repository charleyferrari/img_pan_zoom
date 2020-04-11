import img_pan_zoom
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.layout = html.Div([
    img_pan_zoom.ImgPanZoom(
        id='test',
        height=600,
        width=800,
        src='http://phrogz.net/tmp/gkhead.jpg'
    ),
    html.Div(id='output')
])


if __name__ == '__main__':
    app.run_server(debug=True)
