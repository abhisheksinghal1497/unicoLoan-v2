import Timeline from "./Timeline";
import moment from "moment";
import { View } from "react-native";
import DimensionUtils from "../../../../utils/DimensionUtils";

const BasicTimeline = () => {
  const data = [
    // First row in the Timeline
    {
      title: {
        content: "on Tue 30th April 24",
        status: "Complaint Raised"
      },
      description: {
        content: "Your Complaint has been raised at 2:32 PM",
      },
    },

    // Second row in the Timeline
    {
      title: {
        content: "on Wed 1st April 24",
        status: "Task Assigned"
      },
      description: {
        content:
          "Admin has assigned the task to Bhavesh Rao who will attend your complaint around 3:00 PM",
      },
    },

    {
      title: {
        content: "on Fri 3rd March 24",
        status: "Process started"
      },
      description: {
        content:
          "Mr. Bhavesh Rao has started attending your complaint at 3:00 PM",
      },
    },

    // You got the idea..
    {
      title: {
        content: "on Mon 6th March 24",
        status: "Complaint Resolved"
      },
      description: {
        content: "Complaint was successfully attended and resolved at 6:32 PM",
      },
      icon: {
        content: "check",
        size: 20,
      },
    },
  ];

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
      <Timeline data={data} />
    </View>
  );
};

export default BasicTimeline;
