import {OrderGenderEnum} from '../../model/editions-charisma-app/order/order.model';
import {
    OrderCreationRequestOrderDetail,
    OrderGenderLabels,
} from '../../model/editions-charisma-app/order/order-creation-request.model';

export const addNewDetailWithGender = (gender: OrderGenderEnum, existingDetails: OrderCreationRequestOrderDetail[]):
    {
        updatedDetails: OrderCreationRequestOrderDetail[],
        addedDetail: OrderCreationRequestOrderDetail,
    } => {
    const updatedDetails = [];
    existingDetails.map((row) => {
        updatedDetails.push(row);
    });
    const detailsWithGender = updatedDetails.filter((detail) => detail.gender === gender);
    const detailsWithGenderCount = detailsWithGender.length;
    const lastDetailWithGender = detailsWithGender.pop();
    const lastDetailWithGenderIndex = updatedDetails.lastIndexOf(lastDetailWithGender);
    const newDetail: OrderCreationRequestOrderDetail = {
        fullName: OrderGenderLabels[gender] + ' ' + (detailsWithGenderCount + 1),
        gender,
        hairType: null,
        hairLength: null,
        hairColor: null,
        services: [],
        index: detailsWithGenderCount + 1,
    };
    updatedDetails.splice(lastDetailWithGenderIndex, 0, newDetail);
    return {
        updatedDetails: updatedDetails,
        addedDetail: newDetail,
    };
}

export const removeDetailWithGender = (gender: OrderGenderEnum, existingDetails: OrderCreationRequestOrderDetail[]):
    {
        updatedDetails: OrderCreationRequestOrderDetail[],
        removedDetail: OrderCreationRequestOrderDetail,
    } => {
    const updatedDetails = [];
    existingDetails.map((row) => {
        updatedDetails.push(row);
    });
    const lastDetailWithGenderToRemove = updatedDetails
        .filter((detail) => {
            return detail.gender === gender && detail.index === updatedDetails
                .filter((subDetail) => subDetail.gender === gender).length;
        });
    const lastDetailWithGenderToRemoveIndex = updatedDetails.indexOf(lastDetailWithGenderToRemove[0]);
    const removedDetail = lastDetailWithGenderToRemove[0];
    updatedDetails.splice(lastDetailWithGenderToRemoveIndex, 1);
    return {
        updatedDetails: updatedDetails,
        removedDetail,
    };
};

export const countDetailsWithGender =
    (gender: OrderGenderEnum, existingDetails: OrderCreationRequestOrderDetail[]): number => {
    return existingDetails
        .filter((orderRequest) => orderRequest.gender === gender)
        .length;
};
