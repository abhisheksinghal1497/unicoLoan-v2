import { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { Text } from "react-native-paper";
import { View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { verticalScale } from "../../../utils/matrcis";
import Button from "../../../components/Button";

const HelpModal = ({ showModal, setShowModal, toggleModal, modalStyle }) => {
  const closeModal = () => setShowModal(false);

  return (
    <CustomModal
      type="center"
      showModal={showModal}
      setShowModal={setShowModal}
      modalStyle={modalStyle}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: "#EDF3F8",
            borderBottomWidth: 2,
            paddingBottom: verticalScale(15),
          }}
        >
          <Text style={{ color: "#44465B", fontSize: verticalScale(20) }}>
            Need some help?
          </Text>
          <EvilIcons
            onPress={closeModal}
            name="close"
            size={verticalScale(22)}
            color={"#828282"}
          />
        </View>
        <View style={{ alignItems: "center", marginBottom: verticalScale(36) }}>
          <Text
            style={{
              color: "#44465B",
              fontSize: verticalScale(20),
              marginVertical: verticalScale(10),
            }}
          >
            Need text from Unico
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#606060",
              fontSize: verticalScale(15),
            }}
          >
            Loan assign to nearest branch,{"\n"} The RM will be available to
            assist you shortly!
          </Text>
        </View>

        <View>
          <Button label="Ok" type="primary" onPress={toggleModal} />
          <Button
            onPress={toggleModal}
            label="Cancel"
            type="secondery"
            buttonContainer={{
              borderWidth: 0,
              elevation: 0,
              marginTop: verticalScale(16),
            }}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default HelpModal;
