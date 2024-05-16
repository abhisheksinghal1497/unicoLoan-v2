import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DimensionUtil from '../../../../utils/DimensionUtils'
import styles from "./style";

function _isEmpty(value) {
  // Check if the value is null or undefined
  if (value == null) {
    return true;
  }
  
  // Check if the value is an array or a string and has a length of 0
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  // Check if the value is an object and has no own enumerable string keyed properties
  if (typeof value === 'object') {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  // For all other cases, return false
  return false;
}

const EventIcon = ({ icon: OriginalIcon = {}, iconStyle, lineStyle, isLastRow }) => {
  // Determines whether we are trying to render a custom icon component, or use the default
  const iconIsComponent = typeof OriginalIcon === "function";
  let iconToBeRendered = iconIsComponent ? (
    <OriginalIcon styles={styles.icon} />
  ) : (
    <Icon
      name={OriginalIcon.content}
      style={[
        styles.icon,
        OriginalIcon.style && !_isEmpty(OriginalIcon.style)
          ? OriginalIcon.style
          : null
      ]}
      size={DimensionUtil.fontPixel(OriginalIcon.size)}
    />
  );

  return (
    <View style={[styles.iconContainer, iconStyle]}>
      {iconToBeRendered}
     {!isLastRow && <View style={[styles.verticalLine, lineStyle]} />}
    </View>
  );
};


const Event = ({ children, style }) => {
  return <View style={[styles.eventContainer, style]}>{children}</View>;
};

const Row = ({
  event = {},
  eventStyle,
  iconContainerStyle,
  lineStyle,
  contentContainerStyle,
  isLastRow
}) => {
  const {
    title: OriginalTitle = {},
    description: OriginalDescription = {},
    icon,
    pressAction
  } = event;

  // Determines whether or not the Row is clickable, and acts accordingly
  const RowComp = pressAction ? TouchableOpacity : View;


  return (
    <RowComp style={[styles.row, eventStyle]} onPress={pressAction}>
      <EventIcon
        icon={icon}
        iconStyle={iconContainerStyle}
        lineStyle={lineStyle}
        isLastRow={isLastRow}
      />
      <Event style={contentContainerStyle}>
      <Text style={[styles.title, OriginalTitle.style]}>
       <Text style={{fontWeight:'bold', color:'#000'}}>{OriginalTitle.status}</Text> <Text>{OriginalTitle.content}</Text>
      </Text>
      <Text style={[styles.description, OriginalDescription.style]}>
        {OriginalDescription.content}
      </Text>
      </Event>
    </RowComp>
  );
};

const Timeline = ({
  data = [], // The actual event's array, array of objects, each object represents a single event
  eventStyle = {}, // Each event's whole row's style
  timeContainerStyle = {}, // The style object of the container that holds the time
  iconContainerStyle = {}, // The style object of the container that holds the icon
  lineStyle = {}, // The vertical line's style object
  contentContainerStyle = {}, // The style object of the container that holds the content i.e. title and description
  onEndReachedThreshold,
  onEndReached,
  TimelineFooter,
  TimelineHeader,
  ...rest
}) => {
  const events = (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item,index }) => (
        <Row
          event={item}
          eventStyle={eventStyle}
          timeContainerStyle={timeContainerStyle}
          iconContainerStyle={iconContainerStyle}
          lineStyle={lineStyle}
          contentContainerStyle={contentContainerStyle}
          isLastRow={index === data.length-1}
        />
      )}
      keyExtractor={(_, ndx) => ndx.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold || 0}
      ListFooterComponent={TimelineFooter}
      ListHeaderComponent={TimelineHeader}
      {...rest}
    />
  );

  return <View style={styles.container}>{events}</View>;
};

export default Timeline