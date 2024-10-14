import CustomModal from "../../../components/CustomModal";
import { Text } from "react-native-paper";
import { View } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { horizontalScale, verticalScale } from "../../../utils/matrcis";
import Button from "../../../components/Button";
import { toast, useResetRoutes } from "../../../utils/functions";
import { colors } from "../../../colors";
import { assignBranchManagerMutation } from "../../../services/ApiUtils";
import { useRoute } from "@react-navigation/native";
import { screens } from "../../../constants/screens";
import { useState } from "react";
import Toast from "react-native-toast-message";

const HelpModal = ({ showModal, setShowModal, toggleModal, modalStyle }) => {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const resetRoute = useResetRoutes();
  const [step, setStep] = useState(0);
  const { loanId } = loanData;
  const { data, isPending, mutateAsync } = assignBranchManagerMutation(loanId);

  const closeModal = () => setShowModal(false);
  const onPressOk = async () => {
    try {
      const response = await mutateAsync();
      setStep(1);
    } catch (error) {
      Toast.show({ type: "error", text1: "Not able to assign branch manager" });
    }
  };

  const navigateToHomeScreen = () => {
    toggleModal();
    resetRoute(screens.HomeScreen);
  };

  const HelpUi = () => {
    return (
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
    );
  };

  const AssignedToBranchManager = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: "#EDF3F8",
            borderBottomWidth: 2,
            // paddingBottom: verticalScale(15),
          }}
        >
          <Text
            style={{ color: colors.LIGHT_BLACK, fontSize: verticalScale(18) }}
          >
            {/* Assigned */}
          </Text>
          {/* <EvilIcons
            onPress={closeModal}
            name="close"
            size={verticalScale(22)}
            color={"#828282"}
          /> */}
        </View>
        <View style={{ alignItems: "center", marginBottom: verticalScale(36) }}>
          <Text
            style={{
              color: colors.LIGHT_BLACK,
              fontSize: verticalScale(18),
              marginVertical: verticalScale(10),
            }}
          >
            Branch manager assigned
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
              isLoading={isPending}
              label="OK"
              type="primary"
              onPress={navigateToHomeScreen}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <CustomModal
      type="center"
      showModal={showModal}
      setShowModal={setShowModal}
      modalStyle={modalStyle}
    >
      {step === 0 ? <HelpUi /> : <AssignedToBranchManager />}
    </CustomModal>
  );
};

export default HelpModal;
