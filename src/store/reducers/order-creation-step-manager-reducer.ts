import {AnyAction} from 'redux';
import {
    OrderCreationStep,
    OrderCreationStepManagerRequest,
} from '../../model/editions-charisma-app/order/order-creation-step-manager-request.model';
import {OrderCreationRequestOrderDetail,} from '../../model/editions-charisma-app/order/order-creation-request.model';

const initialState: OrderCreationStepManagerRequest = {
    previousStep: null,
    currentStep: null,
    nextStep: null,
    previousStepIndex: null,
    currentStepIndex: null,
    nextStepIndex: null,
    steps: [],
 };

function setOrderCreationStepManagerRequest(state = initialState, action: AnyAction ) {
    let nextState = state;
    const actionValue: any = action.value;
    switch (action.type) {
        case 'INITIALIZE_STEPS':
            const initializeActionValue: { updatedDetails: OrderCreationRequestOrderDetail[], addedDetail: OrderCreationRequestOrderDetail, hasPaymentMethod: boolean, isLoggedIn: boolean } = <{ updatedDetails: OrderCreationRequestOrderDetail[], addedDetail: OrderCreationRequestOrderDetail, addedDetail: OrderCreationRequestOrderDetail, hasPaymentMethod: false, isLoggedIn: true }>actionValue;
            const details = initializeActionValue.updatedDetails;
            const steps: OrderCreationStep[] = [];
            // Add step 1 : Gender selection
            steps.push({ routeName: 'CreateOrderStep1', data: null });
            // Add step 2 and 3 : for each gender selected
            details.map((detail) => {
                steps.push({ routeName: 'CreateOrderStep2', data: detail });
                steps.push({ routeName: 'CreateOrderStep3', data: detail });
            });
            // Add step 4a : Availability selection dates
            steps.push({ routeName: 'CreateOrderStep4a', data: null });

            if (initializeActionValue.isLoggedIn === false) {
                // Add sign up step : payment method direct creation
                steps.push({ routeName: 'SignUpStep1', data: null });
                // Add sign up step : payment method direct creation
                steps.push({ routeName: 'SignUpStep2', data: null });
            }

            // Add step 5 : Address selection
            steps.push({ routeName: 'CreateOrderStep5', data: null });
            // Add step 6 : client name selection
            steps.push({ routeName: 'CreateOrderStep6', data: null });
            // Add step 7 : summary
            steps.push({ routeName: 'CreateOrderStep7', data: null });
            if (initializeActionValue.hasPaymentMethod) {
                // Add step 8a : payment method direct creation
                steps.push({ routeName: 'CreateOrderStep8a', data: null });
                // Add step 9 : payment method creation verification
                steps.push({ routeName: 'CreateOrderStep9a', data: null });
            } else {
                // Add step 8b : payment method selection if existing payment found
                steps.push({ routeName: 'CreateOrderStep8b', data: null });
                // Add step 9 : payment method verification for existing payment method
                steps.push({ routeName: 'CreateOrderStep9a', data: null });
            }
            nextState = ({
                ...state,
                previousStep: null,
                currentStep: steps[0],
                nextStep: steps[1],
                previousStepIndex: null,
                currentStepIndex: 0,
                nextStepIndex: 1,
                steps: steps,
            });
            break;
        case 'ADD_DETAIL_STEP':
            const addDetailActionValue: { updatedDetails: OrderCreationRequestOrderDetail[], addedDetail: OrderCreationRequestOrderDetail } = <{ updatedDetails: OrderCreationRequestOrderDetail[], addedDetail: OrderCreationRequestOrderDetail }>actionValue;
            const stepsAfterAdd = [];
            let lastGenderSelectionIndex;
            state.steps.map((row, i) => {
                if (row.routeName === 'CreateOrderStep3') {
                    lastGenderSelectionIndex = i;
                }
            });
            state.steps.map((row, i) => {
                stepsAfterAdd.push(row);
                if (i === lastGenderSelectionIndex) {
                    // Add two steps for the new person added
                    stepsAfterAdd.push({ routeName: 'CreateOrderStep2', data: addDetailActionValue.addedDetail });
                    stepsAfterAdd.push({ routeName: 'CreateOrderStep3', data: addDetailActionValue.addedDetail });
                }
            });
            nextState = ({
                ...state,
                steps: stepsAfterAdd,
            });
            break;
        case 'REMOVE_DETAIL_STEP':
            const removeDetailActionValue: { updatedDetails: OrderCreationRequestOrderDetail[], removedDetail: OrderCreationRequestOrderDetail } = <{ updatedDetails: OrderCreationRequestOrderDetail[], removedDetail: OrderCreationRequestOrderDetail }>actionValue;
            // Add two steps for the new person added
            const stepsAfterRemoval = [];
            state.steps.map((row) => {
                stepsAfterRemoval.push(row);
            });
            const finalStepsAfterRemoval = stepsAfterRemoval
                .filter((step: { routeName: string, data: OrderCreationRequestOrderDetail }) => {
                    return !(step.data &&
                             step.data.gender === removeDetailActionValue.removedDetail.gender &&
                             step.data.index === removeDetailActionValue.removedDetail.index);
                });
            nextState = ({
                ...state,
                steps: finalStepsAfterRemoval,
            });
            break;
        case 'NEXT_STEP':
            nextState = ({
                ...state,
                previousStep: state.currentStep,
                currentStep: state.nextStep,
                nextStep: state.steps[state.nextStepIndex + 1],
                previousStepIndex: state.currentStepIndex,
                currentStepIndex: state.nextStepIndex,
                nextStepIndex: state.nextStepIndex + 1,
            });
            break;
        case 'PREVIOUS_STEP':
            nextState = ({
                ...state,
                previousStep: state.steps[state.previousStepIndex - 1],
                currentStep: state.previousStep,
                nextStep: state.currentStep,
                previousStepIndex: state.previousStepIndex - 1,
                currentStepIndex: state.previousStepIndex,
                nextStepIndex: state.currentStepIndex,
            });
            break;
        case 'SET_FIRST_STEP':
            nextState = ({
                ...state,
                previousStep: null,
                currentStep: state.steps[0],
                nextStep: state.steps[1],
                previousStepIndex: null,
                currentStepIndex: 0,
                nextStepIndex: 1,
            });
            break;
        case 'RESET_STEPS':
            nextState = ({
                ...state,
                previousStep: initialState.previousStep,
                currentStep: initialState.currentStep,
                nextStep: initialState.nextStep,
                previousStepIndex: initialState.previousStepIndex,
                currentStepIndex: initialState.currentStepIndex,
                nextStepIndex: initialState.nextStepIndex,
                steps: initialState.steps,
            });
            break;
        case 'REMOVE_SIGN_UP_STEPS_AND_DO_NEXT_STEP':
            const stepsAfterSignUp = [];
            state.steps.map((row) => {
                stepsAfterSignUp.push(row);
            });
            const finalStepsAfterSignUp = stepsAfterSignUp
                .filter((step: { routeName: string, data: OrderCreationRequestOrderDetail }) => {
                    return (['SignUpStep1', 'SignUpStep2'].indexOf(step.routeName) === -1);
                });
            const numberOfRegistrationSteps = 2;
            nextState = ({
                ...state,
                previousStep: finalStepsAfterSignUp[state.previousStepIndex - numberOfRegistrationSteps + 1],
                currentStep: finalStepsAfterSignUp[state.currentStepIndex - numberOfRegistrationSteps + 1],
                nextStep: finalStepsAfterSignUp[state.nextStepIndex - numberOfRegistrationSteps + 1],
                previousStepIndex: state.previousStepIndex - numberOfRegistrationSteps + 1,
                currentStepIndex: state.currentStepIndex - numberOfRegistrationSteps + 1,
                nextStepIndex: state.nextStepIndex - numberOfRegistrationSteps + 1,
                steps: finalStepsAfterSignUp,
            });
            break;
        default:
            break;
    }
    return nextState;
}

export default setOrderCreationStepManagerRequest;
