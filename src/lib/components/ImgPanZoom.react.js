import React, { Component } from 'react';
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
        let the_id = this.props.id;
        let canvas = this.refs[the_id];
        let ctx = canvas.getContext('2d');
        this.trackTransforms(ctx);
        gkhead.onload = () => {
            this.redraw(ctx, canvas, gkhead);
        }

        let lastX = canvas.width / 2, lastY = canvas.height / 2;

        let dragStart, dragged;

        const onMouseDown = evt => {
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
            dragStart = ctx.transformedPoint(lastX, lastY);
            dragged = false;
        }

        const onMouseMove = evt => {
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
            dragged = true;
            if (dragStart) {
                var pt = ctx.transformedPoint(lastX, lastY);
                ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                this.redraw(ctx, canvas, gkhead);
            }
        }

        const onMouseUp = evt => {
            dragStart = null;
            if (!dragged) zoom(evt.shiftKey ? -1 : 1);
        }

        const SCALE_FACTOR = 1.1;

        const zoom = (clicks) => {
            const pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x, pt.y);
            const factor = SCALE_FACTOR ** clicks;
            ctx.scale(factor, factor);
            ctx.translate(-pt.x, -pt.y);
            this.redraw(ctx, canvas, gkhead);
        }

        const handleScroll = (evt) => {
            const delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
            if (delta) zoom(delta);
            return evt.preventDefault() && false;
        }

        canvas.addEventListener('mousedown', onMouseDown, false);

        canvas.addEventListener('mousemove', onMouseMove, false);

        canvas.addEventListener('mouseup', onMouseUp, false);

        canvas.addEventListener('DOMMouseScroll', handleScroll, false);

        canvas.addEventListener('mousewheel', handleScroll, false);

    }

    render() {
        const { id, height, width, src, setProps } = this.props;

        return (
            <canvas ref={id} width={String(width)} height={String(height)} />
        );

    }

    trackTransforms(ctx) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var xform = svg.createSVGMatrix();
        ctx.getTransform = function () { return xform; };

        var savedTransforms = [];
        var save = ctx.save;
        ctx.save = function () {
            savedTransforms.push(xform.translate(0, 0));
            return save.call(ctx);
        };

        var restore = ctx.restore;
        ctx.restore = function () {
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };

        var scale = ctx.scale;
        ctx.scale = function (sx, sy) {
            xform = xform.scaleNonUniform(sx, sy);
            return scale.call(ctx, sx, sy);
        };

        var rotate = ctx.rotate;
        ctx.rotate = function (radians) {
            xform = xform.rotate(radians * 180 / Math.PI);
            return rotate.call(ctx, radians);
        };

        var translate = ctx.translate;
        ctx.translate = function (dx, dy) {
            xform = xform.translate(dx, dy);
            return translate.call(ctx, dx, dy);
        };

        var transform = ctx.transform;
        ctx.transform = function (a, b, c, d, e, f) {
            var m2 = svg.createSVGMatrix();
            m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
            xform = xform.multiply(m2);
            return transform.call(ctx, a, b, c, d, e, f);
        };

        var setTransform = ctx.setTransform;
        ctx.setTransform = function (a, b, c, d, e, f) {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx, a, b, c, d, e, f);
        };

        var pt = svg.createSVGPoint();
        ctx.transformedPoint = function (x, y) {
            pt.x = x; pt.y = y;
            return pt.matrixTransform(xform.inverse());
        }
    }

    redraw(ctx, canvas, gkhead) {

        // Clear the entire canvas
        const p1 = ctx.transformedPoint(0, 0);
        const p2 = ctx.transformedPoint(canvas.width, canvas.height);
        ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        ctx.drawImage(gkhead, 50, 50);

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
