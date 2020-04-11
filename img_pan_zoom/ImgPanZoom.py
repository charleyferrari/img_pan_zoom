# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ImgPanZoom(Component):
    """An ImgPanZoom component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- height (number; optional): The height is used to define the height of the canvas
- width (number; optional): The width is used to define the width of the canvas
- src (string; optional): The src is the image url to be pasted in the canvas"""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, height=Component.UNDEFINED, width=Component.UNDEFINED, src=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'height', 'width', 'src']
        self._type = 'ImgPanZoom'
        self._namespace = 'img_pan_zoom'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'height', 'width', 'src']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(ImgPanZoom, self).__init__(**args)
