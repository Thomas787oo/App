export class FormService {

    public handleFormSubmit = (submitFunction: (data: any) => any, trigger, formState, getValues) => {
        trigger();
        setTimeout(() => {
            if (Object.keys(formState.errors).length > 0) {
                console.log('dirty form => ' + JSON.stringify(formState.errors));
            } else {
                submitFunction(getValues());
                console.log('clean form => ', getValues());
            }
        }, 0);
    };

}

let formServiceInstance;

export const getFormService = () => {
    if (!formServiceInstance) {
        formServiceInstance = new FormService();
    }
    return formServiceInstance;
};
