import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */


export default class ImgPanZoom extends Component {
    componentDidMount() {
        let gkhead = new Image;
        gkhead.src = this.props.src;
        let canvas = this.refs.test;
        let ctx = canvas.getContext('2d');
        gkhead.onload = () => {
            ctx.drawImage(gkhead,50,50);
        }

        

        // console.log(ctx);

        // console.log(canvas);
        // const context = this.getContext('2d');
      
        // const image = new Image();
        // image.src = "whereever-you-image-url-live.jpg";
        // image.onload = () => {
        //   context.drawImage(image, 0, 0, this.canvasA.width, this.canvasA.height);
        // };
      }

    render() {
        const {id, height, width, src, setProps} = this.props;

        return (
            <canvas ref={id} width={String(width)} height={String(height)} />
        );

    }
}

ImgPanZoom.defaultProps = {};

ImgPanZoom.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The height is used to define the height of the canvas
     */
    height: PropTypes.number,

    /**
     * The width is used to define the width of the canvas
     */
    width: PropTypes.number,

    /**
     * The src is the image url to be pasted in the canvas
     */
    src: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
