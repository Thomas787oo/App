export interface OrderCreationStepManagerRequest {
    previousStep: OrderCreationStep;
    currentStep: OrderCreationStep;
    nextStep: OrderCreationStep;
    previousStepIndex: number;
    currentStepIndex: number;
    nextStepIndex: number;
    steps: OrderCreationStep[];
}

export interface OrderCreationStep {
    routeName: string|any;
    data: any;
}
