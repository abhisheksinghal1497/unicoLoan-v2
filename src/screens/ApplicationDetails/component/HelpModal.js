import CustomModal from "../../../components/CustomModal";
import { Text } from "react-native-paper";
import { View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { horizontalScale, verticalScale } from "../../../utils/matrcis";
import Button from "../../../components/Button";
import { toast } from "../../../utils/functions";
import { colors } from "../../../colors";

const HelpModal = ({ showModal, setShowModal, toggleModal, modalStyle }) => {
  const closeModal = () => setShowModal(false);
  const onPressOk = () => {
    toggleModal();
    toast("info", "Info", "Details");
  };

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
          <Text
            style={{ color: colors.LIGHT_BLACK, fontSize: verticalScale(18) }}
          >
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
              color: colors.LIGHT_BLACK,
              fontSize: verticalScale(18),
              marginVertical: verticalScale(10),
            }}
          >
            Need text from Unico
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#606060",
              fontSize: verticalScale(12),
            }}
          >
            Loan assign to nearest branch,{"\n"} The RM will be available to
            assist you shortly!
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <View>
            <Button
              buttonContainer={{
                alignSelf: "flex-start",
                paddingHorizontal: horizontalScale(80),
              }}
              label="OK"
              type="primary"
              onPress={onPressOk}
            />
          </View>

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
