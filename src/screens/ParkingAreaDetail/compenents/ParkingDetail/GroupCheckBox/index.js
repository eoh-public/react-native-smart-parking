import React, { memo, useCallback, useEffect, useState } from 'react';

import CheckBox from './CheckBox';

const GroupCheckBox = memo(
  ({ data, disabled, onSelect, multiple, defaultIndex = 0 }) => {
    const [selectIndexes, setSelectIndexes] = useState([]);
    const _onSelect = useCallback(
      (index) => {
        let newValue;
        if (multiple) {
          const foundIndex = selectIndexes.indexOf(index);
          if (foundIndex === -1) {
            newValue = [...selectIndexes, index];
          } else {
            selectIndexes.splice(foundIndex, 1);
            newValue = [...selectIndexes];
          }
          onSelect && onSelect(newValue.map((i) => data[i]));
        } else {
          newValue = [index];
          onSelect && onSelect(data[index]);
        }

        setSelectIndexes(newValue);
      },
      [onSelect, data, multiple, selectIndexes]
    );

    useEffect(() => {
      if (defaultIndex) {
        setSelectIndexes([defaultIndex - 1]);
      }
    }, [data, defaultIndex]);

    return (
      <React.Fragment>
        {data.map((item, index) => {
          const select = selectIndexes.indexOf(index) !== -1;
          return (
            <CheckBox
              key={index.toString()}
              title={item.title || item.name}
              index={index}
              onSelect={_onSelect}
              select={select}
              disabled={disabled}
              source={item.source || item.icon}
              description={item.description}
              noLine={item.noLine}
            />
          );
        })}
      </React.Fragment>
    );
  }
);

export default GroupCheckBox;
