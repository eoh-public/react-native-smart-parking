import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Svg, { G, Text, Path } from 'react-native-svg';
import t from 'i18n';

import { Colors } from '../../../../../configs';
import TextCustom from '../../../../../commons/Text';
import { scaleValue, drawArc, polarToCartesian } from './helper';

const SegmentedRoundDisplay = ({
  filledArcWidth,
  emptyArcWidth,
  arcSpacing,
  totalArcSize,
  emptyArcColor,
  filledArcColor,
  radius,
  style,
  totalValue,
  value,
  title,
  pos, //array position
  boxTitle,
  textHeader,
  initIndex,
  valueText,
}) => {
  const [arcs, setArcs] = useState([]);

  const totalArcs = 10;

  const totalSpaces = totalArcs - 1;
  const totalSpacing = totalSpaces * arcSpacing;

  const arcSize = (totalArcSize - totalSpacing) / totalArcs;
  const arcsStart = 90 - totalArcSize / 2;

  const margin = 20;
  const svgWidth = (radius + filledArcWidth) * 2 + 2 * margin;
  const svgHeight = (radius + filledArcWidth) * 2 + 2 * margin;

  const createArcs = useCallback(() => {
    let newArcs = [];
    for (let i = 0; i < totalArcs; i++) {
      let newArc = {
        centerX: radius + filledArcWidth + margin,
        centerY: radius + filledArcWidth + margin,
        start: arcsStart + i * arcSize,
        end: arcsStart + arcSize + i * arcSize,
      };

      if (i !== 0) {
        newArc.start += arcSpacing * i;
        newArc.end += arcSpacing * i;
      }
      newArc.filled = scaleValue(
        0,
        [0, totalValue / 10],
        [newArc.start, newArc.end]
      );
      newArcs.push(newArc);
    }
    setArcs(newArcs);
  }, [radius, filledArcWidth, arcsStart, arcSize, totalValue, arcSpacing]);

  useEffect(() => {
    createArcs();
  }, [createArcs]);

  if (arcs.length === 0) {
    return <></>;
  }
  const posText0 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius + 10,
    arcs[0].filled - 25
  );
  const posText100 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius - 15,
    arcs[2].filled
  );
  const posText200 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius + 10,
    arcs[5].filled - 5
  );
  const posText300 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius + 60,
    arcs[6].filled + 20.5
  );
  const posText400 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius + 85,
    arcs[8].filled + 4
  );
  const posText500 = polarToCartesian(
    arcs[0].centerX,
    arcs[0].centerY,
    radius + 70,
    arcs[9].filled + 15
  );
  const posTexts = [
    posText0,
    posText100,
    posText200,
    posText300,
    posText400,
    posText500,
  ];
  return (
    <View>
      <Svg width={svgWidth + 100} height={svgHeight} style={style}>
        {arcs.map((arc, index) => {
          return (
            <G key={index.toString()}>
              <Path
                x={50}
                y={0}
                fill="none"
                stroke={emptyArcColor}
                strokeWidth={emptyArcWidth}
                d={drawArc(
                  arc.centerX,
                  arc.centerY,
                  radius,
                  arc.start,
                  arc.end
                )}
              />
              {posTexts.map((item, i) => (
                <Text
                  x={item.x}
                  fontWeight="normal"
                  fontSize={14}
                  y={item.y}
                  fill={'#595959'}
                  key={i}
                  textAnchor="middle"
                >
                  {pos[i]}
                </Text>
              ))}
            </G>
          );
        })}
        <Text
          x={svgWidth / 2 + 50}
          fontWeight="normal"
          fontSize={12}
          y={svgHeight / 2 - 30}
          fill={'#595959'}
          textAnchor="middle"
        >
          {textHeader}
        </Text>
        <Text
          x={svgWidth / 2 + 50}
          fontWeight="normal"
          fontSize={56}
          y={svgHeight / 2 + 30}
          fill={filledArcColor}
          textAnchor="middle"
        >
          {`${valueText}` || `${value}`}
        </Text>
        {value > 0 && (
          <Path
            x={50}
            y={0}
            fill="none"
            stroke={filledArcColor}
            strokeWidth={20}
            d={drawArc(
              arcs[initIndex].centerX,
              arcs[initIndex].centerY,
              radius,
              arcs[initIndex].start,
              arcs[initIndex].start +
                parseInt((value / totalValue) * 280, 10) -
                1
            )}
          />
        )}
        {!boxTitle && title ? (
          <Text
            x={svgWidth / 2 + 50}
            fontWeight="bold"
            fontSize={20}
            y={svgHeight}
            fill={Colors.Gray9}
            textAnchor="middle"
          >
            {title}
          </Text>
        ) : null}
      </Svg>
      {boxTitle && title ? (
        <View
          style={{
            backgroundColor: filledArcColor,
            ...styles.boxTitle,
          }}
        >
          <TextCustom size={14} color={Colors.White}>
            {title}
          </TextCustom>
        </View>
      ) : null}
    </View>
  );
};

SegmentedRoundDisplay.propTypes = {
  filledArcWidth: PropTypes.number,
  emptyArcWidth: PropTypes.number,
  arcSpacing: PropTypes.number,
  totalArcSize: PropTypes.number,
  radius: PropTypes.number,
  emptyArcColor: PropTypes.string,
  filledArcColor: PropTypes.string,
  formatAmount: PropTypes.func,
  style: PropTypes.object,
  animationDuration: PropTypes.number,
  formatValue: PropTypes.func,
  incompleteArcColor: PropTypes.string,
  displayValue: PropTypes.bool,
  valueBoxColor: PropTypes.string,
  valueFontColor: PropTypes.string,
  pos: PropTypes.array,
  boxTitle: PropTypes.bool,
  textHeader: PropTypes.string,
  initIndex: PropTypes.number,
};

SegmentedRoundDisplay.defaultProps = {
  filledArcWidth: 0,
  emptyArcWidth: 20,
  arcSpacing: 1,
  totalArcSize: 280,
  emptyArcColor: Colors.Gray3,
  filledArcColor: '#5ECCAA',
  animationDuration: 1000,
  incompleteArcColor: '#23318C',
  displayValue: false,
  valueBoxColor: '#23318C',
  valueFontColor: '#FFFFFF',
  radius: 90,
  pos: [0, 100, 200, 300, 400, 500],
  boxTitle: false,
  textHeader: t('text_air_quality_index'),
  initIndex: 0,
};

export default SegmentedRoundDisplay;

const styles = StyleSheet.create({
  boxTitle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    paddingVertical: 2,
    borderRadius: 100,
  },
});
