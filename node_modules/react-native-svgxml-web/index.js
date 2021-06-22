import * as React from 'react';
import * as ReactNativeWeb from 'react-native-web';
import PropTypes from 'prop-types';

const createReactElement = ReactNativeWeb.unstable_createElement || React.createElement;

function createElement(name, type) {
  class CreateElement extends React.Component {
    render() {
      return createReactElement(type, this.props, this.props.children);
    }
  }

  CreateElement.displayName = name;

  CreateElement.propTypes = {
    children: PropTypes.node
  };

  CreateElement.defaultProps = {
    children: undefined
  };

  return CreateElement;
}

export const Svg = createElement('Svg', 'svg');

export default Svg;
Svg.Svg = Svg; // stay consistent with the old require based api

export const Circle = createElement('Circle', 'circle');
Svg.Circle = Circle;

export const ClipPath = createElement('ClipPath', 'clipPath');
Svg.ClipPath = ClipPath;

export const Defs = createElement('Defs', 'defs');
Svg.Defs = Defs;

export const Ellipse = createElement('Ellipse', 'ellipse');
Svg.Ellipse = Ellipse;

export const ForeignObject = createElement('ForeignObject', 'foreignObject');
Svg.ForeignObject = ForeignObject;

export const G = createElement('G', 'g');
Svg.G = G;

export const Image = createElement('Image', 'image');
Svg.Image = Image;

export const Line = createElement('Line', 'line');
Svg.Line = Line;

export const LinearGradient = createElement('LinearGradient', 'linearGradient');
Svg.LinearGradient = LinearGradient;

export const Marker = createElement('Marker', 'marker');
Svg.Marker = Marker;

export const Mask = createElement('Mask', 'mask');
Svg.Mask = Mask;

export const Path = createElement('Path', 'path');
Svg.Path = Path;

export const Pattern = createElement('Pattern', 'pattern');
Svg.Pattern = Pattern;

export const Polygon = createElement('Polygon', 'polygon');
Svg.Polygon = Polygon;

export const Polyline = createElement('Polyline', 'polyline');
Svg.Polyline = Polyline;

export const RadialGradient = createElement('RadialGradient', 'radialGradient');
Svg.RadialGradient = RadialGradient;

export const Rect = createElement('Rect', 'rect');
Svg.Rect = Rect;

export const Stop = createElement('Stop', 'stop');
Svg.Stop = Stop;

export const Symbol = createElement('Symbol', 'symbol');
Svg.Symbol = Symbol;

export const Text = createElement('Text', 'text');
Svg.Text = Text;

export const TextPath = createElement('TextPath', 'textPath');
Svg.TextPath = TextPath;

export const TSpan = createElement('TSpan', 'tspan');
Svg.TSpan = TSpan;

export const Use = createElement('Use', 'use');
Svg.Use = Use;

function SvgXmlRecursivelySetFill(node, fill) {
  if (!node) return;
  node.setAttribute('fill', fill);
  node.children.forEach(nodeChild => SvgXmlRecursivelySetFill(nodeChild, fill))
}

export class SvgXml extends React.Component {
  divRef = React.createRef()
  componentDidMount() {
    this.setSvgProps()
  }
  componentDidUpdate() {
    this.setSvgProps()
  }
  setSvgProps() {
    if (!this.divRef.current?.firstElementChild) return;
    const svg = this.divRef.current.firstElementChild;
    svg.setAttribute('height', this.props.height);
    svg.setAttribute('width', this.props.width)

    if (!!this.props.fill) {
      SvgXmlRecursivelySetFill(svg, this.props.fill)
    }
  }
  render() {
    const { xml, fill, size, ...props } = this.props;
    const divProps = {
      dangerouslySetInnerHTML: {
        __html: xml
      },
      style: {
        height: this.props.height ? this.props.height + 'px' : undefined,
        width: this.props.width ? this.props.width + 'px' : undefined
      }
    };
    return (
      <ReactNativeWeb.View {...props}>
        <div ref={this.divRef} {...divProps} />
      </ReactNativeWeb.View>
    )
  }
}

SvgXml.propTypes = {
  children: PropTypes.node
};
SvgXml.defaultProps = {
  children: undefined
};
Svg.SvgXml = SvgXml;