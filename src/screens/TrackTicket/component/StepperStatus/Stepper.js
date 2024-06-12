import Timeline from "./Timeline";
import moment from "moment";
import { View } from "react-native";
import DimensionUtils from "../../../../utils/DimensionUtils";
import { formatDateDayMonthYear } from "../../../../utils/dateUtil";

const BasicTimeline = ({data=[]}) => {
  const lastIndex = data.length - 1;

  const dataMuted = data.map((el,i) => (lastIndex !== i ? {
    title: {
      content: `on ${formatDateDayMonthYear(el.createdAt)}`,
      status: el.title
    },
    description: {
      content: el.description,
    },
  } : {
    title: {
      content: `on ${formatDateDayMonthYear(el.createdAt)}`,
      status: el.title
    },
    description: {
      content: el.description,
    },
    icon: {
      content: "check",
      size: 20,
    },
  }))

  return (
    <View
      style={{
        borderBottomColor: "#D2D2D2",
        borderBottomWidth: 0.7,
        borderTopColor: "#D2D2D2",
        borderTopWidth: 0.7,
        paddingTop: DimensionUtils.pixelSizeVertical(26),
        paddingBottom: DimensionUtils.pixelSizeVertical(15)
      }}
    >
      <Timeline data={dataMuted} />
    </View>
  );
};

export default BasicTimeline;
