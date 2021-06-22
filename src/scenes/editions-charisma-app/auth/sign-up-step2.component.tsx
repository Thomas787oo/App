import React from 'react';
import ContentView from '../../../layouts/editions-charisma-app/auth/sign-up-step2';
import {connect} from 'react-redux';
import {OrderCreationRequest} from '../../../model/editions-charisma-app/order/order-creation-request.model';
import {OrderCreationStepManagerRequest} from '../../../model/editions-charisma-app/order/order-creation-step-manager-request.model';
import {HeaderWithBottomButtonLayout} from '../../../layouts/editions-charisma-app/shared/header-with-bottom-button-layout/header-with-bottom-button-layout.component';

export const ScreenView =  (props: {
    navigation,
    route,
    dispatch: (data: any) => any,
    orderRequest: OrderCreationRequest,
    orderCreationStepManagerRequest: OrderCreationStepManagerRequest,
}): React.ReactElement => {

    const [formIsTouched, setFormTouched] = React.useState<boolean>(false);
    const [submitTimestamp, setSubmitTimestamp] = React.useState<number>(null);

    const onArrowLeftPress = (): void => {
        // Update the previous step before navigating
        props.dispatch({ type : 'PREVIOUS_STEP'});

        props.navigation && props.navigation.navigate(props.orderCreationStepManagerRequest.previousStep.routeName, { stepData: props.orderCreationStepManagerRequest.previousStep.data });
    };

    return (
        <HeaderWithBottomButtonLayout
            headerOptions={{
                text: 'INSCRIPTION',
                leftIcon: 'arrow',
                onPressLeft: onArrowLeftPress,
                reachedPortion: 1,
                totalPortions: 8,
            }}
            bottomButtonOptions={{
                text: 'Suivant',
                onPress: () => setSubmitTimestamp((new Date()).getTime()),
                enabled: formIsTouched,
            }}
        >
            <ContentView { ...props}
                         setFormTouched={setFormTouched}
                         submitTimestamp={submitTimestamp}
            />
        </HeaderWithBottomButtonLayout>
    );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationData: state.setAuthenticationTokens.authenticationData,
        orderRequest: state.setOrderCreationRequest,
        orderCreationStepManagerRequest: state.setOrderCreationStepManagerRequest,
    };
};

export const SignUpStep2Screen = connect(mapStateToProps)(ScreenView);


