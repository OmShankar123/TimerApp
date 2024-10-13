import React from 'react';
import { FlatList, View } from 'react-native';
import Timer from './Timer';

const TimerList = ({ timers, labels, onRemove }) => {
    return (
      <FlatList
        data={timers}
        renderItem={({ item, index }) => (
          item !== null ? (
            <Timer 
              duration={item} 
              onRemove={() => onRemove(index)} 
              label={labels[index]} // Pass the label here
            />
          ) : null
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  

export default TimerList;
