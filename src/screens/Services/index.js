import React from "react";
import { View, Text } from 'react-native'
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { useForm } from "react-hook-form";
import { colors } from "../../colors";
import { component, FormControl } from "../../components/FormComponents/FormControl";

const Services = () => {

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setError,
        watch,
        setValue,
        trigger,
    } = useForm({
        mode: "onBlur",
        defaultValues: {},
    });


    return (
        <View style={{
            flex: 1,
            padding: 16,
            backgroundColor: colors.white
        }}>
            <Header
                title="Services"
                left={assets.back}

                leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
                leftImageProps={{ resizeMode: "contain" }}
                rightStyle={{
                    height: verticalScale(23),
                    width: verticalScale(23),
                    marginHorizontal: 10,
                }}
                rightImageProps={{ resizeMode: "contain" }}
                titleStyle={{ fontSize: verticalScale(18) }}

                onPressLeft={() => {
                    props?.navigation?.goBack();
                }}
            />

            <View style={{ marginVertical: 16 }}>
                <FormControl
                    compType={component.dropdown}
                    control={control}
                  
                    name={"LoanNumber"}
                    label={"Select your Loan Number"}
                    
                    isRequired={true}
                    placeholder={"Loan Number"}
                    data = {[
                        {
                            id: "123456789",
                            label: "123456790",
                            value: "123456790",
                        },
                        {
                            id: "ABCDEFGHI",
                            label: "ABCDEFGHI",
                            value: "ABCDEFGHI",
                        },
                    ]}
                 
                    key={"LoanNumber"}
                    watch={watch}
                  
                    
                />

                {
                    <FormControl
                        compType={component.dropdown}
                        control={control}

                        name={"services"}
                        label={"Select your required Service"}

                        isRequired={true}
                        placeholder={"services"}
                        data={[
                            {
                                id: "Make Payment",
                                label: "Make Payment",
                                value: "Make Payment",
                            },
                            {
                                id: "View Statement/Request:",
                                label: "View Statement/Request:",
                                value: "View Statement/Request:",
                            },
                            {
                                id: "Recent Transactions",
                                label: "Recent Transactions",
                                value: "Recent Transactions",
                            },
                            {
                                id: "Service Request",
                                label: "Service Request",
                                value: "Service Request",
                            },
                            {
                                id: "View Documents",
                                label: "View Documents",
                                value: "View Documents",
                            },
                        ]}

                        key={"LoanNumber"}
                        watch={watch}


                    />
                }

            </View>
        </View>
    )
}

export default Services