import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Colors } from '../../../common-styles/colors';

export interface FieldTooltipValidation {
  minLength?: {
    value: number;
    message?: string;
  };
  atLeastOneUppercase?: {
    value: boolean;
    message?: string;
  };
  atLeastOneSpecialCharacter?: {
    value: boolean;
    message?: string;
  };
  atLeastOneNumber?: {
    value: boolean;
    message?: string;
  };
  isEqualTo?: {
    value: string | number;
    message?: string;
  };
}
export const FieldTooltip = (props: {
  value: string;
  validation: FieldTooltipValidation;
}): React.ReactElement => {
  // value must contain minimum length

  const validateMinimumLengthIsRequired = (value: string) => {
    return (
      props.validation.minLength !== undefined &&
      value !== undefined &&
      value.length >= props.validation.minLength.value
    );
  };

  // value must contain at least one upper case

  const validateAtLeasOneUppercaseCharacterIsRequired = (value: string) => {
    const regex = /(?=.*[A-Z])/gm;
    return (
      props.validation.atLeastOneUppercase !== undefined && regex.test(value)
    );
  };

  // value must contain at least one number

  const validateAtLeasOneNumberIsRequired = (value: string) => {
    const regex = /(?=.*?[0-9])/gm;
    return props.validation.atLeastOneNumber !== undefined && regex.test(value);
  };

  // value must contain at least one special character

  const validateAtLeasOneSpecialCharacterIsRequired = (value: string) => {
    const regex = /(?=.*[?!&#£$:%@¿§«»ω⊙¤°℃℉€¥¢¡;.,~^=*])/gm;
    return (
      props.validation.atLeastOneSpecialCharacter !== undefined &&
      regex.test(value)
    );
  };

  // value must be equal to another value

  const validateIsEqual = (value: string | number | object) => {
    return (
      props.validation.isEqualTo !== undefined &&
      value === props.validation.isEqualTo.value
    );
  };

  // generate one validation

  const getFieldValidation = (
    validation: boolean,
    value: boolean | string | number | undefined,
    defaultMessage: string,
    customMessage?: string,
  ) => (
    <>
      {value ? (
        <View style={styles.validation}>
          {validation ? (
            <Icon name='check' style={styles.validationIconTrue} pack={'feather'} />
          ) : (
            <Icon name='x' style={styles.validationIconFalse} pack={'feather'} />
          )}
          <Text style={styles.tooltipText}>
            {customMessage !== undefined
              ? customMessage.replace('{value}', value.toString())
              : defaultMessage}
          </Text>
        </View>
      ) : null}
    </>
  );

  const hasValidation = () => {
    const result =
      (props.validation.isEqualTo !== undefined &&
        props.validation.isEqualTo.value !== undefined &&
        props.validation.isEqualTo.value !== '') ||
      (props.validation.atLeastOneNumber !== undefined &&
        props.validation.atLeastOneNumber.value !== undefined &&
        props.validation.atLeastOneNumber.value != null) ||
      (props.validation.atLeastOneSpecialCharacter !== undefined &&
        props.validation.atLeastOneSpecialCharacter.value !== undefined &&
        props.validation.atLeastOneSpecialCharacter.value != null) ||
      (props.validation.atLeastOneUppercase !== undefined &&
        props.validation.atLeastOneUppercase.value !== undefined &&
        props.validation.atLeastOneUppercase.value != null) ||
      (props.validation.minLength !== undefined &&
        props.validation.minLength.value !== undefined &&
        props.validation.minLength.value != null &&
        props.validation.minLength.value !== 0);
    return result;
  };

  return (
    <>
      {hasValidation() ? (
        <View style={{ flex: 1 }}>
          <View style={styles.triangle} />
          <View style={styles.tooltip}>
            {getFieldValidation(
              validateMinimumLengthIsRequired(props.value),
              props.validation?.minLength?.value,
              `Minimum ${props.validation?.minLength?.value?.toString()} caractères`,
              props.validation?.minLength?.message,
            )}

            {getFieldValidation(
              validateAtLeasOneUppercaseCharacterIsRequired(props.value),
              props.validation?.atLeastOneUppercase?.value,
              `Minimum 1 majuscule`,
              props.validation?.atLeastOneUppercase?.message,
            )}

            {getFieldValidation(
              validateAtLeasOneNumberIsRequired(props.value),
              props.validation?.atLeastOneNumber?.value,
              `Minimum 1 chiffre`,
              props.validation?.atLeastOneNumber?.message,
            )}

            {getFieldValidation(
              validateAtLeasOneSpecialCharacterIsRequired(props.value),
              props.validation?.atLeastOneSpecialCharacter?.value,
              `Minimum 1 caractère spécial`,
              props.validation?.atLeastOneSpecialCharacter?.message,
            )}

            {getFieldValidation(
              validateIsEqual(props.value),
              props.validation?.isEqualTo?.value,
              `Confirmation du champ`,
              props.validation?.isEqualTo?.message,
            )}
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    borderRadius: 6,
    backgroundColor: Colors.white,
    maxHeight: 148,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: 336,
  },
  triangle: {
    elevation: 0,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 0,
    marginLeft: 30,
    marginRight: 400,
    borderWidth: 14,
    borderStyle: 'solid',
    borderBottomColor: Colors.white,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    zIndex: 0,
  },
  tooltipText: {
    marginTop: 16,
    marginBottom: -4,
    marginLeft: 24,
    fontSize: 12,
    lineHeight: 14.63,
    color: '#494F57',
  },
  validation: {
    flexDirection: 'row',
  },
  validationIconTrue: {
    display: 'flex',
    color: Colors.green,
    marginLeft: 17.25,
    marginTop: 10,
    height: 24,
    width: 24,
  },
  validationIconFalse: {
    display: 'flex',
    color: '#E52D2D',
    marginLeft: 17.25,
    marginTop: 10,
    height: 24,
    width: 24,
  },
});
